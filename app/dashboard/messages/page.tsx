"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { MessageSquare, Send, Search, Phone, Video, MoreHorizontal, Paperclip, Smile } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const mockContacts = [
  {
    id: "1",
    name: "Quách Thành Long",
    role: "Admin",
    department: "Phòng CNTT",
    avatar: "/placeholder.svg",
    lastMessage: "Họp team lúc 2h chiều nhé",
    lastMessageTime: "10:30",
    unreadCount: 0,
    isOnline: true
  },
  {
    id: "2",
    name: "Nguyễn Văn HR",
    role: "HR",
    department: "Phòng Nhân sự",
    avatar: "/placeholder.svg",
    lastMessage: "Đơn nghỉ phép đã được duyệt",
    lastMessageTime: "09:15",
    unreadCount: 2,
    isOnline: true
  },
  {
    id: "3",
    name: "Trần Thị Staff",
    role: "Staff",
    department: "Phòng Kinh doanh",
    avatar: "/placeholder.svg",
    lastMessage: "Cảm ơn anh!",
    lastMessageTime: "Hôm qua",
    unreadCount: 0,
    isOnline: false
  }
]

const mockMessages = [
  {
    id: "1",
    senderId: "2",
    senderName: "Nguyễn Văn HR",
    message: "Chào bạn! Đơn nghỉ phép của bạn đã được phê duyệt.",
    timestamp: "09:15",
    isRead: true
  },
  {
    id: "2",
    senderId: "current",
    senderName: "Bạn",
    message: "Cảm ơn anh! Khi nào tôi có thể nghỉ?",
    timestamp: "09:16",
    isRead: true
  },
  {
    id: "3",
    senderId: "2",
    senderName: "Nguyễn Văn HR",
    message: "Từ ngày 15/01 đến 17/01 như bạn đã đăng ký.",
    timestamp: "09:17",
    isRead: true
  },
  {
    id: "4",
    senderId: "current",
    senderName: "Bạn",
    message: "Perfect! Tôi sẽ sắp xếp công việc trước đó.",
    timestamp: "09:18",
    isRead: true
  }
]

export default function MessagesPage() {
  const { user } = useAuth()
  const [selectedContact, setSelectedContact] = useState(mockContacts[1])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  if (!user) return null

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            Tin nhắn
          </h1>
          <p className="text-muted-foreground">Giao tiếp nội bộ với đồng nghiệp</p>
        </div>
      </motion.div>

      {/* Messages Interface */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="h-[600px]">
          <div className="flex h-full">
            {/* Contacts Sidebar */}
            <div className="w-1/3 border-r">
              <CardHeader className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm liên hệ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 p-4 pt-0">
                  {filteredContacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContact.id === contact.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>
                              {contact.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {contact.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{contact.name}</p>
                            <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                            {contact.unreadCount > 0 && (
                              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {contact.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{contact.department}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                        <AvatarFallback>
                          {selectedContact.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedContact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedContact.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedContact.isOnline ? "Đang hoạt động" : "Offline"} • {selectedContact.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.senderId === "current" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${message.senderId === "current" ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.senderId === "current"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                        </div>
                        <p className={`text-xs text-muted-foreground mt-1 ${
                          message.senderId === "current" ? "text-right" : "text-left"
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                      {message.senderId !== "current" && (
                        <Avatar className="h-8 w-8 order-1 mr-2">
                          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                          <AvatarFallback className="text-xs">
                            {selectedContact.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-10"
                    />
                    <Button variant="ghost" size="sm" className="absolute right-1 top-1 h-6 w-6 p-0">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} size="sm" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}