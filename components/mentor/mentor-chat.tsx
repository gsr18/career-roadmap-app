"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  Send,
  MessageSquare,
  Lightbulb,
  Target,
  BookOpen,
  TrendingUp,
  Clock,
  User,
  Sparkles,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface MentorChatProps {
  user: any
  userRoadmaps: any[]
  mentorSessions: any[]
}

export function MentorChat({ user, userRoadmaps, mentorSessions }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello ${
        user.email?.split("@")[0] || "there"
      }! I'm your AI Career Mentor. I'm here to help you navigate your career journey, provide guidance on your roadmaps, and answer any questions about professional development. How can I assist you today?`,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Mock AI response - in a real implementation, this would call an AI service
    const responses = [
      `That's a great question about ${userMessage.toLowerCase().includes("roadmap") ? "your roadmap" : "career development"}! Based on your current progress, I'd recommend focusing on building practical projects to reinforce your learning. Consider starting with small, manageable projects that align with your career goals.`,

      `I understand you're looking for guidance on ${userMessage.toLowerCase().includes("skill") ? "skill development" : "your career path"}. Here's my advice: consistency is key. Set aside dedicated time each day for learning, even if it's just 30 minutes. The compound effect of daily practice will accelerate your progress significantly.`,

      `Excellent question! For someone at your stage, I'd suggest connecting with others in your field through online communities, attending virtual meetups, and contributing to open-source projects. Networking and practical experience often matter as much as technical knowledge.`,

      `That's a common challenge many professionals face. My recommendation is to break down your goals into smaller, actionable steps. Instead of feeling overwhelmed by the entire roadmap, focus on completing one milestone at a time. Celebrate small wins along the way!`,

      `Based on current industry trends, the skills you're developing are highly valuable. I'd encourage you to document your learning journey through a blog or portfolio. This not only reinforces your knowledge but also demonstrates your expertise to potential employers.`,
    ]

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Select a contextual response
    let response = responses[Math.floor(Math.random() * responses.length)]

    // Add context based on user's roadmaps
    if (userRoadmaps.length > 0) {
      const inProgressRoadmaps = userRoadmaps.filter((r) => r.status === "in_progress")
      if (inProgressRoadmaps.length > 0) {
        response += ` Since you're currently working on ${inProgressRoadmaps[0].title}, you might want to focus on the practical applications of what you're learning.`
      }
    }

    return response
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(userMessage.content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Save to database
      const supabase = createClient()
      const sessionMessages = [...messages, userMessage, assistantMessage]

      if (currentSessionId) {
        // Update existing session
        await supabase
          .from("mentor_sessions")
          .update({
            messages: sessionMessages,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentSessionId)
      } else {
        // Create new session
        const { data } = await supabase
          .from("mentor_sessions")
          .insert({
            user_id: user.id,
            messages: sessionMessages,
            session_summary: `Discussion about ${userMessage.content.slice(0, 50)}...`,
          })
          .select()
          .single()

        if (data) {
          setCurrentSessionId(data.id)
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "How do I stay motivated while learning?",
    "What skills should I prioritize?",
    "How can I build a portfolio?",
    "What are the current industry trends?",
    "How do I prepare for interviews?",
    "Should I focus on breadth or depth?",
  ]

  const loadPreviousSession = (session: any) => {
    setMessages(session.messages || [])
    setCurrentSessionId(session.id)
  }

  const startNewSession = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm your AI Career Mentor. How can I help you with your career development today?`,
        timestamp: new Date(),
      },
    ])
    setCurrentSessionId(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Mentor Info */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Career Mentor
              </CardTitle>
              <CardDescription>Your personal guide to career success</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>I can help you with:</p>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-primary" />
                    Career planning & roadmaps
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-3 w-3 text-primary" />
                    Learning strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    Skill development
                  </li>
                  <li className="flex items-center gap-2">
                    <Lightbulb className="h-3 w-3 text-primary" />
                    Industry insights
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.slice(0, 4).map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2 text-xs"
                  onClick={() => setInputMessage(question)}
                >
                  <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="line-clamp-2">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Previous Sessions */}
          {mentorSessions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Sessions</CardTitle>
                <Button variant="outline" size="sm" onClick={startNewSession} className="w-full bg-transparent">
                  Start New Session
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {mentorSessions.slice(0, 5).map((session) => (
                  <Button
                    key={session.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => loadPreviousSession(session)}
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-medium line-clamp-1">{session.session_summary || "Chat Session"}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">AI Career Mentor</CardTitle>
                    <CardDescription className="text-sm">Online • Ready to help</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Active Session
                </Badge>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground/70"
                        }`}
                      >
                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Brain className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your career journey..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestedQuestions.slice(4).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 bg-transparent"
                    onClick={() => setInputMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
