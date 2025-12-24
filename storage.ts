
import { randomUUID } from 'crypto';

// Type definitions based on application needs

// User and Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// AI Platform Configuration
export interface Platform {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  requiresApiKey: boolean;
  customJson?: Record<string, any>;
  createdAt: Date;
}

// Workspace Management
export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  isPublic: boolean;
  allowCrossChaining: boolean;
  settings: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Workspace Membership
export interface WorkspaceMember {
  id: string;
  workspaceId: string | null;
  userId: string | null;
  role: 'admin' | 'member' | 'guest';
  permissions: Record<string, any>;
  joinedAt: Date;
}

// Conversation and Messaging
export interface Conversation {
  id: string;
  workspaceId: string;
  userId: string;
  title: string;
  startTime: Date;
  endTime?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  authorId: string; // Can be user or platform ID
  content: string;
  timestamp: Date;
  platformId?: string;
  responseToMessageId?: string;
  isChained?: boolean;
  responseTime?: number; // in milliseconds
}

// Advanced Features: Chaining, Scheduling, Notifications, Metrics
export interface MessageChain {
  id: string;
  workspaceId: string | null;
  chainOrder: number;
  sourcePlatformId: string | null;
  targetPlatformId: string | null;
  triggerCondition: 'automatic' | 'manual' | 'conditional';
  isActive: boolean;
  createdAt: Date;
}

export interface ScheduledTask {
  id: string;
  userId: string | null;
  workspaceId: string | null;
  description: string | null;
  cronExpression: string;
  taskType: string;
  taskPayload: Record<string, any>;
  timezone: string;
  isActive: boolean;
  nextExecution: Date | null;
  lastExecuted: Date | null;
  executionCount: number;
  maxExecutions: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskExecution {
  id: string;
  taskId: string | null;
  conversationId: string | null;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date;
  endTime: Date | null;
  results: any | null;
  errors: any | null;
  responseCount: number;
  averageResponseTime: number | null;
  createdAt: Date;
}

export interface ResponseTimeNotification {
  id: string;
  userId: string | null;
  workspaceId: string | null;
  platformId: string | null; // null for all platforms
  thresholdMs: number;
  isActive: boolean;
  createdAt: Date;
}

export interface ResponseMetrics {
  id: string;
  messageId: string | null;
  platformId: string | null;
  workspaceId: string | null;
  userId: string | null;
  responseTimeMs: number;
  isSuccess: boolean;
  timestamp: Date;
}

// Insert types for creating new records
export type InsertConversation = Omit<Conversation, 'id'>;
export type InsertMessage = Omit<Message, 'id'>;
export type InsertPlatform = Omit<Platform, 'id' | 'createdAt'>;
export type InsertWorkspace = Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertWorkspaceMember = Omit<WorkspaceMember, 'id' | 'joinedAt'>;
export type InsertMessageChain = Omit<MessageChain, 'id' | 'createdAt'>;
export type InsertScheduledTask = Omit<ScheduledTask, 'id' | 'createdAt' | 'updatedAt' | 'lastExecuted' | 'nextExecution' | 'executionCount'>;
export type InsertTaskExecution = Omit<TaskExecution, 'id' | 'createdAt'>;
export type InsertResponseTimeNotification = Omit<ResponseTimeNotification, 'id' | 'createdAt'>;
export type InsertResponseMetrics = Omit<ResponseMetrics, 'id' | 'timestamp'>;

class MemStorage {
  private conversations = new Map<string, Conversation>();
  private messages = new Map<string, Message>();
  private platforms = new Map<string, Platform>();
  private workspaces = new Map<string, Workspace>();
  private workspaceMembers = new Map<string, WorkspaceMember>();
  private messageChains = new Map<string, MessageChain>();
  private scheduledTasks = new Map<string, ScheduledTask>();
  private taskExecutions = new Map<string, TaskExecution>();
  private responseTimeNotifications = new Map<string, ResponseTimeNotification>();
  private responseMetrics = new Map<string, ResponseMetrics>();

  constructor() {
    // Seed initial data
    this.createPlatform({ name: 'Genkit', description: 'Google AI Toolkit', requiresApiKey: true });
  }

  // Conversation operations
  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = { ...insertConversation, id };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values());
  }

  async getMessagesByConversationId(conversationId: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (msg) => msg.conversationId === conversationId
    );
  }

  // Message operations
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = { ...insertMessage, id };
    this.messages.set(id, message);
    return message;
  }

  // Platform operations
  async createPlatform(insertPlatform: InsertPlatform): Promise<Platform> {
    const id = randomUUID();
    const platform: Platform = {
      ...insertPlatform,
      id,
      createdAt: new Date()
    };
    this.platforms.set(id, platform);
    return platform;
  }
  async getPlatform(id: string): Promise<Platform | undefined> {
    return this.platforms.get(id);
  }

  // Workspace operations
  async createWorkspace(insertWorkspace: InsertWorkspace): Promise<Workspace> {
    const id = randomUUID();
    const workspace: Workspace = {
      ...insertWorkspace,
      ownerId: insertWorkspace.ownerId || '',
      isPublic: insertWorkspace.isPublic ?? false,
      allowCrossChaining: insertWorkspace.allowCrossChaining ?? true,
      settings: insertWorkspace.settings || {},
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.workspaces.set(id, workspace);
    return workspace;
  }

  async updateWorkspace(id: string, updates: Partial<Workspace>): Promise<Workspace> {
    const workspace = this.workspaces.get(id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    const updatedWorkspace = { ...workspace, ...updates, updatedAt: new Date() };
    this.workspaces.set(id, updatedWorkspace);
    return updatedWorkspace;
  }

  // Workspace member operations
  async getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    return Array.from(this.workspaceMembers.values()).filter(
      (member) => member.workspaceId === workspaceId
    );
  }

  async getUserWorkspaceMembership(userId: string, workspaceId: string): Promise<WorkspaceMember | undefined> {
    return Array.from(this.workspaceMembers.values()).find(
      (member) => member.userId === userId && member.workspaceId === workspaceId
    );
  }

  async addWorkspaceMember(insertMember: InsertWorkspaceMember): Promise<WorkspaceMember> {
    const id = randomUUID();
    const member: WorkspaceMember = {
      ...insertMember,
      workspaceId: insertMember.workspaceId || null,
      userId: insertMember.userId || null,
      role: insertMember.role || "member",
      permissions: insertMember.permissions || {},
      id,
      joinedAt: new Date()
    };
    this.workspaceMembers.set(id, member);
    return member;
  }

  async updateWorkspaceMember(id: string, updates: Partial<WorkspaceMember>): Promise<WorkspaceMember> {
    const member = this.workspaceMembers.get(id);
    if (!member) {
      throw new Error("Workspace member not found");
    }
    const updatedMember = { ...member, ...updates };
    this.workspaceMembers.set(id, updatedMember);
    return updatedMember;
  }

  async removeWorkspaceMember(id: string): Promise<void> {
    this.workspaceMembers.delete(id);
  }

  // Message chain operations
  async getMessageChainsByWorkspaceId(workspaceId: string): Promise<MessageChain[]> {
    return Array.from(this.messageChains.values()).filter(
      (chain) => chain.workspaceId === workspaceId
    );
  }

  async createMessageChain(insertChain: InsertMessageChain): Promise<MessageChain> {
    const id = randomUUID();
    const chain: MessageChain = {
      ...insertChain,
      workspaceId: insertChain.workspaceId || null,
      chainOrder: insertChain.chainOrder || 0,
      sourcePlatformId: insertChain.sourcePlatformId || null,
      targetPlatformId: insertChain.targetPlatformId || null,
      triggerCondition: insertChain.triggerCondition || "automatic",
      isActive: insertChain.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.messageChains.set(id, chain);
    return chain;
  }

  async updateMessageChain(id: string, updates: Partial<MessageChain>): Promise<MessageChain> {
    const chain = this.messageChains.get(id);
    if (!chain) {
      throw new Error("Message chain not found");
    }
    const updatedChain = { ...chain, ...updates };
    this.messageChains.set(id, updatedChain);
    return updatedChain;
  }

  // Scheduled task operations
  async getScheduledTasksByUserId(userId: string): Promise<ScheduledTask[]> {
    // Support wildcard to get all tasks for maintenance operations
    if (userId === "*") {
      return Array.from(this.scheduledTasks.values());
    }
    
    return Array.from(this.scheduledTasks.values()).filter(
      (task) => task.userId === userId
    );
  }

  async getScheduledTask(id: string): Promise<ScheduledTask | undefined> {
    return this.scheduledTasks.get(id);
  }

  async getActiveScheduledTasks(): Promise<ScheduledTask[]> {
    const now = new Date();
    return Array.from(this.scheduledTasks.values()).filter(
      (task) => task.isActive && 
      (!task.nextExecution || new Date(task.nextExecution) <= now)
    );
  }

  async createScheduledTask(insertTask: InsertScheduledTask): Promise<ScheduledTask> {
    const id = randomUUID();
    const task: ScheduledTask = {
      ...insertTask,
      userId: insertTask.userId || null,
      workspaceId: insertTask.workspaceId || null,
      description: insertTask.description || null,
      timezone: insertTask.timezone || "UTC",
      isActive: insertTask.isActive ?? true,
      lastExecuted: null,
      nextExecution: null,
      executionCount: 0,
      maxExecutions: insertTask.maxExecutions || null,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.scheduledTasks.set(id, task);
    return task;
  }

  async updateScheduledTask(id: string, updates: Partial<ScheduledTask>): Promise<ScheduledTask> {
    const task = this.scheduledTasks.get(id);
    if (!task) {
      throw new Error("Scheduled task not found");
    }
    const updatedTask = { ...task, ...updates, updatedAt: new Date() };
    this.scheduledTasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteScheduledTask(id: string): Promise<void> {
    this.scheduledTasks.delete(id);
  }

  // Task execution operations
  async getTaskExecutionsByTaskId(taskId: string): Promise<TaskExecution[]> {
    return Array.from(this.taskExecutions.values()).filter(
      (execution) => execution.taskId === taskId
    );
  }

  async getTaskExecutionsByStatus(status: string): Promise<TaskExecution[]> {
    return Array.from(this.taskExecutions.values()).filter(
      (execution) => execution.status === status
    );
  }

  async createTaskExecution(insertExecution: InsertTaskExecution): Promise<TaskExecution> {
    const id = randomUUID();
    const execution: TaskExecution = {
      ...insertExecution,
      taskId: insertExecution.taskId || null,
      conversationId: insertExecution.conversationId || null,
      endTime: insertExecution.endTime || null,
      responseCount: insertExecution.responseCount || 0,
      averageResponseTime: insertExecution.averageResponseTime || null,
      errors: insertExecution.errors || null,
      results: insertExecution.results || null,
      id,
      startTime: new Date(),
      createdAt: new Date()
    };
    this.taskExecutions.set(id, execution);
    return execution;
  }

  async updateTaskExecution(id: string, updates: Partial<TaskExecution>): Promise<TaskExecution> {
    const execution = this.taskExecutions.get(id);
    if (!execution) {
      throw new Error("Task execution not found");
    }
    const updatedExecution = { ...execution, ...updates };
    this.taskExecutions.set(id, updatedExecution);
    return updatedExecution;
  }

  // Response time notification operations
  async getResponseTimeNotifications(userId: string, workspaceId?: string): Promise<ResponseTimeNotification[]> {
    return Array.from(this.responseTimeNotifications.values()).filter(
      (notification) => notification.userId === userId && 
      (!workspaceId || notification.workspaceId === workspaceId)
    );
  }

  async createResponseTimeNotification(insertNotification: InsertResponseTimeNotification): Promise<ResponseTimeNotification> {
    const id = randomUUID();
    const notification: ResponseTimeNotification = {
      ...insertNotification,
      userId: insertNotification.userId || null,
      workspaceId: insertNotification.workspaceId || null,
      platformId: insertNotification.platformId || null,
      isActive: insertNotification.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.responseTimeNotifications.set(id, notification);
    return notification;
  }

  async updateResponseTimeNotification(id: string, updates: Partial<ResponseTimeNotification>): Promise<ResponseTimeNotification> {
    const notification = this.responseTimeNotifications.get(id);
    if (!notification) {
      throw new Error("Response time notification not found");
    }
    const updatedNotification = { ...notification, ...updates };
    this.responseTimeNotifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async deleteResponseTimeNotification(id: string): Promise<void> {
    this.responseTimeNotifications.delete(id);
  }

  // Response metrics operations
  async createResponseMetrics(insertMetrics: InsertResponseMetrics): Promise<ResponseMetrics> {
    const id = randomUUID();
    const metrics: ResponseMetrics = {
      ...insertMetrics,
      messageId: insertMetrics.messageId || null,
      platformId: insertMetrics.platformId || null,
      workspaceId: insertMetrics.workspaceId || null,
      userId: insertMetrics.userId || null,
      id,
      timestamp: new Date()
    };
    this.responseMetrics.set(id, metrics);
    return metrics;
  }

  async getResponseMetricsByWorkspace(workspaceId: string, fromDate?: Date): Promise<ResponseMetrics[]> {
    return Array.from(this.responseMetrics.values()).filter(
      (metrics) => metrics.workspaceId === workspaceId &&
      (!fromDate || new Date(metrics.timestamp!) >= fromDate)
    );
  }

  // Helper methods
  async getAllPlatforms(): Promise<Platform[]> {
    return Array.from(this.platforms.values());
  }
}

export const storage = new MemStorage();
