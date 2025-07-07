"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter, Eye, Clock, Users, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockEvents = [
  {
    id: "1",
    title: "Họp team CNTT",
    date: "2025-01-15",
    time: "09:00",
    duration: "2h",
    type: "meeting",
    attendees: ["Quách Thành Long", "Lê Minh Tân"],
    location: "Phòng họp A",
    status: "confirmed"
  },
  {
    id: "2",
    title: "Đào tạo nhân viên mới",
    date: "2025-01-16",
    time: "14:00",
    duration: "3h",
    type: "training",
    attendees: ["Nguyễn Văn HR", "Trần Thị Staff"],
    location: "Phòng đào tạo",
    status: "confirmed"
  },
  {
    id: "3",
    title: "Review dự án Q1",
    date: "2025-01-20",
    time: "10:00",
    duration: "1h",
    type: "review",
    attendees: ["Quách Thành Long", "Nguyễn Văn HR"],
    location: "Online",
    status: "pending"
  },
  {
    id: "4",
    title: "Sinh nhật Trần Thị Staff",
    date: "2025-01-22",
    time: "12:00",
    duration: "1h",
    type: "birthday",
    attendees: ["All"],
    location: "Pantry",
    status: "confirmed"
  }
]

const attendanceEvents = [
  {
    id: "a1",
    employee: "Quách Thành Long",
    date: "2025-01-15",
    checkIn: "08:30",
    checkOut: "17:30",
    status: "present",
    workHours: 8.5
  },
  {
    id: "a2",
    employee: "Nguyễn Văn HR",
    date: "2025-01-15",
    checkIn: "08:45",
    checkOut: "17:15",
    status: "late",
    workHours: 8.0
  },
  {
    id: "a3",
    employee: "Trần Thị Staff",
    date: "2025-01-15",
    checkIn: null,
    checkOut: null,
    status: "leave",
    workHours: 0
  }
]

export default function CalendarPage() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState("month")
  const [selectedFilter, setSelectedFilter] = useState("all")

  if (!user) return null

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "training":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "birthday":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "late":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "leave":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "present":
        return "Có mặt"
      case "late":
        return "Đi trễ"
      case "absent":
        return "Vắng mặt"
      case "leave":
        return "Nghỉ phép"
      default:
        return status
    }
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDay = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay))
      currentDay.setDate(currentDay.getDate() + 1)
    }
    
    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return mockEvents.filter(event => event.date === dateString)
  }

  const getAttendanceForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return attendanceEvents.filter(event => event.date === dateString)
  }

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ]

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
            <Calendar className="h-8 w-8 text-primary" />
            Lịch làm việc
          </h1>
          <p className="text-muted-foreground">
            {user.role === "staff" ? "Lịch cá nhân và sự kiện" : "Lịch chung và quản lý sự kiện"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </Button>
          {user.role !== "staff" && (
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tạo sự kiện
            </Button>
          )}
        </div>
      </motion.div>

      {/* Calendar Navigation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)} className="bg-transparent">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="outline" size="sm" onClick={() => navigateMonth(1)} className="bg-transparent">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedView === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedView("month")}
                  className={selectedView !== "month" ? "bg-transparent" : ""}
                >
                  Tháng
                </Button>
                <Button
                  variant={selectedView === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedView("week")}
                  className={selectedView !== "week" ? "bg-transparent" : ""}
                >
                  Tuần
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                const isToday = day.toDateString() === new Date().toDateString()
                const events = getEventsForDate(day)
                const attendance = getAttendanceForDate(day)
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={`min-h-[100px] p-2 border rounded-lg ${
                      isCurrentMonth ? "bg-background" : "bg-muted/30"
                    } ${isToday ? "ring-2 ring-primary" : ""} hover:bg-muted/50 transition-colors`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                    } ${isToday ? "text-primary font-bold" : ""}`}>
                      {day.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {/* Events */}
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded ${getEventTypeColor(event.type)} truncate`}
                        >
                          {event.title}
                        </div>
                      ))}
                      
                      {/* Attendance for admin/hr */}
                      {(user.role === "admin" || user.role === "hr") && attendance.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {attendance.length} chấm công
                        </div>
                      )}
                      
                      {events.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{events.length - 2} khác
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Sự kiện sắp tới</CardTitle>
              <CardDescription>Các sự kiện trong tuần này</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockEvents.slice(0, 4).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)} variant="outline">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{event.date} • {event.time} ({event.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees.length} người tham gia</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Summary (for admin/hr) or Personal Schedule (for staff) */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>
                {user.role === "staff" ? "Lịch cá nhân hôm nay" : "Tóm tắt chấm công"}
              </CardTitle>
              <CardDescription>
                {user.role === "staff" 
                  ? "Công việc và lịch trình của bạn" 
                  : "Thống kê chấm công hôm nay"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.role === "staff" ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">Trạng thái hôm nay</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Check-in</p>
                        <p className="font-medium">08:30</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Check-out</p>
                        <p className="font-medium">--:--</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Lịch hôm nay</h4>
                    {mockEvents.filter(e => e.date === "2025-01-15").map((event) => (
                      <div key={event.id} className="flex items-center gap-3 p-2 border rounded">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.time} • {event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {attendanceEvents.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={record.employee} />
                        <AvatarFallback className="text-xs">
                          {record.employee.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{record.employee}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{record.checkIn || "--:--"} - {record.checkOut || "--:--"}</span>
                          <Badge className={getAttendanceStatusColor(record.status)} variant="outline">
                            {getStatusText(record.status)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium">{record.workHours}h</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}