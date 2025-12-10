import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Heart, Activity, Brain, Calendar, Target, TrendingUp, Shield, Clock } from 'lucide-react';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

interface WellnessPlan {
  id: string;
  name: string;
  category: 'fitness' | 'nutrition' | 'mental' | 'sleep';
  progress: number;
  target: string;
  dueDate: Date;
  status: 'active' | 'completed' | 'paused';
}

export default function WellnessCompanion() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    {
      id: 'heart-rate',
      name: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      status: 'good',
      trend: 'stable',
      lastUpdated: new Date()
    },
    {
      id: 'blood-pressure',
      name: 'Blood Pressure',
      value: 120,
      unit: 'mmHg',
      status: 'excellent',
      trend: 'down',
      lastUpdated: new Date(Date.now() - 3600000)
    },
    {
      id: 'sleep-quality',
      name: 'Sleep Quality',
      value: 85,
      unit: '%',
      status: 'good',
      trend: 'up',
      lastUpdated: new Date(Date.now() - 28800000)
    },
    {
      id: 'stress-level',
      name: 'Stress Level',
      value: 3,
      unit: '/10',
      status: 'good',
      trend: 'down',
      lastUpdated: new Date(Date.now() - 1800000)
    }
  ]);

  const [wellnessPlans, setWellnessPlans] = useState<WellnessPlan[]>([
    {
      id: 'cardio-plan',
      name: '30-Day Cardio Challenge',
      category: 'fitness',
      progress: 65,
      target: '150 min/week',
      dueDate: new Date(Date.now() + 604800000 * 2),
      status: 'active'
    },
    {
      id: 'meditation-plan',
      name: 'Daily Meditation',
      category: 'mental',
      progress: 80,
      target: '10 min/day',
      dueDate: new Date(Date.now() + 604800000),
      status: 'active'
    },
    {
      id: 'nutrition-plan',
      name: 'Balanced Diet Plan',
      category: 'nutrition',
      progress: 45,
      target: '5 servings fruits/veg',
      dueDate: new Date(Date.now() + 604800000 * 3),
      status: 'active'
    }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalMetrics: 4,
    activePlans: 3,
    overallWellness: 78,
    weeklyGoals: 12
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-purple-500';
      case 'paused': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fitness': return Activity;
      case 'nutrition': return Target;
      case 'mental': return Brain;
      case 'sleep': return Clock;
      default: return Heart;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-pink-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Wellness Companion</h1>
                  <p className="text-sm text-pink-200">Personal Health & Wellness Management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Monitoring Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-pink-600">Dashboard</TabsTrigger>
            <TabsTrigger value="metrics" className="text-white data-[state=active]:bg-pink-600">Health Metrics</TabsTrigger>
            <TabsTrigger value="plans" className="text-white data-[state=active]:bg-pink-600">Wellness Plans</TabsTrigger>
            <TabsTrigger value="ai-assistant" className="text-white data-[state=active]:bg-pink-600">AI Assistant</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Wellness Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Wellness</CardTitle>
                  <Heart className="h-4 w-4 text-pink-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.overallWellness}%</div>
                  <Progress value={systemStats.overallWellness} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                  <Target className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.activePlans}</div>
                  <p className="text-xs text-green-200">In progress</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Metrics</CardTitle>
                  <Activity className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalMetrics}</div>
                  <p className="text-xs text-blue-200">Tracked daily</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Goals</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.weeklyGoals}</div>
                  <p className="text-xs text-purple-200">Completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Health Summary */}
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Today's Health Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {healthMetrics.slice(0, 4).map((metric) => (
                    <div key={metric.id} className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {metric.value}{metric.unit}
                      </div>
                      <div className="text-sm text-gray-300">{metric.name}</div>
                      <Badge className={`${getStatusColor(metric.status)} text-white text-xs mt-1`}>
                        {metric.status} {getTrendIcon(metric.trend)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthMetrics.map((metric) => (
                <Card key={metric.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{metric.name}</CardTitle>
                      <Badge className={`${getStatusColor(metric.status)} text-white`}>
                        {metric.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {metric.value}{metric.unit}
                        </div>
                        <div className="text-sm text-gray-300 flex items-center justify-center gap-1">
                          Trend: {getTrendIcon(metric.trend)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 text-center">
                        Last updated: {metric.lastUpdated.toLocaleString()}
                      </div>
                      <Button className="w-full bg-pink-600 hover:bg-pink-700">
                        Update Reading
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wellness Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="space-y-4">
              {wellnessPlans.map((plan) => {
                const CategoryIcon = getCategoryIcon(plan.category);
                return (
                  <Card key={plan.id} className="bg-black/20 border-white/10 text-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="h-6 w-6 text-pink-400" />
                          <div>
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <p className="text-sm text-gray-300 capitalize">{plan.category} • {plan.target}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(plan.status)} text-white`}>
                          {plan.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <Progress value={plan.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Due: {plan.dueDate.toLocaleDateString()}</span>
                          <span>Target: {plan.target}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                            Update Progress
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant" className="space-y-6">
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-pink-400" />
                  AI Health Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Personalized Health Guidance</h3>
                  <p className="text-gray-300 mb-6">
                    Get AI-powered insights, recommendations, and support for your wellness journey
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="bg-pink-600 hover:bg-pink-700">
                      Health Analysis
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Meal Planning
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Workout Suggestions
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      Wellness Chat
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