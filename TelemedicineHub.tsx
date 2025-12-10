import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Stethoscope, Video, Calendar, FileText, Users, Clock, Shield, Activity } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: Date;
  duration: number;
  type: 'video' | 'phone' | 'chat';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  availability: 'available' | 'busy' | 'offline';
  consultations: number;
  languages: string[];
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: Date;
  riskLevel: 'low' | 'medium' | 'high';
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
  };
}

export default function TelemedicineHub() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-1',
      patientName: 'John Smith',
      doctorName: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      date: new Date(Date.now() + 3600000),
      duration: 30,
      type: 'video',
      status: 'scheduled',
      priority: 'medium'
    },
    {
      id: 'apt-2',
      patientName: 'Maria Garcia',
      doctorName: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: new Date(Date.now() + 7200000),
      duration: 20,
      type: 'video',
      status: 'scheduled',
      priority: 'high'
    }
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 'doc-1',
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      rating: 4.9,
      experience: '15 years',
      availability: 'available',
      consultations: 1247,
      languages: ['English', 'Spanish']
    },
    {
      id: 'doc-2',
      name: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      rating: 4.8,
      experience: '12 years',
      availability: 'busy',
      consultations: 892,
      languages: ['English', 'Mandarin']
    }
  ]);

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'pat-1',
      name: 'John Smith',
      age: 45,
      condition: 'Hypertension',
      lastVisit: new Date(Date.now() - 604800000),
      riskLevel: 'medium',
      vitals: {
        heartRate: 78,
        bloodPressure: '140/90',
        temperature: 98.6
      }
    }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalAppointments: 156,
    activeDoctors: 24,
    patientsToday: 89,
    consultationHours: 340
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'in-progress': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'urgent': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Telemedicine Hub</h1>
                  <p className="text-sm text-blue-200">Advanced Healthcare Consultation Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Shield className="w-3 h-3" />
                HIPAA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/20 border-white/10">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-blue-600">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments" className="text-white data-[state=active]:bg-blue-600">Appointments</TabsTrigger>
            <TabsTrigger value="doctors" className="text-white data-[state=active]:bg-blue-600">Doctors</TabsTrigger>
            <TabsTrigger value="patients" className="text-white data-[state=active]:bg-blue-600">Patients</TabsTrigger>
            <TabsTrigger value="consultation" className="text-white data-[state=active]:bg-blue-600">Live Console</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Healthcare Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalAppointments}</div>
                  <p className="text-xs text-blue-200">Scheduled consultations</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                  <Users className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.activeDoctors}</div>
                  <p className="text-xs text-green-200">Available now</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Patients Served</CardTitle>
                  <Activity className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.patientsToday}</div>
                  <p className="text-xs text-purple-200">Today</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultation Hours</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.consultationHours}</div>
                  <p className="text-xs text-yellow-200">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-400" />
                  Healthcare Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Start Consultation
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Patient Records
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Emergency Protocol
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Video className="h-5 w-5 text-blue-400" />
                        <div>
                          <CardTitle className="text-lg">
                            {appointment.patientName} → {appointment.doctorName}
                          </CardTitle>
                          <p className="text-sm text-gray-300">
                            {appointment.specialty} • {appointment.date.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getPriorityColor(appointment.priority)} text-white`}>
                          {appointment.priority}
                        </Badge>
                        <Badge className={`${getStatusColor(appointment.status)} text-white`}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-300">
                        Duration: {appointment.duration} minutes • Type: {appointment.type}
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Join Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <p className="text-sm text-gray-300">{doctor.specialty}</p>
                      </div>
                      <Badge className={`${getStatusColor(doctor.availability)} text-white`}>
                        {doctor.availability}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Rating:</span>
                        <span className="text-yellow-400">⭐ {doctor.rating}/5.0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Experience:</span>
                        <span className="text-white">{doctor.experience}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Consultations:</span>
                        <span className="text-green-400">{doctor.consultations.toLocaleString()}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Languages:</p>
                        <div className="flex gap-1">
                          {doctor.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20 text-white">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="space-y-4">
              {patients.map((patient) => (
                <Card key={patient.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <p className="text-sm text-gray-300">Age: {patient.age} • {patient.condition}</p>
                      </div>
                      <Badge className={`${getRiskColor(patient.riskLevel)} text-white`}>
                        {patient.riskLevel} risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Heart Rate:</span>
                        <div className="text-green-400 font-medium">{patient.vitals.heartRate} bpm</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Blood Pressure:</span>
                        <div className="text-yellow-400 font-medium">{patient.vitals.bloodPressure}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Temperature:</span>
                        <div className="text-blue-400 font-medium">{patient.vitals.temperature}°F</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                      Last visit: {patient.lastVisit.toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Consultation Tab */}
          <TabsContent value="consultation" className="space-y-6">
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-400" />
                  Live Consultation Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Stethoscope className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Advanced Telemedicine Console</h3>
                  <p className="text-gray-300 mb-6">
                    Secure, HIPAA-compliant video consultations with integrated health monitoring
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Video Call
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Voice Call
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Secure Chat
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Screen Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}