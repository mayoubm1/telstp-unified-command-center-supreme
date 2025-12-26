from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class KnowledgeEntry(db.Model):
    __tablename__ = 'knowledge_entries'
    
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False)  # experiential, procedural, factual, conceptual, error
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    meta_data = db.Column(db.Text)  # JSON string for additional metadata
    tags = db.Column(db.Text)  # JSON array of tags
    confidence_score = db.Column(db.Float, default=1.0)
    source = db.Column(db.String(200))  # source of the knowledge
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'title': self.title,
            'content': self.content,
            'metadata': json.loads(self.meta_data) if self.meta_data else {},
            'tags': json.loads(self.tags) if self.tags else [],
            'confidence_score': self.confidence_score,
            'source': self.source,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class ErrorLog(db.Model):
    __tablename__ = 'error_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    error_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    context = db.Column(db.Text)  # JSON string for context information
    root_cause = db.Column(db.Text)
    impact = db.Column(db.String(50))  # low, medium, high, critical
    corrective_action = db.Column(db.Text)
    status = db.Column(db.String(50), default='open')  # open, resolved, learning
    source_ai = db.Column(db.String(50), default='manus_ii')  # manus_i, manus_ii
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    resolved_at = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'error_type': self.error_type,
            'description': self.description,
            'context': json.loads(self.context) if self.context else {},
            'root_cause': self.root_cause,
            'impact': self.impact,
            'corrective_action': self.corrective_action,
            'status': self.status,
            'source_ai': self.source_ai,
            'created_at': self.created_at.isoformat(),
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None
        }

class ConceptualFramework(db.Model):
    __tablename__ = 'conceptual_frameworks'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    principles = db.Column(db.Text)  # JSON array of principles
    applications = db.Column(db.Text)  # JSON array of applications
    relationships = db.Column(db.Text)  # JSON object for relationships to other frameworks
    version = db.Column(db.String(20), default='1.0')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'principles': json.loads(self.principles) if self.principles else [],
            'applications': json.loads(self.applications) if self.applications else [],
            'relationships': json.loads(self.relationships) if self.relationships else {},
            'version': self.version,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }