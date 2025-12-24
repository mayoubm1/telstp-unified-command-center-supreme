
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const notificationSchema = z.object({
  thresholdMs: z.coerce.number().min(100, "Threshold must be at least 100ms"),
  platformId: z.string().optional(),
  isActive: z.boolean(),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

// Mock data and functions - replace with actual API calls
const getPlatforms = async () => [
  { id: "chatgpt", name: "ChatGPT" },
  { id: "claude", name: "Claude" },
  { id: "gemini", name: "Gemini" },
];

const getNotifications = async () => [
  {
    id: "1",
    thresholdMs: 5000,
    platformId: "chatgpt",
    isActive: true,
  },
  {
    id: "2",
    thresholdMs: 10000,
    isActive: false,
  },
];

const createNotification = async (data: NotificationFormValues) => {
  console.log("Creating notification:", data);
  return { ...data, id: Math.random().toString() };
};

const getMetricsData = async () => ({
  summary: {
    totalResponses: 1250,
    averageResponseTime: 3450,
    successRate: 98.5,
    platformBreakdown: {
      chatgpt: { count: 600, avgTime: 2800, successRate: 99.1 },
      claude: { count: 400, avgTime: 3900, successRate: 98.2 },
      gemini: { count: 250, avgTime: 4200, successRate: 97.5 },
    },
  },
});

const formatResponseTime = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

export function AutomationDashboard() {
  const [platforms, setPlatforms] = useState<Awaited<ReturnType<typeof getPlatforms>>>([]);
  const [notifications, setNotifications] = useState<Awaited<ReturnType<typeof getNotifications>>>([]);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [metricsData, setMetricsData] = useState<Awaited<ReturnType<typeof getMetricsData>> | null>(null);

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      thresholdMs: 10000,
      platformId: "",
      isActive: true,
    },
  });

  const createNotificationMutation = {
    isPending: false, // Mocking mutation state
  };

  useEffect(() => {
    getPlatforms().then(setPlatforms);
    getNotifications().then(setNotifications);
    getMetricsData().then(setMetricsData);
  }, []);

  const handleCreateNotification = async (values: NotificationFormValues) => {
    const newNotification = await createNotification(values);
    setNotifications((prev) => [...prev, newNotification]);
    setIsNotificationDialogOpen(false);
    form.reset();
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Automation Dashboard</h1>
      </div>
      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Response Time Notifications</h2>
              <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Notification
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Notification</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateNotification)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="thresholdMs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Threshold (ms)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 5000" {...field} />
                            </FormControl>
                            <FormDescription>
                              Trigger an alert if response time exceeds this value in milliseconds.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="platformId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Platforms" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="">All Platforms</SelectItem>
                                {platforms.map((platform) => (
                                  <SelectItem key={platform.id} value={platform.id}>
                                    {platform.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select a specific platform or leave blank for all.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Active</FormLabel>
                              <FormDescription>
                                Enable this notification
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-notification-active"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsNotificationDialogOpen(false)}
                          data-testid="button-cancel-notification"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={createNotificationMutation.isPending}
                          data-testid="button-save-notification"
                        >
                          Create Notification
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Notifications Set</h3>
                    <p className="text-muted-foreground mb-4">
                      Create response time alerts to monitor AI platform performance
                    </p>
                    <Button onClick={() => setIsNotificationDialogOpen(true)} data-testid="button-create-first-notification">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Notification
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                notifications.map((notification) => (
                  <Card key={notification.id} data-testid={`notification-card-${notification.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Response Time Alert - {formatResponseTime(notification.thresholdMs)}
                        </CardTitle>
                        <Badge variant={notification.isActive ? "default" : "secondary"}>
                          {notification.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-sm font-medium">Threshold</Label>
                          <p className="text-sm text-muted-foreground">
                            {formatResponseTime(notification.thresholdMs)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Platform</Label>
                          <p className="text-sm text-muted-foreground">
                            {notification.platformId 
                              ? platforms.find((p) => p.id === notification.platformId)?.name || "Unknown"
                              : "All platforms"
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <h2 className="text-xl font-semibold">Response Metrics</h2>
            
            {metricsData ? (
              <div className="grid gap-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metricsData.summary.totalResponses}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatResponseTime(metricsData.summary.averageResponseTime)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metricsData.summary.successRate}%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Platform Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(metricsData.summary.platformBreakdown).map(([platformId, data]) => {
                        const platform = platforms.find((p) => p.id === platformId);
                        return (
                          <div key={platformId} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{platform?.name || "Unknown Platform"}</h3>
                              <p className="text-sm text-muted-foreground">
                                {data.count} responses • {data.successRate}% success rate
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold">
                                {formatResponseTime(data.avgTime)}
                              </div>
                              <div className="text-sm text-muted-foreground">avg time</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Metrics Available</h3>
                  <p className="text-muted-foreground">
                    Send some messages to AI platforms to see response metrics
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    // </div>
  );
}
