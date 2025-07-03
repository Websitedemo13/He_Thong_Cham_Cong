"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Filter,
  Search,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Star,
  Tag,
  X,
  MoreHorizontal,
  Calendar,
  FileText,
  Bell,
  Settings,
  Share,
  Copy,
  AlertCircle,
} from "lucide-react"
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
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"

const mockEvents = [
  {
    id: "1",
    title: "Họp team CNTT",
    date: "2025-01-03",
    time: "09:00 - 10:30",
    type: "meeting",
    attendees: ["Quách Thành Long", "Lê Minh Tân"],
    location: "Phòng họp A",
    color: "blue",
    description: "Thảo luận về dự án mới và phân công công việc cho quý 1/2025",
    createdBy: "admin",
    isRecurring: false,
    priority: "high",
    tags: ["work", "team", "planning"],
    reminder: true,
    status: "confirmed",
  },
  {
    id: "2",
    title: "Đào tạo nhân viên mới",
    date: "2025-01-03",
    time: "14:00 - 17:00",
    type: "training",
    attendees: ["Nguyễn Văn HR", "Trần Thị Staff"],
    location: "Phòng đào tạo",
    color: "green",
    description: "Hướng dẫn quy trình làm việc và văn hóa công ty",
    createdBy: "hr",
    isRecurring: false,
    priority: "medium",
    tags: ["training", "hr", "onboarding"],
    reminder: true,
    status: "confirmed",
  },
  {
    id: "3",
    title: "Ghi chú: Review code dashboard",
    date: "2025-01-04",
    time: "15:00 - 16:00",
    type: "personal",
    attendees: [],
    location: "",
    color: "purple",
    description: "Review code cho module dashboard mới, kiểm tra performance",
    createdBy: "staff",
    isRecurring: false,
    priority: "low",
    tags: ["personal", "code", "review"],
    reminder: false,
    status: "pending",
  },
  {
    id: "4",
    title: "Deadline: Báo cáo tháng 12",
    date: "2025-01-05",
    time: "17:00",
    type: "deadline",
    attendees: ["Tất cả nhân viên"],
    location: "",
    color: "red",
    description: "Nộp báo cáo công việc tháng 12/2024",
    createdBy: "admin",
    isRecurring: false,
    priority: "high",
    tags: ["deadline", "report", "monthly"],
    reminder: true,
    status: "urgent",
  },
  {
    id: "5",
    title: "Sinh nhật Nguyễn Văn HR",
    date: "2025-01-06",
    time: "12:00 - 13:00",
    type: "birthday",
    attendees: ["Toàn bộ công ty"],
    location: "Phòng ăn",
    color: "pink",
    description: "Chúc mừng sinh nhật đồng nghiệp",
    createdBy: "hr",
    isRecurring: true,
    priority: "low",
    tags: ["birthday", "celebration", "team"],
    reminder: true,
    status: "confirmed",
  },
]

const eventTypes = [
  { value: "meeting", label: "Cuộc họp", color: "blue", icon: Users },
  { value: "training", label: "Đào tạo", color: "green", icon: FileText },
  { value: "leave", label: "Nghỉ phép", color: "orange", icon: Calendar },
  { value: "personal", label: "Ghi chú cá nhân", color: "purple", icon: Edit },
  { value: "deadline", label: "Deadline", color: "red", icon: AlertCircle },
  { value: "birthday", label: "Sinh nhật", color: "pink", icon: Star },
  { value: "holiday", label: "Ngày lễ", color: "yellow", icon: Calendar },
]

const priorityOptions = [
  { value: "low", label: "Thấp", color: "gray" },
  { value: "medium", label: "Trung bình", color: "yellow" },
  { value: "high", label: "Cao", color: "red" },
]

const statusOptions = [
  { value: "pending", label: "Chờ xác nhận", color: "yellow" },
  { value: "confirmed", label: "Đã xác nhận", color: "green" },
  { value: "cancelled", label: "Đã hủy", color: "red" },
  { value: "urgent", label: "Khẩn cấp", color: "red" },
]

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
const weekDaysFull = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]

export default function CalendarPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [selectedDate, setSelectedDate] = useState(3)
  const [viewMode, setViewMode] = useState("month")
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    types: [],
    priorities: [],
    statuses: [],
    createdBy: "all",
    dateRange: "all",
  })

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "",
    location: "",
    attendees: [],
    priority: "medium",
    status: "pending",
    isRecurring: false,
    recurringType: "weekly",
    tags: [],
    reminder: true,
    reminderTime: "15",
    isAllDay: false,
  })

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!user) return null

  // Check personal note limit for staff
  const personalNotesCount = mockEvents.filter(
    (event) => event.type === "personal" && event.createdBy === "staff",
  ).length

  const canCreatePersonalNote = user.role !== "staff" || personalNotesCount < 5

  const getEventsForDate = (date) => {
    const dateStr = `2025-01-${date.toString().padStart(2, "0")}`
    return mockEvents.filter((event) => {
      const matchesDate = event.date === dateStr
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedFilters.types.length === 0 || selectedFilters.types.includes(event.type)
      const matchesPriority =
        selectedFilters.priorities.length === 0 || selectedFilters.priorities.includes(event.priority)
      const matchesStatus = selectedFilters.statuses.length === 0 || selectedFilters.statuses.includes(event.status)
      const matchesCreator = selectedFilters.createdBy === "all" || event.createdBy === selectedFilters.createdBy

      return matchesDate && matchesSearch && matchesType && matchesPriority && matchesStatus && matchesCreator
    })
  }

  const getAllFilteredEvents = () => {
    return mockEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedFilters.types.length === 0 || selectedFilters.types.includes(event.type)
      const matchesPriority =
        selectedFilters.priorities.length === 0 || selectedFilters.priorities.includes(event.priority)
      const matchesStatus = selectedFilters.statuses.length === 0 || selectedFilters.statuses.includes(event.status)
      const matchesCreator = selectedFilters.createdBy === "all" || event.createdBy === selectedFilters.createdBy

      return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesCreator
    })
  }

  const handleCreateEvent = () => {
    if (!eventForm.title || !eventForm.date) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      })
      return
    }

    if (eventForm.type === "personal" && !canCreatePersonalNote) {
      toast({
        title: "Đã đạt giới hạn",
        description: "Nhân viên chỉ được tạo tối đa 5 ghi chú cá nhân",
        variant: "destructive",
      })
      return
    }

    console.log("Creating event:", eventForm)
    toast({
      title: "Thành công!",
      description: editingEvent ? "Sự kiện đã được cập nhật" : "Sự kiện đã được tạo",
    })

    setShowEventDialog(false)
    setEditingEvent(null)
    resetEventForm()
  }

  const resetEventForm = () => {
    setEventForm({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "",
      location: "",
      attendees: [],
      priority: "medium",
      status: "pending",
      isRecurring: false,
      recurringType: "weekly",
      tags: [],
      reminder: true,
      reminderTime: "15",
      isAllDay: false,
    })
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      startTime: event.time.split(" - ")[0] || "",
      endTime: event.time.split(" - ")[1] || "",
      type: event.type,
      location: event.location,
      attendees: event.attendees,
      priority: event.priority,
      status: event.status,
      isRecurring: event.isRecurring,
      recurringType: "weekly",
      tags: event.tags,
      reminder: event.reminder,
      reminderTime: "15",
      isAllDay: false,
    })
    setShowEventDialog(true)
  }

  const handleDeleteEvent = (eventId) => {
    console.log("Deleting event:", eventId)
    toast({
      title: "Đã xóa",
      description: "Sự kiện đã được xóa thành công",
    })
  }

  const handleExportCalendar = (format) => {
    console.log(`Exporting calendar as ${format}`)
    toast({
      title: "Đang xuất file",
      description: `Đang tạo file ${format.toUpperCase()}...`,
    })
  }

  const getEventTypeInfo = (type) => {
    return eventTypes.find((t) => t.value === type) || eventTypes[0]
  }

  const getPriorityInfo = (priority) => {
    return priorityOptions.find((p) => p.value === priority) || priorityOptions[0]
  }

  const getStatusInfo = (status) => {
    return statusOptions.find((s) => s.value === status) || statusOptions[0]
  }

  const selectedDateEvents = getEventsForDate(selectedDate)
  const allFilteredEvents = getAllFilteredEvents()

  const canCreateEvent = () => {
    return user.role === "admin" || user.role === "hr" || user.role === "staff"
  }

  const getAvailableEventTypes = () => {
    if (user.role === "admin") return eventTypes
    if (user.role === "hr") return eventTypes.filter((type) => type.value !== "personal")
    if (user.role === "staff") return eventTypes.filter((type) => ["personal", "leave"].includes(type.value))
    return []
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Event Types */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Loại sự kiện</Label>
        <div className="space-y-2">
          {eventTypes.map((type) => {
            const Icon = type.icon
            return (
              <div key={type.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`type-${type.value}`}
                  checked={selectedFilters.types.includes(type.value)}
                  onChange={(e) => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      types: e.target.checked
                        ? [...prev.types, type.value]
                        : prev.types.filter((t) => t !== type.value),
                    }))
                  }}
                  className="rounded"
                />
                <label htmlFor={`type-${type.value}`} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Icon className="h-4 w-4" />
                  <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                  {type.label}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Priorities */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Độ ưu tiên</Label>
        <div className="space-y-2">
          {priorityOptions.map((priority) => (
            <div key={priority.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`priority-${priority.value}`}
                checked={selectedFilters.priorities.includes(priority.value)}
                onChange={(e) => {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    priorities: e.target.checked
                      ? [...prev.priorities, priority.value]
                      : prev.priorities.filter((p) => p !== priority.value),
                  }))
                }}
                className="rounded"
              />
              <label htmlFor={`priority-${priority.value}`} className="flex items-center gap-2 text-sm cursor-pointer">
                <div className={`w-3 h-3 rounded-full bg-${priority.color}-500`}></div>
                {priority.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Trạng thái</Label>
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <div key={status.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`status-${status.value}`}
                checked={selectedFilters.statuses.includes(status.value)}
                onChange={(e) => {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    statuses: e.target.checked
                      ? [...prev.statuses, status.value]
                      : prev.statuses.filter((s) => s !== status.value),
                  }))
                }}
                className="rounded"
              />
              <label htmlFor={`status-${status.value}`} className="flex items-center gap-2 text-sm cursor-pointer">
                <div className={`w-3 h-3 rounded-full bg-${status.color}-500`}></div>
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Filter (Admin only) */}
      {user.role === "admin" && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Người tạo</Label>
          <Select
            value={selectedFilters.createdBy}
            onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, createdBy: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={() =>
          setSelectedFilters({
            types: [],
            priorities: [],
            statuses: [],
            createdBy: "all",
            dateRange: "all",
          })
        }
        className="w-full"
      >
        <X className="mr-2 h-4 w-4" />
        Xóa bộ lọc
      </Button>
    </div>
  )

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0"
      >
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold">
            {user.role === "admin" ? "Lịch hệ thống" : user.role === "hr" ? "Lịch chung" : "Lịch cá nhân"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {user.role === "admin"
              ? "Quản lý lịch làm việc toàn công ty"
              : user.role === "hr"
                ? "Xem lịch làm việc chung và quản lý sự kiện"
                : "Lịch làm việc và ghi chú cá nhân"}
          </p>
          {user.role === "staff" && (
            <p className="text-xs md:text-sm text-muted-foreground">
              Ghi chú cá nhân: {personalNotesCount}/5 {!canCreatePersonalNote && "(Đã đạt giới hạn)"}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Mobile Filters */}
          {isMobile && (
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                  {(selectedFilters.types.length > 0 ||
                    selectedFilters.priorities.length > 0 ||
                    selectedFilters.statuses.length > 0 ||
                    selectedFilters.createdBy !== "all") && (
                    <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                      {selectedFilters.types.length +
                        selectedFilters.priorities.length +
                        selectedFilters.statuses.length +
                        (selectedFilters.createdBy !== "all" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Bộ lọc sự kiện</SheetTitle>
                  <SheetDescription>Lọc sự kiện theo tiêu chí</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Desktop Filters */}
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                  {(selectedFilters.types.length > 0 ||
                    selectedFilters.priorities.length > 0 ||
                    selectedFilters.statuses.length > 0 ||
                    selectedFilters.createdBy !== "all") && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedFilters.types.length +
                        selectedFilters.priorities.length +
                        selectedFilters.statuses.length +
                        (selectedFilters.createdBy !== "all" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
                <div className="p-4">
                  <FilterContent />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Export/Import */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                {!isMobile && "Xuất/Nhập"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Xuất lịch</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleExportCalendar("pdf")}>
                <Download className="mr-2 h-4 w-4" />
                Xuất PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportCalendar("excel")}>
                <Download className="mr-2 h-4 w-4" />
                Xuất Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportCalendar("ics")}>
                <Download className="mr-2 h-4 w-4" />
                Xuất ICS
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                Nhập từ file
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create Event */}
          {canCreateEvent() && (
            <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {!isMobile && "Thêm sự kiện"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingEvent ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}</DialogTitle>
                  <DialogDescription>
                    {editingEvent ? "Cập nhật thông tin sự kiện" : "Điền thông tin chi tiết cho sự kiện mới"}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Tiêu đề <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Nhập tiêu đề sự kiện..."
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">
                        Loại sự kiện <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={eventForm.type}
                        onValueChange={(value) => setEventForm({ ...eventForm, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại sự kiện" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableEventTypes().map((type) => {
                            const Icon = type.icon
                            return (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                                  {type.label}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      {eventForm.type === "personal" && user.role === "staff" && !canCreatePersonalNote && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>Bạn đã đạt giới hạn 5 ghi chú cá nhân</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allDay"
                        checked={eventForm.isAllDay}
                        onCheckedChange={(checked) => setEventForm({ ...eventForm, isAllDay: checked })}
                      />
                      <Label htmlFor="allDay">Cả ngày</Label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="date">
                          Ngày <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        />
                      </div>

                      {!eventForm.isAllDay && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="startTime">Giờ bắt đầu</Label>
                            <Input
                              id="startTime"
                              type="time"
                              value={eventForm.startTime}
                              onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="endTime">Giờ kết thúc</Label>
                            <Input
                              id="endTime"
                              type="time"
                              value={eventForm.endTime}
                              onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết về sự kiện..."
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Location & Priority */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Địa điểm</Label>
                      <Input
                        id="location"
                        placeholder="Nhập địa điểm..."
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Độ ưu tiên</Label>
                      <Select
                        value={eventForm.priority}
                        onValueChange={(value) => setEventForm({ ...eventForm, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityOptions.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full bg-${priority.color}-500`}></div>
                                {priority.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={eventForm.status}
                      onValueChange={(value) => setEventForm({ ...eventForm, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full bg-${status.color}-500`}></div>
                              {status.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Advanced Options */}
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Tùy chọn nâng cao</h4>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Lặp lại sự kiện</Label>
                        <p className="text-sm text-muted-foreground">Tự động tạo sự kiện định kỳ</p>
                      </div>
                      <Switch
                        checked={eventForm.isRecurring}
                        onCheckedChange={(checked) => setEventForm({ ...eventForm, isRecurring: checked })}
                      />
                    </div>

                    {eventForm.isRecurring && (
                      <div className="space-y-2">
                        <Label htmlFor="recurringType">Loại lặp lại</Label>
                        <Select
                          value={eventForm.recurringType}
                          onValueChange={(value) => setEventForm({ ...eventForm, recurringType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Hàng ngày</SelectItem>
                            <SelectItem value="weekly">Hàng tuần</SelectItem>
                            <SelectItem value="monthly">Hàng tháng</SelectItem>
                            <SelectItem value="yearly">Hàng năm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Nhắc nhở</Label>
                        <p className="text-sm text-muted-foreground">Gửi thông báo trước sự kiện</p>
                      </div>
                      <Switch
                        checked={eventForm.reminder}
                        onCheckedChange={(checked) => setEventForm({ ...eventForm, reminder: checked })}
                      />
                    </div>

                    {eventForm.reminder && (
                      <div className="space-y-2">
                        <Label htmlFor="reminderTime">Thời gian nhắc nhở</Label>
                        <Select
                          value={eventForm.reminderTime}
                          onValueChange={(value) => setEventForm({ ...eventForm, reminderTime: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 phút trước</SelectItem>
                            <SelectItem value="15">15 phút trước</SelectItem>
                            <SelectItem value="30">30 phút trước</SelectItem>
                            <SelectItem value="60">1 giờ trước</SelectItem>
                            <SelectItem value="1440">1 ngày trước</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="Nhập tags, cách nhau bằng dấu phẩy..."
                        value={eventForm.tags.join(", ")}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            tags: e.target.value
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                    <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                      Hủy
                    </Button>
                    <Button
                      onClick={handleCreateEvent}
                      disabled={eventForm.type === "personal" && !canCreatePersonalNote}
                    >
                      {editingEvent ? "Cập nhật" : "Tạo sự kiện"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex items-center gap-2 md:gap-4">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle className="text-lg md:text-xl">Tháng 1, 2025</CardTitle>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-1 md:gap-2">
                  <Button
                    variant={viewMode === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("month")}
                  >
                    {isMobile ? "T" : "Tháng"}
                  </Button>
                  <Button
                    variant={viewMode === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("week")}
                  >
                    {isMobile ? "T" : "Tuần"}
                  </Button>
                  <Button
                    variant={viewMode === "day" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("day")}
                  >
                    {isMobile ? "N" : "Ngày"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 md:p-4">
              {viewMode === "month" && (
                <>
                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {(isMobile ? weekDays : weekDays).map((day) => (
                      <div
                        key={day}
                        className="p-1 md:p-2 text-center text-xs md:text-sm font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map((date) => {
                      const events = getEventsForDate(date)
                      const isSelected = date === selectedDate
                      const isToday = date === 3

                      return (
                        <motion.div
                          key={date}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            p-1 md:p-2 min-h-[60px] md:min-h-[100px] border rounded-lg cursor-pointer transition-all
                            ${
                              isSelected
                                ? "bg-primary text-primary-foreground border-primary"
                                : "hover:bg-muted border-border"
                            }
                            ${isToday && !isSelected ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" : ""}
                          `}
                          onClick={() => setSelectedDate(date)}
                        >
                          <div
                            className={`text-xs md:text-sm font-medium mb-1 flex items-center justify-between ${isToday && !isSelected ? "text-blue-600 dark:text-blue-400" : ""}`}
                          >
                            <span>{date}</span>
                            {events.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-xs h-3 w-3 md:h-4 md:w-4 p-0 flex items-center justify-center"
                              >
                                {events.length}
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1">
                            {events.slice(0, isMobile ? 1 : 2).map((event) => {
                              const typeInfo = getEventTypeInfo(event.type)
                              return (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded truncate flex items-center gap-1 ${
                                    isSelected
                                      ? "bg-primary-foreground/20 text-primary-foreground"
                                      : `bg-${typeInfo.color}-100 text-${typeInfo.color}-800 dark:bg-${typeInfo.color}-900 dark:text-${typeInfo.color}-300`
                                  }`}
                                >
                                  {event.priority === "high" && <Star className="h-2 w-2" />}
                                  <span className="truncate">{event.title}</span>
                                </div>
                              )
                            })}
                            {events.length > (isMobile ? 1 : 2) && (
                              <div className="text-xs text-muted-foreground">
                                +{events.length - (isMobile ? 1 : 2)} khác
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </>
              )}

              {viewMode === "week" && (
                <div className="space-y-4">
                  <div className="text-center font-medium">Tuần 1 - Tháng 1, 2025</div>
                  <div className="grid grid-cols-7 gap-2">
                    {weekDaysFull.slice(0, 7).map((day, index) => (
                      <div key={day} className="text-center">
                        <div className="text-sm font-medium mb-2">{isMobile ? weekDays[index] : day}</div>
                        <div className="space-y-1">
                          {getEventsForDate(index + 1).map((event) => {
                            const typeInfo = getEventTypeInfo(event.type)
                            return (
                              <div
                                key={event.id}
                                className={`text-xs p-2 rounded bg-${typeInfo.color}-100 text-${typeInfo.color}-800 dark:bg-${typeInfo.color}-900 dark:text-${typeInfo.color}-300`}
                              >
                                {event.title}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === "day" && (
                <div className="space-y-4">
                  <div className="text-center font-medium">Ngày {selectedDate} tháng 1, 2025</div>
                  <div className="space-y-2">
                    {selectedDateEvents.length > 0 ? (
                      selectedDateEvents.map((event) => {
                        const typeInfo = getEventTypeInfo(event.type)
                        const statusInfo = getStatusInfo(event.status)
                        return (
                          <div key={event.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-medium flex items-center gap-2">
                                  {event.title}
                                  {event.priority === "high" && <Star className="h-4 w-4 text-yellow-500" />}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`bg-${typeInfo.color}-100 text-${typeInfo.color}-800`}>
                                    {typeInfo.label}
                                  </Badge>
                                  <Badge variant="outline" className={`text-${statusInfo.color}-600`}>
                                    {statusInfo.label}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Không có sự kiện nào trong ngày này</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Details Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 md:space-y-6"
        >
          {/* Selected Date Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarIcon className="h-5 w-5" />
                Ngày {selectedDate} tháng 1
              </CardTitle>
              <CardDescription>{selectedDateEvents.length} sự kiện trong ngày</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDateEvents.length > 0 ? (
                <ScrollArea className="h-[300px] md:h-[400px]">
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => {
                      const typeInfo = getEventTypeInfo(event.type)
                      const priorityInfo = getPriorityInfo(event.priority)
                      const statusInfo = getStatusInfo(event.status)
                      const Icon = typeInfo.icon

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 md:p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                <h4 className="font-medium truncate">{event.title}</h4>
                                {event.priority === "high" && (
                                  <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                <Badge
                                  variant="secondary"
                                  className={`text-xs bg-${typeInfo.color}-100 text-${typeInfo.color}-800 dark:bg-${typeInfo.color}-900 dark:text-${typeInfo.color}-300`}
                                >
                                  {typeInfo.label}
                                </Badge>
                                <Badge variant="outline" className={`text-xs text-${priorityInfo.color}-600`}>
                                  {priorityInfo.label}
                                </Badge>
                                <Badge variant="outline" className={`text-xs text-${statusInfo.color}-600`}>
                                  {statusInfo.label}
                                </Badge>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Sao chép
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="mr-2 h-4 w-4" />
                                  Chia sẻ
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)} className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{event.time}</span>
                            </div>

                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}

                            {event.attendees.length > 0 && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{event.attendees.length} người tham gia</span>
                              </div>
                            )}

                            {event.tags.length > 0 && (
                              <div className="flex items-start gap-2">
                                <Tag className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                <div className="flex flex-wrap gap-1">
                                  {event.tags.slice(0, 3).map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {event.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{event.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                            {event.description && (
                              <div className="mt-2 p-2 bg-muted rounded text-sm">
                                <p className="line-clamp-3">{event.description}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-6 md:py-8 text-muted-foreground">
                  <CalendarIcon className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm md:text-base">Không có sự kiện nào trong ngày này</p>
                  {canCreateEvent() && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                      onClick={() => {
                        setEventForm({
                          ...eventForm,
                          date: `2025-01-${selectedDate.toString().padStart(2, "0")}`,
                        })
                        setShowEventDialog(true)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm sự kiện
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Thống kê tháng này</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eventTypes.map((type) => {
                const count = allFilteredEvents.filter((event) => event.type === type.value).length
                const Icon = type.icon
                return (
                  <div key={type.value} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <div className={`w-3 h-3 rounded-full bg-${type.color}-500`}></div>
                      <span className="text-sm">{type.label}</span>
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                )
              })}

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tổng sự kiện</span>
                <span className="font-bold text-lg">{allFilteredEvents.length}</span>
              </div>

              {user.role === "staff" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ghi chú cá nhân</span>
                  <span className="font-medium">
                    {personalNotesCount}/5
                    {!canCreatePersonalNote && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        Đầy
                      </Badge>
                    )}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Xem lịch tuần này
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Bell className="mr-2 h-4 w-4" />
                Cài đặt nhắc nhở
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Xuất lịch PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Settings className="mr-2 h-4 w-4" />
                Cài đặt lịch
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
