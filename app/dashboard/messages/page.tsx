"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useState, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Send,
  Plus,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  ImageIcon,
  File,
  Users,
  Settings,
  Archive,
  Pin,
  Reply,
  Forward,
  Copy,
  Trash2,
  Edit,
  Check,
  CheckCheck,
  Clock,
  UserPlus,
  Hash,
  Bell,
  Star,
  Download,
  X,
  Menu,
  Mic,
  Camera,
  FileText,
  PlayCircle,
  PauseCircle,
  Share,
  Shield,
  Info,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockContacts = [
  {
    id: "1",
    name: "Quách Thành Long",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "admin",
    department: "Phòng CNTT",
    lastMessage: "Chào bạn! Hôm nay có meeting lúc 2h chiều nhé.",
    lastMessageTime: "09:30",
    unreadCount: 0,
    isOnline: true,
    isPinned: true,
    type: "direct",
    lastSeen: "Đang hoạt động",
    isTyping: false,
  },
  {
    id: "2",
    name: "Nguyễn Văn HR",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "hr",
    department: "Phòng Nhân sự",
    lastMessage: "OK anh, em sẽ chuẩn bị tài liệu.",
    lastMessageTime: "09:35",
    unreadCount: 2,
    isOnline: true,
    isPinned: false,
    type: "direct",
    lastSeen: "2 phút trước",
    isTyping: false,
  },
  {
    id: "3",
    name: "Trần Thị Staff",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "staff",
    department: "Phòng Kế toán",
    lastMessage: "Cảm ơn anh đã hỗ trợ!",
    lastMessageTime: "Hôm qua",
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
    type: "direct",
    lastSeen: "1 giờ trước",
    isTyping: false,
  },
  {
    id: "group1",
    name: "Team CNTT",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "group",
    department: "Nhóm",
    lastMessage: "Long: Code review xong rồi anh ơi!",
    lastMessageTime: "10:15",
    unreadCount: 5,
    isOnline: false,
    isPinned: true,
    type: "group",
    members: ["1", "4", "current"],
    memberCount: 8,
    description: "Nhóm thảo luận công việc IT",
    isTyping: true,
    typingUsers: ["Lê Minh Tân"],
  },
  {
    id: "group2",
    name: "Phòng Nhân sự",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "group",
    department: "Nhóm",
    lastMessage: "HR: Họp team vào thứ 2 nhé mọi người",
    lastMessageTime: "Hôm qua",
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
    type: "group",
    members: ["2", "3", "current"],
    memberCount: 12,
    description: "Thông báo và thảo luận HR",
    isTyping: false,
    typingUsers: [],
  },
  {
    id: "group3",
    name: "Toàn công ty",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "group",
    department: "Nhóm",
    lastMessage: "Admin: Thông báo nghỉ lễ Tết Nguyên đán",
    lastMessageTime: "2 ngày trước",
    unreadCount: 1,
    isOnline: false,
    isPinned: true,
    type: "group",
    members: ["1", "2", "3", "4", "current"],
    memberCount: 45,
    description: "Kênh thông báo chính thức",
    isTyping: false,
    typingUsers: [],
  },
]

const mockMessages = [
  {
    id: "1",
    senderId: "1",
    senderName: "Quách Thành Long",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    message: "Chào bạn! Hôm nay có meeting lúc 2h chiều nhé.",
    timestamp: "09:30",
    date: "Hôm nay",
    isOwn: false,
    type: "text",
    status: "read",
    reactions: [{ emoji: "👍", users: ["current"], count: 1 }],
    isEdited: false,
    replyTo: null,
    isForwarded: false,
    isStarred: false,
  },
  {
    id: "2",
    senderId: "current",
    senderName: "Bạn",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    message: "OK anh, em sẽ chuẩn bị tài liệu.",
    timestamp: "09:35",
    date: "Hôm nay",
    isOwn: true,
    type: "text",
    status: "read",
    reactions: [],
    isEdited: false,
    replyTo: null,
    isForwarded: false,
    isStarred: false,
  },
  {
    id: "3",
    senderId: "1",
    senderName: "Quách Thành Long",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    message: "Tuyệt vời! Nhớ mang theo báo cáo tháng trước nữa nhé.",
    timestamp: "09:36",
    date: "Hôm nay",
    isOwn: false,
    type: "text",
    status: "read",
    reactions: [{ emoji: "❤️", users: ["current"], count: 1 }],
    isEdited: false,
    replyTo: "2",
    isForwarded: false,
    isStarred: true,
  },
  {
    id: "4",
    senderId: "current",
    senderName: "Bạn",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    message: "",
    timestamp: "09:37",
    date: "Hôm nay",
    isOwn: true,
    type: "file",
    status: "delivered",
    reactions: [],
    isEdited: false,
    replyTo: null,
    isForwarded: false,
    isStarred: false,
    fileData: {
      name: "Báo_cáo_tháng_12.pdf",
      size: "2.5 MB",
      type: "pdf",
      url: "/placeholder-file.pdf",
      uploadProgress: 100,
    },
  },
  {
    id: "5",
    senderId: "1",
    senderName: "Quách Thành Long",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    message: "",
    timestamp: "09:40",
    date: "Hôm nay",
    isOwn: false,
    type: "image",
    status: "read",
    reactions: [{ emoji: "🔥", users: ["current"], count: 1 }],
    isEdited: false,
    replyTo: null,
    isForwarded: false,
    isStarred: false,
    imageData: {
      url: "/placeholder.svg?height=200&width=300",
      caption: "Screenshot của dashboard mới",
      width: 300,
      height: 200,
    },
  },
  {
    id: "6",
    senderId: "current",
    senderName: "Bạn",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    message: "",
    timestamp: "09:45",
    date: "Hôm nay",
    isOwn: true,
    type: "voice",
    status: "read",
    reactions: [],
    isEdited: false,
    replyTo: null,
    isForwarded: false,
    isStarred: false,
    voiceData: {
      duration: "0:45",
      url: "/placeholder-voice.mp3",
      isPlaying: false,
      waveform: [0.2, 0.5, 0.8, 0.3, 0.7, 0.4, 0.9, 0.1, 0.6, 0.8],
    },
  },
]

const emojiList = ["😀", "😂", "❤️", "👍", "👎", "😢", "😮", "😡", "🎉", "🔥", "💯", "👏", "🚀", "⭐", "💪", "🙌"]

const quickReplies = [
  "Được rồi!",
  "Cảm ơn bạn",
  "OK, hiểu rồi",
  "Tôi sẽ kiểm tra",
  "Chờ tôi một chút",
  "Hoàn thành rồi",
  "Có vấn đề gì không?",
  "Tuyệt vời!",
]

export default function MessagesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedContact, setSelectedContact] = useState(mockContacts[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [editingMessage, setEditingMessage] = useState(null)
  const [selectedMessages, setSelectedMessages] = useState([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [playingVoice, setPlayingVoice] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [fileUploadProgress, setFileUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)
  const voiceInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const messageInputRef = useRef(null)

  // Group creation state
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
    members: [],
    avatar: null,
    isPrivate: false,
  })

  // Message search state
  const [messageSearchTerm, setMessageSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showMessageSearch, setShowMessageSearch] = useState(false)

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setShowSidebar(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [mockMessages])

  // Recording timer
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  if (!user) return null

  const filteredContacts = mockContacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "direct") return matchesSearch && contact.type === "direct"
    if (activeTab === "groups") return matchesSearch && contact.type === "group"
    if (activeTab === "pinned") return matchesSearch && contact.isPinned
    if (activeTab === "unread") return matchesSearch && contact.unreadCount > 0

    return matchesSearch
  })

  const handleSendMessage = () => {
    if (newMessage.trim() || replyingTo) {
      console.log("Sending message:", {
        message: newMessage,
        replyTo: replyingTo?.id,
        contactId: selectedContact.id,
      })

      toast({
        title: "Tin nhắn đã gửi",
        description: "Tin nhắn của bạn đã được gửi thành công",
      })

      setNewMessage("")
      setReplyingTo(null)
      messageInputRef.current?.focus()
    }
  }

  const handleFileUpload = (type) => {
    if (type === "file") {
      fileInputRef.current?.click()
    } else if (type === "image") {
      imageInputRef.current?.click()
    }
  }

  const handleFileSelect = (event, type) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploading(true)
      setFileUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setFileUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            toast({
              title: "Upload thành công",
              description: `${file.name} đã được upload`,
            })
            return 100
          }
          return prev + 10
        })
      }, 200)

      console.log(`Uploading ${type}:`, file)
    }
  }

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
    messageInputRef.current?.focus()
  }

  const handleQuickReply = (reply) => {
    setNewMessage(reply)
    messageInputRef.current?.focus()
  }

  const handleCreateGroup = () => {
    if (!groupData.name.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên nhóm",
        variant: "destructive",
      })
      return
    }

    console.log("Creating group:", groupData)
    toast({
      title: "Tạo nhóm thành công",
      description: `Nhóm "${groupData.name}" đã được tạo`,
    })

    setShowCreateGroup(false)
    setGroupData({ name: "", description: "", members: [], avatar: null, isPrivate: false })
  }

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      toast({
        title: "Ghi âm hoàn tất",
        description: `Đã ghi âm ${recordingTime}s`,
      })
    } else {
      setIsRecording(true)
      toast({
        title: "Bắt đầu ghi âm",
        description: "Nhấn lại để dừng ghi âm",
      })
    }
  }

  const handlePlayVoice = (messageId) => {
    if (playingVoice === messageId) {
      setPlayingVoice(null)
    } else {
      setPlayingVoice(messageId)
      // Simulate voice playing
      setTimeout(() => setPlayingVoice(null), 3000)
    }
  }

  const handleMessageAction = (action, messageId) => {
    const message = mockMessages.find((m) => m.id === messageId)

    switch (action) {
      case "reply":
        setReplyingTo(message)
        messageInputRef.current?.focus()
        break
      case "forward":
        console.log("Forwarding message:", messageId)
        toast({ title: "Chuyển tiếp", description: "Chọn người nhận" })
        break
      case "copy":
        navigator.clipboard.writeText(message.message)
        toast({ title: "Đã sao chép", description: "Nội dung đã được sao chép" })
        break
      case "star":
        console.log("Starring message:", messageId)
        toast({ title: "Đã đánh dấu", description: "Tin nhắn đã được đánh dấu" })
        break
      case "delete":
        console.log("Deleting message:", messageId)
        toast({ title: "Đã xóa", description: "Tin nhắn đã được xóa" })
        break
      case "edit":
        setEditingMessage(message)
        setNewMessage(message.message)
        messageInputRef.current?.focus()
        break
    }
  }

  const handleReaction = (messageId, emoji) => {
    console.log("Adding reaction:", { messageId, emoji })
    toast({
      title: "Đã thêm reaction",
      description: `Đã thêm ${emoji} vào tin nhắn`,
    })
  }

  const handleContactSelect = (contact) => {
    setSelectedContact(contact)
    if (isMobile) {
      setShowSidebar(false)
    }
    setShowContactInfo(false)
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "text-red-600"
      case "hr":
        return "text-blue-600"
      case "staff":
        return "text-green-600"
      case "group":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const getMessageStatus = (status) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400 animate-spin" />
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return <Clock className="h-3 w-3 text-gray-400" />
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const ContactSidebar = () => (
    <div className="w-full md:w-1/3 border-r flex flex-col bg-background">
      <div className="p-3 md:p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tin nhắn</h2>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm cuộc trò chuyện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="text-xs">
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="direct" className="text-xs">
              Cá nhân
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">
              Nhóm
            </TabsTrigger>
            <TabsTrigger value="pinned" className="text-xs">
              Ghim
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              Chưa đọc
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredContacts.map((contact) => (
            <motion.div
              key={contact.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-3 rounded-lg cursor-pointer transition-all relative
                ${selectedContact.id === contact.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
              `}
              onClick={() => handleContactSelect(contact)}
            >
              {contact.isPinned && <Pin className="absolute top-2 right-2 h-3 w-3 opacity-60" />}

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 md:h-12 md:w-12">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                    <AvatarFallback>
                      {contact.type === "group" ? (
                        <Users className="h-5 w-5 md:h-6 md:w-6" />
                      ) : (
                        contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {contact.isOnline && contact.type === "direct" && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                  {contact.type === "group" && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full border-2 border-background flex items-center justify-center">
                      <Hash className="h-1.5 w-1.5 md:h-2 md:w-2 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate flex items-center gap-2">
                      {contact.name}
                      {contact.type === "group" && (
                        <Badge variant="secondary" className="text-xs">
                          {contact.memberCount || contact.members?.length || 0}
                        </Badge>
                      )}
                    </h4>
                    <span className="text-xs opacity-70">{contact.lastMessageTime}</span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex-1 min-w-0">
                      {contact.isTyping ? (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                            <div
                              className="w-1 h-1 bg-current rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1 h-1 bg-current rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-xs">
                            {contact.type === "group" && contact.typingUsers?.length > 0
                              ? `${contact.typingUsers[0]} đang nhập...`
                              : "Đang nhập..."}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm opacity-70 truncate">{contact.lastMessage}</p>
                      )}
                    </div>

                    {contact.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center ml-2">
                        {contact.unreadCount > 99 ? "99+" : contact.unreadCount}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${getRoleColor(contact.role)} opacity-80`}>{contact.department}</p>
                    {contact.type === "direct" && !contact.isOnline && (
                      <span className="text-xs opacity-50">{contact.lastSeen}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Tạo nhóm
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tạo nhóm chat mới</DialogTitle>
                <DialogDescription>Tạo nhóm để thảo luận với nhiều thành viên cùng lúc</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Tên nhóm</Label>
                  <Input
                    id="groupName"
                    placeholder="Nhập tên nhóm..."
                    value={groupData.name}
                    onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupDesc">Mô tả (tùy chọn)</Label>
                  <Textarea
                    id="groupDesc"
                    placeholder="Mô tả về nhóm..."
                    value={groupData.description}
                    onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="private"
                    checked={groupData.isPrivate}
                    onCheckedChange={(checked) => setGroupData({ ...groupData, isPrivate: checked })}
                  />
                  <Label htmlFor="private">Nhóm riêng tư</Label>
                </div>
                <div className="space-y-2">
                  <Label>Thêm thành viên</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thành viên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Quách Thành Long</SelectItem>
                      <SelectItem value="2">Nguyễn Văn HR</SelectItem>
                      <SelectItem value="3">Trần Thị Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowCreateGroup(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleCreateGroup}>Tạo nhóm</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button size="sm" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Chat mới
          </Button>
        </div>
      </div>
    </div>
  )

  const ChatArea = () => (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-3 md:p-4 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => setShowSidebar(true)}>
              <Menu className="h-4 w-4" />
            </Button>
          )}

          <div className="relative">
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
              <AvatarFallback>
                {selectedContact.type === "group" ? (
                  <Users className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                )}
              </AvatarFallback>
            </Avatar>
            {selectedContact.isOnline && selectedContact.type === "direct" && (
              <div className="absolute -bottom-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-background"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium flex items-center gap-2">
              {selectedContact.name}
              {selectedContact.type === "group" && (
                <Badge variant="outline" className="text-xs">
                  {selectedContact.memberCount || selectedContact.members?.length || 0} thành viên
                </Badge>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedContact.type === "direct"
                ? selectedContact.isOnline
                  ? "Đang hoạt động"
                  : selectedContact.lastSeen
                : selectedContact.description || selectedContact.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setShowMessageSearch(!showMessageSearch)}>
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tìm kiếm tin nhắn</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Gọi điện</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Video call</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowContactInfo(!showContactInfo)}>
                <Info className="mr-2 h-4 w-4" />
                Thông tin {selectedContact.type === "group" ? "nhóm" : "liên hệ"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pin className="mr-2 h-4 w-4" />
                {selectedContact.isPinned ? "Bỏ ghim" : "Ghim cuộc trò chuyện"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Tắt thông báo
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Lưu trữ
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Cài đặt chat
              </DropdownMenuItem>
              {selectedContact.type === "group" && (
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Thêm thành viên
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa cuộc trò chuyện
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Message Search */}
      {showMessageSearch && (
        <div className="p-3 border-b bg-muted/20">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm trong cuộc trò chuyện..."
              value={messageSearchTerm}
              onChange={(e) => setMessageSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              onClick={() => setShowMessageSearch(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 md:p-4">
        <div className="space-y-4">
          {mockMessages.map((message, index) => {
            const showAvatar = !message.isOwn && (index === 0 || mockMessages[index - 1].senderId !== message.senderId)
            const showSender = !message.isOwn && showAvatar && selectedContact.type === "group"

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"} group`}
              >
                <div className={`max-w-[70%] md:max-w-[60%] ${message.isOwn ? "order-2" : "order-1"}`}>
                  {/* Sender info for group chats */}
                  {showSender && (
                    <div className="flex items-center gap-2 mb-1 ml-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                        <AvatarFallback className="text-xs">
                          {message.senderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-muted-foreground">{message.senderName}</span>
                    </div>
                  )}

                  {/* Reply preview */}
                  {message.replyTo && (
                    <div className="mb-2 ml-2">
                      <div className="p-2 bg-muted/50 rounded border-l-4 border-primary">
                        <p className="text-xs text-muted-foreground">
                          Trả lời {mockMessages.find((m) => m.id === message.replyTo)?.senderName}
                        </p>
                        <p className="text-sm truncate">
                          {mockMessages.find((m) => m.id === message.replyTo)?.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className={`
                      relative rounded-2xl transition-all
                      ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground rounded-br-md ml-4"
                          : "bg-muted rounded-bl-md mr-4"
                      }
                      ${message.type === "text" ? "p-3" : "overflow-hidden"}
                    `}
                  >
                    {/* Message Content */}
                    {message.type === "text" && (
                      <div>
                        <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                        {message.isEdited && <span className="text-xs opacity-70 italic"> (đã chỉnh sửa)</span>}
                      </div>
                    )}

                    {message.type === "file" && (
                      <div className="p-3">
                        <div className="flex items-center gap-3 p-3 bg-background/10 rounded-lg">
                          <div className="p-2 bg-background/20 rounded">
                            <File className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{message.fileData.name}</p>
                            <p className="text-xs opacity-70">{message.fileData.size}</p>
                            {message.fileData.uploadProgress < 100 && (
                              <Progress value={message.fileData.uploadProgress} className="mt-1 h-1" />
                            )}
                          </div>
                          <Button size="sm" variant="ghost" className="p-2">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {message.type === "image" && (
                      <div>
                        <img
                          src={message.imageData.url || "/placeholder.svg"}
                          alt="Shared image"
                          className="w-full h-auto max-w-sm rounded-lg cursor-pointer"
                          onClick={() => setImagePreview(message.imageData)}
                        />
                        {message.imageData.caption && (
                          <div className="p-3">
                            <p className="text-sm">{message.imageData.caption}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {message.type === "voice" && (
                      <div className="p-3">
                        <div className="flex items-center gap-3">
                          <Button size="sm" variant="ghost" className="p-2" onClick={() => handlePlayVoice(message.id)}>
                            {playingVoice === message.id ? (
                              <PauseCircle className="h-6 w-6" />
                            ) : (
                              <PlayCircle className="h-6 w-6" />
                            )}
                          </Button>

                          <div className="flex-1">
                            <div className="flex items-center gap-1 h-8">
                              {message.voiceData.waveform.map((height, idx) => (
                                <div
                                  key={idx}
                                  className={`w-1 bg-current rounded-full transition-all ${
                                    playingVoice === message.id ? "opacity-100" : "opacity-60"
                                  }`}
                                  style={{ height: `${height * 100}%` }}
                                />
                              ))}
                            </div>
                          </div>

                          <span className="text-xs opacity-70">{message.voiceData.duration}</span>
                        </div>
                      </div>
                    )}

                    {/* Message Actions */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 right-0 flex gap-1 bg-background border rounded-lg shadow-lg p-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleMessageAction("reply", message.id)}
                            >
                              <Reply className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Trả lời</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleMessageAction("forward", message.id)}
                            >
                              <Forward className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Chuyển tiếp</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleMessageAction("star", message.id)}
                            >
                              <Star
                                className={`h-3 w-3 ${message.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Đánh dấu</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleMessageAction("copy", message.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Sao chép
                          </DropdownMenuItem>
                          {message.isOwn && (
                            <DropdownMenuItem onClick={() => handleMessageAction("edit", message.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleMessageAction("share", message.id)}>
                            <Share className="mr-2 h-4 w-4" />
                            Chia sẻ
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleMessageAction("delete", message.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {message.reactions.map((reaction, idx) => (
                          <Button
                            key={idx}
                            variant="secondary"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => handleReaction(message.id, reaction.emoji)}
                          >
                            {reaction.emoji} {reaction.count}
                          </Button>
                        ))}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <div className="grid grid-cols-4 gap-1 p-2">
                              {emojiList.slice(0, 8).map((emoji, idx) => (
                                <Button
                                  key={idx}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-lg"
                                  onClick={() => handleReaction(message.id, emoji)}
                                >
                                  {emoji}
                                </Button>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>

                  {/* Message Info */}
                  <div
                    className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground px-2 ${
                      message.isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{message.timestamp}</span>
                    {message.isOwn && getMessageStatus(message.status)}
                    {message.isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                    {message.isForwarded && <Forward className="h-3 w-3" />}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Typing indicator */}
          {selectedContact.isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="max-w-[70%] md:max-w-[60%]">
                <div className="bg-muted rounded-2xl rounded-bl-md p-3 mr-4">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedContact.type === "group" && selectedContact.typingUsers?.length > 0
                        ? `${selectedContact.typingUsers[0]} đang nhập...`
                        : `${selectedContact.name} đang nhập...`}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="px-3 md:px-4 py-2 bg-muted/50 border-t border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div className="text-sm flex-1 min-w-0">
              <p className="font-medium">Trả lời {replyingTo.senderName}</p>
              <p className="text-muted-foreground truncate">{replyingTo.message}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="px-3 md:px-4 py-2 bg-muted/50 border-t">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Đang upload...</span>
                <span className="text-sm">{fileUploadProgress}%</span>
              </div>
              <Progress value={fileUploadProgress} className="h-2" />
            </div>
            <Button size="sm" variant="ghost" onClick={() => setIsUploading(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Quick Replies */}
      <div className="px-3 md:px-4 py-2 border-t">
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {quickReplies.map((reply, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="whitespace-nowrap bg-transparent"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message Input */}
      <div className="p-3 md:p-4 border-t bg-background">
        <div className="flex items-end gap-2">
          {/* Attachment Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="shrink-0 h-10 w-10 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFileUpload("file")}>
                <File className="mr-2 h-4 w-4" />
                Tệp tin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileUpload("image")}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Hình ảnh
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="mr-2 h-4 w-4" />
                Chụp ảnh
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Tài liệu
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={messageInputRef}
              placeholder={editingMessage ? "Chỉnh sửa tin nhắn..." : "Nhập tin nhắn..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="min-h-[40px] max-h-[120px] resize-none pr-20"
              rows={1}
            />

            {/* Emoji Picker */}
            <div className="absolute right-12 top-2">
              <DropdownMenu open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                  <div className="grid grid-cols-8 gap-2 p-4">
                    {emojiList.map((emoji, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-lg"
                        onClick={() => handleEmojiSelect(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Voice Record Button */}
            <div className="absolute right-2 top-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-6 w-6 p-0 ${isRecording ? "text-red-500" : ""}`}
                      onClick={handleVoiceRecord}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isRecording ? `Dừng ghi âm (${formatTime(recordingTime)})` : "Ghi âm"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && !replyingTo}
            size="sm"
            className="shrink-0 h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-2 flex items-center gap-2 text-red-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Đang ghi âm... {formatTime(recordingTime)}</span>
          </div>
        )}

        {/* Editing Indicator */}
        {editingMessage && (
          <div className="mt-2 flex items-center gap-2 text-blue-500">
            <Edit className="h-4 w-4" />
            <span className="text-sm">Đang chỉnh sửa tin nhắn</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setEditingMessage(null)
                setNewMessage("")
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.xlsx,.ppt,.pptx"
        onChange={(e) => handleFileSelect(e, "file")}
      />
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileSelect(e, "image")}
      />
    </div>
  )

  const ContactInfo = () => (
    <div className="w-80 border-l bg-background p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Thông tin {selectedContact.type === "group" ? "nhóm" : "liên hệ"}</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowContactInfo(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center space-y-4">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
          <AvatarFallback className="text-2xl">
            {selectedContact.type === "group" ? (
              <Users className="h-10 w-10" />
            ) : (
              selectedContact.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            )}
          </AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-medium text-lg">{selectedContact.name}</h4>
          <p className="text-sm text-muted-foreground">{selectedContact.department}</p>
          {selectedContact.type === "direct" && (
            <p className="text-sm text-muted-foreground">
              {selectedContact.isOnline ? "Đang hoạt động" : selectedContact.lastSeen}
            </p>
          )}
        </div>
      </div>

      {selectedContact.type === "group" && (
        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">Mô tả nhóm</h5>
            <p className="text-sm text-muted-foreground">{selectedContact.description || "Không có mô tả"}</p>
          </div>

          <div>
            <h5 className="font-medium mb-2">Thành viên ({selectedContact.memberCount})</h5>
            <div className="space-y-2">
              {mockContacts
                .filter((c) => c.type === "direct")
                .slice(0, 5)
                .map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.department}</p>
                    </div>
                    {member.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                  </div>
                ))}
              {selectedContact.memberCount > 5 && (
                <Button variant="ghost" size="sm" className="w-full">
                  Xem thêm {selectedContact.memberCount - 5} thành viên
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm tin nhắn
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
          <ImageIcon className="mr-2 h-4 w-4" />
          Xem ảnh & video
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
          <File className="mr-2 h-4 w-4" />
          Xem tệp tin
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
          <Star className="mr-2 h-4 w-4" />
          Tin nhắn đã đánh dấu
        </Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Thông báo</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Ghim cuộc trò chuyện</span>
          <Switch checked={selectedContact.isPinned} />
        </div>
      </div>

      <div className="space-y-2">
        <Button variant="outline" size="sm" className="w-full justify-start text-red-600 bg-transparent">
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa cuộc trò chuyện
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start text-red-600 bg-transparent">
          <Shield className="mr-2 h-4 w-4" />
          Chặn {selectedContact.type === "group" ? "nhóm" : "người dùng"}
        </Button>
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <div className="h-[calc(100vh-4rem)] flex bg-background">
        {/* Mobile Sidebar */}
        {isMobile && showSidebar && (
          <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
            <SheetContent side="left" className="p-0 w-full max-w-sm">
              <ContactSidebar />
            </SheetContent>
          </Sheet>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && <ContactSidebar />}

        {/* Chat Area */}
        <ChatArea />

        {/* Contact Info Sidebar */}
        {showContactInfo && !isMobile && <ContactInfo />}

        {/* Image Preview Modal */}
        {imagePreview && (
          <Dialog open={!!imagePreview} onOpenChange={() => setImagePreview(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Xem ảnh</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <img
                  src={imagePreview.url || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              {imagePreview.caption && <p className="text-center text-muted-foreground">{imagePreview.caption}</p>}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  )
}
