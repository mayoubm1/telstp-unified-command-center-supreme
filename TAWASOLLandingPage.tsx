import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Microscope, Globe, Users, Zap, Brain, Database, TrendingUp, Award } from 'lucide-react';
import { m2_3mResearchFlow } from './m2-3m-integration';

export default function TAWASOLLandingPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleM2_3MQuery = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const result = await m2_3mResearchFlow({
        query,
        context: {
          user_id: 'tawasol_visitor',
          research_area: 'quantum_biology',
          priority_level: 'high'
        }
      });
      setResponse(result.response);
    } catch (error) {
      setResponse('M2-3M is currently processing your request. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900/90 to-purple-900/90">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Microscope className="w-16 h-16 text-blue-400 mr-4" />
            <div>
              <h1 className="text-6xl font-bold text-white mb-4">TAWASOL</h1>
              <p className="text-2xl text-blue-200">Life Science Technology Park</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Pioneering the future of quantum biology, consciousness research, and AI-enhanced scientific discovery
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-green-600 text-white px-4 py-2 text-lg">
              47+ Global Partners
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">
              47.3 TB Research Data
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2 text-lg">
              M2-3M AI Integration
            </Badge>
          </div>
          
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg">
            Explore Research Portal
          </Button>
        </div>
      </section>

      {/* Chairman's Message Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto lg:mx-0 flex items-center justify-center">
                <Users className="w-24 h-24 text-white" />
              </div>
            </div>
            
            <div className="text-white space-y-6">
              <h2 className="text-4xl font-bold mb-6">Message from the Chairman</h2>
              <h3 className="text-2xl text-blue-300">Dr. Ahmed Hassan Al-Mansouri</h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  "As we stand at the threshold of a new era in scientific discovery, TAWASOL Life Science Park 
                  represents more than just a research facility—it embodies humanity's boldest aspirations for 
                  understanding the very essence of life and consciousness."
                </p>
                
                <p>
                  "Through our partnership with 47+ leading international institutions, including MIT, Cambridge, 
                  and the Max Planck Institute, we have created an unprecedented global research ecosystem that 
                  enables real-time knowledge sharing and collaborative breakthrough prediction."
                </p>
                
                <p>
                  "Our quantum biology laboratories are at the forefront of understanding how quantum mechanical 
                  phenomena influence biological processes, promising revolutionary advances in medicine, 
                  biotechnology, and our understanding of consciousness itself."
                </p>
              </div>
              
              <div className="pt-4">
                <p className="text-blue-300 font-semibold">
                  Chairman, TAWASOL Life Science Park<br/>
                  Director, Global Quantum Biology Initiative
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Facilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">World-Class Research Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mb-4 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white" />
                </div>
                <CardTitle className="text-xl">Quantum Biology Laboratory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  State-of-the-art quantum measurement and analysis facilities for studying 
                  quantum coherence in biological systems.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mb-4 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-white" />
                </div>
                <CardTitle className="text-xl">Neural Interface Laboratory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Advanced brain-computer interface development center with cutting-edge 
                  neural monitoring and stimulation technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg mb-4 flex items-center justify-center">
                  <Database className="w-16 h-16 text-white" />
                </div>
                <CardTitle className="text-xl">Global Data Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Massive computational infrastructure housing 47.3 TB of global research data 
                  with real-time analysis capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* M2-3M Integration Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Experience M2-3M Advanced Research Assistant
            </h2>
            
            <Card className="bg-indigo-900/50 border-indigo-500/50 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Brain className="h-8 w-8 text-indigo-400" />
                  Interactive Research Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-300">
                    Ask M2-3M about our research projects, quantum biology analysis, global datasets, 
                    or collaboration opportunities with our 47+ partner institutions.
                  </p>
                  
                  <div className="flex gap-4">
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask M2-3M: 'What breakthrough predictions do you have for quantum biology?' or 'Tell me about the global research network'"
                      className="flex-1 p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                      rows={3}
                    />
                    <Button 
                      onClick={handleM2_3MQuery} 
                      disabled={loading || !query.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 px-8"
                    >
                      {loading ? 'Processing...' : 'Ask M2-3M'}
                    </Button>
                  </div>
                  
                  {response && (
                    <Card className="bg-black/30 border-indigo-400/30">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Brain className="h-6 w-6 text-indigo-400 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-indigo-300 mb-2">M2-3M Response:</h4>
                            <p className="text-white leading-relaxed">{response}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Global Research Network</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-black/20 border-white/10 text-white text-center">
              <CardContent className="pt-8">
                <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">47+</h3>
                <p className="text-gray-300">Partner Institutions Worldwide</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/10 text-white text-center">
              <CardContent className="pt-8">
                <Database className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">47.3 TB</h3>
                <p className="text-gray-300">Global Research Data Access</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 border-white/10 text-white text-center">
              <CardContent className="pt-8">
                <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">94%</h3>
                <p className="text-gray-300">Breakthrough Prediction Accuracy</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-6">Partner Institutions</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['MIT', 'Cambridge', 'Max Planck Institute', 'Stanford', 'Oxford', 'Harvard', 'Caltech', 'ETH Zurich'].map((institution) => (
                <Badge key={institution} variant="outline" className="border-white/20 text-white px-4 py-2">
                  {institution}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Microscope className="w-8 h-8 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-white">TAWASOL</h3>
              </div>
              <p className="text-gray-300">
                Leading the future of quantum biology and consciousness research through 
                global collaboration and AI-enhanced discovery.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Research Areas</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Quantum Biology</li>
                <li>Consciousness Research</li>
                <li>Neural Interfaces</li>
                <li>AI-Enhanced Discovery</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Global Network</h4>
              <ul className="space-y-2 text-gray-300">
                <li>47+ Partner Institutions</li>
                <li>Real-time Collaboration</li>
                <li>Shared Research Data</li>
                <li>M2-3M AI Integration</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 TAWASOL Life Science Technology Park. Powered by M2-3M Advanced Research Assistant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}