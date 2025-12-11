"""
M2-3M Advanced AI System for TELSTP Life Science Park
Fixed version with proper imports and real functionality
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

# Import real functionality services directly
try:
    from services.real_media_generator import media_generator
    from services.real_report_generator import report_generator
    from services.real_ai_chat import ai_chat
    REAL_SERVICES_AVAILABLE = True
    print("Real services imported successfully")
except ImportError as e:
    REAL_SERVICES_AVAILABLE = False
    print(f"Real services import failed: {e}")

app = Flask(__name__)
CORS(app)

# Basic system information
SYSTEM_INFO = {
    'name': 'M2-3M Advanced AI System',
    'version': '2.0.0',
    'facility': 'TELSTP Life Science Park',
    'status': 'operational',
    'description': 'Next generation AI system with real functionality'
}

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({
        'message': 'Welcome to M2-3M Advanced AI System',
        'system': SYSTEM_INFO,
        'timestamp': datetime.utcnow().isoformat(),
        'real_functionality': REAL_SERVICES_AVAILABLE,
        'endpoints': {
            'system_status': '/api/status',
            'health_check': '/api/health',
            'media_generation': '/api/media/generate/image',
            'audio_generation': '/api/media/generate/audio',
            'ai_chat': '/api/ai/chat',
            'reports': '/api/reports/generate/progress'
        }
    })

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'system': 'M2-3M',
        'timestamp': datetime.utcnow().isoformat(),
        'real_functionality': REAL_SERVICES_AVAILABLE,
        'services': {
            'api': 'running',
            'media_generation': REAL_SERVICES_AVAILABLE,
            'ai_chat': REAL_SERVICES_AVAILABLE,
            'report_generation': REAL_SERVICES_AVAILABLE
        }
    })

# Media Generation Endpoints
@app.route('/api/media/generate/image', methods=['POST'])
def generate_image():
    """Generate actual image using Manus media generation"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        aspect_ratio = data.get('aspect_ratio', 'landscape')
        
        if not prompt:
            return jsonify({
                'success': False,
                'error': 'Prompt is required'
            }), 400
        
        # Generate image
        result = media_generator.generate_image(prompt, aspect_ratio)
        
        if result['success']:
            return jsonify(result)
        else:
            return jsonify(result), 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Image generation failed: {str(e)}'
        }), 500

@app.route('/api/media/generate/audio', methods=['POST'])
def generate_audio():
    """Generate actual audio using Manus speech generation"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        data = request.get_json()
        text = data.get('text', '')
        voice = data.get('voice', 'female_voice')
        
        if not text:
            return jsonify({
                'success': False,
                'error': 'Text is required'
            }), 400
        
        # Generate audio
        result = media_generator.generate_audio(text, voice)
        
        if result['success']:
            return jsonify(result)
        else:
            return jsonify(result), 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Audio generation failed: {str(e)}'
        }), 500

@app.route('/api/media/list', methods=['GET'])
def list_media():
    """List all generated media files"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        result = media_generator.list_generated_media()
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Failed to list media: {str(e)}'
        }), 500

# AI Chat Endpoints
@app.route('/api/ai/chat', methods=['POST'])
def ai_chat_endpoint():
    """Real AI chat with OpenAI integration"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        data = request.get_json()
        message = data.get('message', '')
        user_id = data.get('user_id', 'mayo')
        session_id = data.get('session_id')
        
        if not message:
            return jsonify({
                'success': False,
                'error': 'Message is required'
            }), 400
        
        # Get AI response
        result = ai_chat.chat(message, user_id, session_id)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'AI chat failed: {str(e)}'
        }), 500

@app.route('/api/ai/analyze', methods=['POST'])
def analyze_research_data():
    """Analyze research data with AI"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        data = request.get_json()
        data_description = data.get('data_description', '')
        user_id = data.get('user_id', 'mayo')
        
        if not data_description:
            return jsonify({
                'success': False,
                'error': 'Data description is required'
            }), 400
        
        # Analyze data
        result = ai_chat.analyze_research_data(data_description, user_id)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Data analysis failed: {str(e)}'
        }), 500

# Report Generation Endpoints
@app.route('/api/reports/generate/progress', methods=['POST'])
def generate_progress_report():
    """Generate actual research progress report"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        data = request.get_json() or {}
        
        # Generate report
        result = report_generator.generate_research_progress_report(data)
        
        if result['success']:
            return jsonify(result)
        else:
            return jsonify(result), 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Report generation failed: {str(e)}'
        }), 500

@app.route('/api/reports/generate/analysis', methods=['POST'])
def generate_analysis_report():
    """Generate actual data analysis report"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        data = request.get_json() or {}
        
        # Generate report
        result = report_generator.generate_data_analysis_report(data)
        
        if result['success']:
            return jsonify(result)
        else:
            return jsonify(result), 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Report generation failed: {str(e)}'
        }), 500

@app.route('/api/reports/list', methods=['GET'])
def list_reports():
    """List all generated reports"""
    if not REAL_SERVICES_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Real services not available'
        }), 500
    
    try:
        result = report_generator.list_generated_reports()
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Failed to list reports: {str(e)}'
        }), 500

@app.route('/api/status')
def system_status():
    """System status endpoint"""
    return jsonify({
        'system_name': 'M2-3M Advanced AI System',
        'facility': 'TELSTP Life Science Park',
        'status': 'operational',
        'version': '2.0.0',
        'real_functionality': REAL_SERVICES_AVAILABLE,
        'last_updated': datetime.utcnow().isoformat(),
        'capabilities': [
            'Real Media Generation',
            'Real AI Chat',
            'Real Report Generation',
            'Research Collaboration',
            'TELSTP Integration'
        ],
        'metrics': {
            'system_health': 95,
            'performance': 'optimal',
            'real_services': 'active' if REAL_SERVICES_AVAILABLE else 'unavailable'
        }
    })

@app.errorhandler(404)
def not_found(error):
    """404 error handler"""
    return jsonify({
        'error': 'Endpoint not found',
        'system': 'M2-3M',
        'available_endpoints': [
            '/',
            '/api/health',
            '/api/status',
            '/api/media/generate/image',
            '/api/media/generate/audio',
            '/api/media/list',
            '/api/ai/chat',
            '/api/ai/analyze',
            '/api/reports/generate/progress',
            '/api/reports/generate/analysis',
            '/api/reports/list'
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """500 error handler"""
    return jsonify({
        'error': 'Internal server error',
        'system': 'M2-3M',
        'message': 'System encountered an error',
        'timestamp': datetime.utcnow().isoformat()
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting M2-3M System with real functionality: {REAL_SERVICES_AVAILABLE}")
    app.run(host='0.0.0.0', port=port, debug=False)