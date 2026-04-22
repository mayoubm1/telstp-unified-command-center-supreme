"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, Mic, MicOff } from "lucide-react"

interface ChatMessage {
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "مرحباً! كيف يمكنني مساعدتك في مركز علوم الحياة العالمي؟\nHello! How can I help you with the Global Life Sciences Hub?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage: ChatMessage = {
        text: input,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        const response = await fetch("/api/gemini-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: input,
            context: "telemedicine_assistant",
            language: "bilingual", // Arabic and English
          }),
        })

        const data = await response.json()

        const aiMessage: ChatMessage = {
          text: data.response || "عذراً، حدث خطأ في الاتصال.\nSorry, there was a connection error.",
          sender: "ai",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
      } catch (error) {
        console.error("Chat error:", error)
        const errorMessage: ChatMessage = {
          text: "عذراً، لا أستطيع الرد في الوقت الحالي.\nSorry, I cannot respond right now.",
          sender: "ai",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang = "ar-EG" // Arabic (Egypt)
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full p-4 shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl w-96 h-[500px] flex flex-col border border-emerald-500/30">
          <div className="flex justify-between items-center p-4 border-b border-emerald-500/30 bg-gradient-to-r from-emerald-600/20 to-teal-600/20">
            <div>
              <h3 className="text-lg font-semibold text-white">مساعد الذكي</h3>
              <p className="text-sm text-emerald-300">AI Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-2xl leading-none">
              ×
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-gray-800">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                      : "bg-gray-700/80 text-gray-100 border border-emerald-500/20"
                  }`}
                  style={{ direction: msg.text.includes("ا") ? "rtl" : "ltr" }}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div
                    className={`text-xs mt-1 opacity-70 ${msg.sender === "user" ? "text-emerald-100" : "text-gray-400"}`}
                  >
                    {msg.timestamp.toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700/80 text-gray-100 border border-emerald-500/20 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-emerald-500/30 bg-gray-800/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder="اكتب رسالتك... Type your message..."
                className="flex-1 p-3 rounded-lg bg-gray-700/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-600"
                dir="auto"
              />

              <button
                onClick={handleVoiceInput}
                disabled={isListening}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  isListening ? "bg-red-500 text-white animate-pulse" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                }`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
