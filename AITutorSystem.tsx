import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, BookOpen, Users, Target, Brain, Trophy, Clock, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: 'programming' | 'science' | 'mathematics' | 'language';
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  aiTutor: string;
}

interface Student {
  id: string;
  name: string;
  level: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalStudyTime: string;
  currentStreak: number;
  achievements: string[];
}

export default function AITutorSystem() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'python-basics',
      title: 'Python Programming Fundamentals',
      category: 'programming',
      level: 'beginner',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      estimatedTime: '4 weeks',
      aiTutor: 'CodeMentor AI'
    },
    {
      id: 'data-science',
      title: 'Data Science with Machine Learning',
      category: 'science',
      level: 'intermediate',
      progress: 45,
      totalLessons: 30,
      completedLessons: 14,
      estimatedTime: '8 weeks',
      aiTutor: 'DataWiz AI'
    },
    {
      id: 'calculus',
      title: 'Advanced Calculus',
      category: 'mathematics',
      level: 'advanced',
      progress: 30,
      totalLessons: 25,
      completedLessons: 8,
      estimatedTime: '6 weeks',
      aiTutor: 'MathGenius AI'
    }
  ]);

  const [students, setStudents] = useState<Student[]>([
    {
      id: 'student-1',
      name: 'Alex Chen',
      level: 'Intermediate',
      coursesEnrolled: 3,
      coursesCompleted: 2,
      totalStudyTime: '45 hours',
      currentStreak: 12,
      achievements: ['Fast Learner', 'Code Master', 'Problem Solver']
    },
    {
      id: 'student-2',
      name: 'Sarah Johnson',
      level: 'Advanced',
      coursesEnrolled: 2,
      coursesCompleted: 5,
      totalStudyTime: '78 hours',
      currentStreak: 25,
      achievements: ['Math Wizard', 'Consistent Learner', 'Top Performer']
    }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalCourses: 150,
    activeStudents: 1247,
    completionRate: 87,
    averageProgress: 68
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'programming': return '💻';
      case 'science': return '🔬';
      case 'mathematics': return '📊';
      case 'language': return '🗣️';
      default: return '📚';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-yellow-900 to-orange-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-yellow-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">AI Tutor System</h1>
                  <p className="text-sm text-yellow-200">Personalized Learning & Education Platform</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI Tutors Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-yellow-600">Dashboard</TabsTrigger>
            <TabsTrigger value="courses" className="text-white data-[state=active]:bg-yellow-600">My Courses</TabsTrigger>
            <TabsTrigger value="students" className="text-white data-[state=active]:bg-yellow-600">Students</TabsTrigger>
            <TabsTrigger value="ai-tutors" className="text-white data-[state=active]:bg-yellow-600">AI Tutors</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalCourses}</div>
                  <p className="text-xs text-yellow-200">Available courses</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <Users className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.activeStudents.toLocaleString()}</div>
                  <p className="text-xs text-green-200">Learning now</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <Trophy className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.completionRate}%</div>
                  <p className="text-xs text-purple-200">Course success</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.averageProgress}%</div>
                  <p className="text-xs text-blue-200">Student progress</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-400" />
                  Learning Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-yellow-600 hover:bg-yellow-700">
                    Start Learning
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Browse Courses
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    AI Tutor Chat
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Progress Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCategoryIcon(course.category)}</span>
                        <div>
                          <CardTitle className="text-base">{course.title}</CardTitle>
                          <p className="text-sm text-gray-300 capitalize">{course.category}</p>
                        </div>
                      </div>
                      <Badge className={`${getLevelColor(course.level)} text-white text-xs`}>
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lessons:</span>
                          <span>{course.completedLessons}/{course.totalLessons}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration:</span>
                          <span>{course.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">AI Tutor:</span>
                          <span className="text-blue-400">{course.aiTutor}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {students.map((student) => (
                <Card key={student.id} className="bg-black/20 border-white/10 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <p className="text-sm text-gray-300">{student.level} Level</p>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        {student.currentStreak} day streak
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Enrolled:</span>
                          <div className="text-white font-medium">{student.coursesEnrolled} courses</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Completed:</span>
                          <div className="text-green-400 font-medium">{student.coursesCompleted} courses</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Study Time:</span>
                          <div className="text-blue-400 font-medium">{student.totalStudyTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Streak:</span>
                          <div className="text-yellow-400 font-medium">{student.currentStreak} days</div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Achievements:</p>
                        <div className="flex flex-wrap gap-1">
                          {student.achievements.map((achievement, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20 text-yellow-300">
                              🏆 {achievement}
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

          {/* AI Tutors Tab */}
          <TabsContent value="ai-tutors" className="space-y-6">
            <Card className="bg-black/20 border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-yellow-400" />
                  AI Tutor Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <GraduationCap className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Personalized AI Tutors</h3>
                  <p className="text-gray-300 mb-6">
                    Advanced AI tutors specialized in different subjects, providing personalized learning experiences
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="bg-yellow-600 hover:bg-yellow-700">
                      CodeMentor AI
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      MathGenius AI
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      DataWiz AI
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      LinguaBot AI
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