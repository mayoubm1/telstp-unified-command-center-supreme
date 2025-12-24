
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data and functions - replace with actual API calls and WebSocket logic
const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    // Mock WebSocket connection
    const interval = setInterval(() => {
      const platform = ["ChatGPT", "Claude", "Gemini"][Math.floor(Math.random() * 3)];
      setMessages(prev => [...prev, {
        type: "platform_response",
        payload: { platform: { name: platform } }
      }]);
    }, 5000);
    return () => clearInterval(interval);
  }, [url]);
  return { messages };
};

const useSendMessage = () => {
  const [isPending, setIsPending] = useState(false);
  const mutate = async (data: any) => {
    setIsPending(true);
    console.log("Sending message:", data);
    await new Promise(res => setTimeout(res, 1000));
    setIsPending(false);
    return { id: Date.now().toString(), ...data };
  };
  return { mutate, isPending };
};

interface Message {
  id: string;
  isUser: boolean;
  content: string;
  platform?: {
    name: string;
    logo: string;
  };
  isChained?: boolean;
  metadata?: {
    responseTime?: number;
  };
}

interface UploadedFile {
  originalName: string;
  size: number;
}

export function MainChatInterface() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages: wsMessages } = useWebSocket("ws://localhost:8080");
  const sendMessageMutation = useSendMessage();

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      content: message,
    };

    setChatHistory((prev) => [...prev, userMessage]);

    await sendMessageMutation.mutate({ 
      message,
      file: uploadedFile
    });

    setMessage("");
    setUploadedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({ originalName: file.name, size: file.size });
      // In a real app, you would upload the file here
    }
  };

  const removeFile = () => setUploadedFile(null);

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => setIsRecording(false);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat History */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {/* Example Messages */}
          <div className="flex items-start space-x-4">
            <img src="/placeholder-user.jpg" alt="User" className="w-10 h-10 rounded-full" />
            <div className="space-y-1">
              <p className="font-semibold">You</p>
              <Card className="p-3 bg-primary text-primary-foreground">
                <p className="text-sm">What are the latest advancements in AI-powered drug discovery?</p>
              </Card>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <img src="/placeholder-user.jpg" alt="ChatGPT" className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <p className="font-semibold">ChatGPT</p>
                <Badge variant="outline" className="text-xs">250ms</Badge>
              </div>
              <Card className="p-3">
                <p className="text-sm whitespace-pre-wrap">
                  Recent advancements include the use of deep learning for molecular generation, graph neural networks for predicting protein interactions, and large language models for parsing scientific literature. These technologies are significantly accelerating the identification of novel drug candidates and personalizing treatment strategies.
                </p>
              </Card>
            </div>
          </div>
          
          {chatHistory.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-4">
              {msg.isUser ? (
                <img src="/placeholder-user.jpg" alt="User" className="w-10 h-10 rounded-full" />
              ) : (
                <img src={msg.platform?.logo || "/placeholder-user.jpg"} alt={msg.platform?.name} className="w-10 h-10 rounded-full" />
              )}
              
              {msg.isUser ? (
                <div className="space-y-1">
                  <p className="font-semibold">You</p>
                  <Card className="p-3 bg-primary text-primary-foreground">
                    <p className="text-sm">{msg.content}</p>
                  </Card>
                </div>
              ) : (
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">{msg.platform?.name}</p>
                      {msg.isChained && (
                          <Badge variant="secondary" className="text-xs">
                            Chained
                          </Badge>
                        )}
                        {msg.metadata?.responseTime && (
                          <Badge variant="outline" className="text-xs">
                            {msg.metadata.responseTime}ms
                          </Badge>
                        )}
                      </div>
                      <Card className={cn(
                        "p-3",
                        msg.isChained && "border-primary/50 bg-primary/5"
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </Card>
                    </div>
                  )}
              </div>
            ))
          }
          
          {/* Live WebSocket Messages */}
          {wsMessages.map((wsMsg, index) => (
            <div key={`ws-${index}`} className="space-y-2">
              {wsMsg.type === "platform_response" && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>New response from {wsMsg.payload.platform.name}...</span>
                </div>
              )}
              {wsMsg.type === "chained_response" && (
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <i className="fas fa-link"></i>
                  <span>
                    {wsMsg.payload.targetPlatform.name} responding to {wsMsg.payload.sourcePlatform.name}...
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-6">
        {/* File Upload Preview */}
        {uploadedFile && (
          <div className="mb-4" data-testid="file-preview">
            <Card className="p-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-file-pdf text-red-500"></i>
                <div className="flex-1">
                  <p className="text-sm font-medium" data-testid="file-name">
                    {uploadedFile.originalName}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid="file-size">
                    {Math.round(uploadedFile.size / 1024)} KB
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={removeFile}
                  data-testid="button-remove-file"
                >
                  <i className="fas fa-times text-muted-foreground"></i>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Input Controls */}
        <div className="flex items-end space-x-4">
          {/* File Upload Button */}
          <div className="relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              data-testid="input-file-upload"
            />
            <Button variant="ghost" size="sm" data-testid="button-file-upload">
              <i className="fas fa-paperclip text-muted-foreground"></i>
            </Button>
          </div>

          {/* Voice Recording Button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? "bg-red-500 text-white" : ""}
            data-testid="button-voice-recording"
          >
            <i className={`fas ${isRecording ? "fa-stop" : "fa-microphone"} ${isRecording ? "" : "text-muted-foreground"}`}></i>
          </Button>

          {/* Main Input Field */}
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message to send to all connected AI platforms..."
              className="resize-none min-h-[3rem] max-h-[150px]"
              data-testid="input-message"
            />
          </div>

          {/* Send Button */}
          <Button 
            onClick={handleSend}
            disabled={!message.trim() || sendMessageMutation.isPending}
            data-testid="button-send"
          >
            {sendMessageMutation.isPending ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-4 mt-4">
          <Button variant="ghost" size="sm" data-testid="button-ai-enhance">
            <i className="fas fa-magic mr-1"></i>
            <span className="text-xs">AI Enhance</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
