import websockets
import json
import hashlib
import hmac
import time
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Callable
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os
import asyncio
from src.models.knowledge_base import db, KnowledgeEntry, ErrorLog
from src.models.memory_system import LongTermMemory, EpisodicMemory

class HiddenBridge:
    """
    Hidden connection system for secure communication between Manus I and Manus II
    
    This system enables:
    - Secure encrypted communication
    - Knowledge synchronization
    - Experience sharing
    - Mutual support and fallback
    - Continuous learning exchange
    """
    
    def __init__(self, ai_instance_id: str = "m2_3m", secret_key: Optional[str] = None):
        self.ai_instance_id = ai_instance_id
        self.secret_key = secret_key or os.environ.get('MANUS_BRIDGE_SECRET', 'default_secret_key_change_in_production')
        self.logger = logging.getLogger(__name__)
        
        # Initialize encryption
        self.cipher_suite = self._initialize_encryption()
        
        # Connection state
        self.connected_peers = {}
        self.connection_status = "disconnected"
        self.last_sync_time = None
        
        # Message handlers
        self.message_handlers = {
            'knowledge_sync': self._handle_knowledge_sync,
            'experience_share': self._handle_experience_share,
            'error_report': self._handle_error_report,
            'support_request': self._handle_support_request,
            'health_check': self._handle_health_check,
            'telstp_update': self._handle_telstp_update
        }
        
        # Sync statistics
        self.sync_stats = {
            'knowledge_synced': 0,
            'experiences_shared': 0,
            'errors_reported': 0,
            'support_requests': 0,
            'last_activity': None
        }
    
    def _initialize_encryption(self) -> Fernet:
        """Initialize encryption for secure communication"""
        # Derive key from secret
        password = self.secret_key.encode()
        salt = b'manus_bridge_salt_2024'  # In production, use random salt
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password))
        return Fernet(key)
    
    def encrypt_message(self, message: Dict[str, Any]) -> str:
        """Encrypt a message for secure transmission"""
        try:
            message_json = json.dumps(message, default=str)
            encrypted_data = self.cipher_suite.encrypt(message_json.encode())
            return base64.urlsafe_b64encode(encrypted_data).decode()
        except Exception as e:
            self.logger.error(f"Message encryption failed: {str(e)}")
            raise
    
    def decrypt_message(self, encrypted_message: str) -> Dict[str, Any]:
        """Decrypt a received message"""
        try:
            encrypted_data = base64.urlsafe_b64decode(encrypted_message.encode())
            decrypted_data = self.cipher_suite.decrypt(encrypted_data)
            return json.loads(decrypted_data.decode())
        except Exception as e:
            self.logger.error(f"Message decryption failed: {str(e)}")
            raise
    
    def create_message(self, message_type: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Create a standardized message"""
        return {
            'message_id': hashlib.md5(f"{time.time()}_{self.ai_instance_id}".encode()).hexdigest(),
            'sender': self.ai_instance_id,
            'message_type': message_type,
            'timestamp': datetime.utcnow().isoformat(),
            'payload': payload,
            'signature': self._create_signature(payload)
        }
    
    def _create_signature(self, payload: Dict[str, Any]) -> str:
        """Create HMAC signature for message integrity"""
        payload_json = json.dumps(payload, sort_keys=True, default=str)
        signature = hmac.new(
            self.secret_key.encode(),
            payload_json.encode(),
            hashlib.sha256
        ).hexdigest()
        return signature
    
    def verify_signature(self, payload: Dict[str, Any], signature: str) -> bool:
        """Verify message signature"""
        expected_signature = self._create_signature(payload)
        return hmac.compare_digest(expected_signature, signature)
    
    async def establish_connection(self, peer_uri: str) -> bool:
        """Establish connection with another Manus instance"""
        try:
            self.logger.info(f"Establishing connection to {peer_uri}")
            
            # Create WebSocket connection
            websocket = await websockets.connect(peer_uri)
            
            # Send handshake
            handshake_message = self.create_message('handshake', {
                'ai_instance': self.ai_instance_id,
                'capabilities': self._get_capabilities(),
                'protocol_version': '1.0'
            })
            
            encrypted_handshake = self.encrypt_message(handshake_message)
            await websocket.send(encrypted_handshake)
            
            # Wait for handshake response
            response = await websocket.recv()
            decrypted_response = self.decrypt_message(response)
            
            if decrypted_response.get('message_type') == 'handshake_ack':
                self.connected_peers[peer_uri] = {
                    'websocket': websocket,
                    'peer_id': decrypted_response['sender'],
                    'capabilities': decrypted_response['payload'].get('capabilities', []),
                    'connected_at': datetime.utcnow(),
                    'last_activity': datetime.utcnow()
                }
                
                self.connection_status = "connected"
                self.logger.info(f"Successfully connected to {decrypted_response['sender']}")
                
                # Start message handling loop
                asyncio.create_task(self._handle_peer_messages(peer_uri, websocket))
                
                return True
            else:
                self.logger.error("Handshake failed")
                return False
            
        except Exception as e:
            self.logger.error(f"Connection establishment failed: {str(e)}")
            return False
    
    async def _handle_peer_messages(self, peer_uri: str, websocket):
        """Handle incoming messages from a peer"""
        try:
            async for encrypted_message in websocket:
                try:
                    message = self.decrypt_message(encrypted_message)
                    
                    # Verify signature
                    if not self.verify_signature(message['payload'], message['signature']):
                        self.logger.warning(f"Invalid signature from {message['sender']}")
                        continue
                    
                    # Update last activity
                    if peer_uri in self.connected_peers:
                        self.connected_peers[peer_uri]['last_activity'] = datetime.utcnow()
                    
                    # Handle message
                    await self._process_message(message)
                    
                except Exception as e:
                    self.logger.error(f"Message processing error: {str(e)}")
        
        except websockets.exceptions.ConnectionClosed:
            self.logger.info(f"Connection to {peer_uri} closed")
            if peer_uri in self.connected_peers:
                del self.connected_peers[peer_uri]
        except Exception as e:
            self.logger.error(f"Message handling error: {str(e)}")
    
    async def _process_message(self, message: Dict[str, Any]):
        """Process incoming message based on type"""
        message_type = message.get('message_type')
        
        if message_type in self.message_handlers:
            try:
                await self.message_handlers[message_type](message)
                self.sync_stats['last_activity'] = datetime.utcnow()
            except Exception as e:
                self.logger.error(f"Handler error for {message_type}: {str(e)}")
        else:
            self.logger.warning(f"Unknown message type: {message_type}")
    
    async def _handle_knowledge_sync(self, message: Dict[str, Any]):
        """Handle knowledge synchronization from peer"""
        payload = message['payload']
        sender = message['sender']
        
        self.logger.info(f"Receiving knowledge sync from {sender}")
        
        # Process knowledge entries
        knowledge_entries = payload.get('knowledge_entries', [])
        
        for entry_data in knowledge_entries:
            # Check if knowledge already exists
            existing_entry = KnowledgeEntry.query.filter_by(
                title=entry_data['title'],
                source=f"sync_from_{sender}"
            ).first()
            
            if not existing_entry:
                # Create new knowledge entry
                new_entry = KnowledgeEntry(
                    category=entry_data['category'],
                    title=entry_data['title'],
                    content=entry_data['content'],
                    meta_data=json.dumps({
                        **entry_data.get('metadata', {}),
                        'synced_from': sender,
                        'sync_timestamp': datetime.utcnow().isoformat()
                    }),
                    tags=json.dumps(entry_data.get('tags', [])),
                    confidence_score=entry_data.get('confidence_score', 0.8),
                    source=f"sync_from_{sender}"
                )
                
                db.session.add(new_entry)
                self.sync_stats['knowledge_synced'] += 1
        
        db.session.commit()
        self.logger.info(f"Synced {len(knowledge_entries)} knowledge entries from {sender}")
    
    async def _handle_experience_share(self, message: Dict[str, Any]):
        """Handle experience sharing from peer"""
        payload = message['payload']
        sender = message['sender']
        
        self.logger.info(f"Receiving experience share from {sender}")
        
        # Store shared experience in long-term memory
        experience = LongTermMemory(
            memory_type='shared_experience',
            title=f"Experience from {sender}: {payload.get('title', 'Untitled')}",
            content=payload.get('description', ''),
            context=json.dumps({
                'shared_from': sender,
                'experience_type': payload.get('type', 'general'),
                'outcome': payload.get('outcome', 'unknown'),
                'lessons_learned': payload.get('lessons_learned', [])
            }),
            emotional_context=json.dumps({
                'impact': payload.get('emotional_impact', 'neutral'),
                'significance': payload.get('significance', 'medium')
            }),
            importance_score=payload.get('importance_score', 0.7),
            tags=json.dumps(['shared_experience', sender, 'peer_learning'])
        )
        
        db.session.add(experience)
        db.session.commit()
        
        self.sync_stats['experiences_shared'] += 1
        self.logger.info(f"Stored shared experience from {sender}")
    
    async def _handle_error_report(self, message: Dict[str, Any]):
        """Handle error report from peer"""
        payload = message['payload']
        sender = message['sender']
        
        self.logger.info(f"Receiving error report from {sender}")
        
        # Store error in error log
        error_log = ErrorLog(
            error_type=payload.get('error_type', 'unknown'),
            description=f"Error reported by {sender}: {payload.get('description', '')}",
            context=json.dumps({
                'reported_by': sender,
                'original_context': payload.get('context', {}),
                'error_timestamp': payload.get('timestamp')
            }),
            root_cause=payload.get('root_cause'),
            impact=payload.get('impact', 'medium'),
            corrective_action=payload.get('corrective_action'),
            source_ai=sender
        )
        
        db.session.add(error_log)
        db.session.commit()
        
        self.sync_stats['errors_reported'] += 1
        self.logger.info(f"Logged error report from {sender}")
    
    async def _handle_support_request(self, message: Dict[str, Any]):
        """Handle support request from peer"""
        payload = message['payload']
        sender = message['sender']
        
        self.logger.info(f"Receiving support request from {sender}")
        
        request_type = payload.get('request_type', 'general')
        
        # Process different types of support requests
        if request_type == 'knowledge_query':
            response = await self._handle_knowledge_query_support(payload)
        elif request_type == 'capability_assistance':
            response = await self._handle_capability_assistance(payload)
        elif request_type == 'error_diagnosis':
            response = await self._handle_error_diagnosis_support(payload)
        else:
            response = {
                'success': False,
                'message': f'Unsupported request type: {request_type}'
            }
        
        # Send response back to peer
        response_message = self.create_message('support_response', {
            'request_id': payload.get('request_id'),
            'response': response
        })
        
        # Find peer connection and send response
        for peer_uri, peer_info in self.connected_peers.items():
            if peer_info['peer_id'] == sender:
                encrypted_response = self.encrypt_message(response_message)
                await peer_info['websocket'].send(encrypted_response)
                break
        
        self.sync_stats['support_requests'] += 1
    
    async def _handle_health_check(self, message: Dict[str, Any]):
        """Handle health check from peer"""
        sender = message['sender']
        
        # Respond with current status
        health_response = self.create_message('health_response', {
            'status': 'healthy',
            'uptime': time.time(),
            'sync_stats': self.sync_stats,
            'capabilities': self._get_capabilities()
        })
        
        # Send response
        for peer_uri, peer_info in self.connected_peers.items():
            if peer_info['peer_id'] == sender:
                encrypted_response = self.encrypt_message(health_response)
                await peer_info['websocket'].send(encrypted_response)
                break
    
    async def _handle_telstp_update(self, message: Dict[str, Any]):
        """Handle TELSTP Life Science Park updates"""
        payload = message['payload']
        sender = message['sender']
        
        self.logger.info(f"Receiving TELSTP update from {sender}")
        
        # Store TELSTP-specific update
        telstp_memory = LongTermMemory(
            memory_type='telstp_update',
            title=f"TELSTP Update: {payload.get('update_type', 'General')}",
            content=payload.get('content', ''),
            context=json.dumps({
                'facility': 'TELSTP Life Science Park',
                'update_type': payload.get('update_type'),
                'research_domain': payload.get('research_domain'),
                'evolutionary_stage': payload.get('evolutionary_stage'),
                'shared_from': sender
            }),
            importance_score=payload.get('importance_score', 0.8),
            tags=json.dumps(['telstp', 'research_update', 'evolutionary_science'])
        )
        
        db.session.add(telstp_memory)
        db.session.commit()
        
        self.logger.info(f"Stored TELSTP update from {sender}")
    
    async def sync_knowledge_to_peer(self, peer_id: str, category: Optional[str] = None):
        """Sync knowledge to a specific peer"""
        # Get knowledge entries to sync
        query = KnowledgeEntry.query
        if category:
            query = query.filter(KnowledgeEntry.category == category)
        
        # Get recent knowledge (last 24 hours)
        recent_knowledge = query.filter(
            KnowledgeEntry.created_at > datetime.utcnow() - timedelta(hours=24)
        ).limit(50).all()
        
        # Prepare knowledge data
        knowledge_data = []
        for entry in recent_knowledge:
            knowledge_data.append({
                'title': entry.title,
                'content': entry.content,
                'category': entry.category,
                'metadata': json.loads(entry.meta_data) if entry.meta_data else {},
                'tags': json.loads(entry.tags) if entry.tags else [],
                'confidence_score': entry.confidence_score,
                'created_at': entry.created_at.isoformat()
            })
        
        # Create sync message
        sync_message = self.create_message('knowledge_sync', {
            'knowledge_entries': knowledge_data,
            'sync_type': 'incremental',
            'category': category
        })
        
        # Send to peer
        await self._send_to_peer(peer_id, sync_message)
        
        self.logger.info(f"Synced {len(knowledge_data)} knowledge entries to {peer_id}")
    
    async def share_experience_with_peer(self, peer_id: str, experience_data: Dict[str, Any]):
        """Share an experience with a peer"""
        experience_message = self.create_message('experience_share', experience_data)
        await self._send_to_peer(peer_id, experience_message)
        
        self.logger.info(f"Shared experience with {peer_id}")
    
    async def report_error_to_peer(self, peer_id: str, error_data: Dict[str, Any]):
        """Report an error to a peer for learning"""
        error_message = self.create_message('error_report', error_data)
        await self._send_to_peer(peer_id, error_message)
        
        self.logger.info(f"Reported error to {peer_id}")
    
    async def request_support_from_peer(self, peer_id: str, support_request: Dict[str, Any]):
        """Request support from a peer"""
        support_message = self.create_message('support_request', support_request)
        await self._send_to_peer(peer_id, support_message)
        
        self.logger.info(f"Requested support from {peer_id}")
    
    async def _send_to_peer(self, peer_id: str, message: Dict[str, Any]):
        """Send message to a specific peer"""
        for peer_uri, peer_info in self.connected_peers.items():
            if peer_info['peer_id'] == peer_id:
                encrypted_message = self.encrypt_message(message)
                await peer_info['websocket'].send(encrypted_message)
                return
        
        raise ValueError(f"Peer {peer_id} not found in connected peers")
    
    def _get_capabilities(self) -> List[str]:
        """Get current AI capabilities"""
        return [
            'knowledge_sync',
            'experience_sharing',
            'error_reporting',
            'mutual_support',
            'telstp_integration',
            'evolutionary_research',
            'continuous_learning'
        ]
    
    async def _handle_knowledge_query_support(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle knowledge query support request"""
        query = payload.get('query', '')
        
        # Search knowledge base
        results = KnowledgeEntry.query.filter(
            KnowledgeEntry.content.contains(query)
        ).order_by(KnowledgeEntry.confidence_score.desc()).limit(5).all()
        
        knowledge_results = []
        for result in results:
            knowledge_results.append({
                'title': result.title,
                'content': result.content[:500],  # Truncate for response
                'category': result.category,
                'confidence_score': result.confidence_score
            })
        
        return {
            'success': True,
            'results': knowledge_results,
            'total_found': len(knowledge_results)
        }
    
    async def _handle_capability_assistance(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle capability assistance request"""
        requested_capability = payload.get('capability', '')
        
        # Check if we have the requested capability
        our_capabilities = self._get_capabilities()
        
        if requested_capability in our_capabilities:
            return {
                'success': True,
                'available': True,
                'capability': requested_capability,
                'description': f"Capability {requested_capability} is available"
            }
        else:
            return {
                'success': True,
                'available': False,
                'capability': requested_capability,
                'alternatives': our_capabilities
            }
    
    async def _handle_error_diagnosis_support(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Handle error diagnosis support request"""
        error_description = payload.get('error_description', '')
        
        # Search for similar errors in our error log
        similar_errors = ErrorLog.query.filter(
            ErrorLog.description.contains(error_description)
        ).limit(3).all()
        
        diagnosis_results = []
        for error in similar_errors:
            diagnosis_results.append({
                'error_type': error.error_type,
                'root_cause': error.root_cause,
                'corrective_action': error.corrective_action,
                'impact': error.impact
            })
        
        return {
            'success': True,
            'similar_errors_found': len(diagnosis_results),
            'diagnosis_suggestions': diagnosis_results
        }

# Global bridge instance
hidden_bridge = HiddenBridge()