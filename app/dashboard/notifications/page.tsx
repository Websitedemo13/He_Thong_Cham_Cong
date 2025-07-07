"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Bell, BellRing, Check, X, Clock, AlertTriangle, Info, CheckCircle, Settings, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const mockNotifications = [
  {
    id: "1",
    type: "leave_request",
    title: "Đơn nghỉ phép mới",
    message: "Trần Thị Staff đã gửi đơn xin nghỉ phép từ 10/01 - 12/01",
    timestamp: "2025-01-03T10:30:00",
    isRead: false,
    priority: "high",
    sender: {
      name: "Trần Thị Staff",
      avatar: "/placeholder.svg",
    },
    actions: ["approve", "reject"]
  },
  {
    id: "2",
    type: "attendance_alert",
    title: "Cảnh báo chấm công",
    message: "5 nhân viên chưa check-in sau 9:00 AM",
    timestamp: "2025-01-03T09:15:00",
    isRead: false,
    priority: "medium",
    actions: ["view_details"]
  },
  {
    id: "3",
    type: "system_update",
    title: "Cập nhật hệ thống",
    message: "Hệ thống sẽ bảo trì từ 23:00 - 01:00 đêm nay",
    timestamp: "2025-01-03T08:00:00",
    isRead: true,
    priority: "low",
  },
  {
    id: "4",
    type: "birthday",
    title: "Sinh nhật nhân viên",
    message: "Hôm nay là sinh nhật của Nguyễn Văn A và 2 người khác",
    timestamp: "2025-01-03T07:00:00",
    isRead: false,
    priority: "low",
  },
  {
    id: "5",
    type: "overtime_approval",
    title: "Phê duyệt tăng ca",
    message: "Đơn xin tăng ca của bạn đã được phê duyệt",
    timestamp: "2025-01-02T16:30:00",
    isRead: true,
    priority: "medium",
  }
]

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState("all")
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leaveRequests: true,
    attendanceAlerts: true,
    systemUpdates: false,
    birthdays: true,
  })

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "leave_request":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "attendance_alert":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "system_update":
        return <Settings className="h-4 w-4 text-gray-600" />
      case "birthday":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "overtime_approval":
        return <Check className="h-4 w-4 text-purple-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/10"
      case "medium":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10"
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/10"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/10"
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.isRead
    if (filter === "high") return notif.priority === "high"
    return true
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

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
            <Bell className="h-8 w-8 text-primary" />
            Thông báo
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Quản lý thông báo và cài đặt</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} className="bg-transparent">
            <Check className="h-4 w-4 mr-2" />
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className={filter !== "all" ? "bg-transparent" : ""}
                  >
                    Tất cả ({notifications.length})
                  </Button>
                  <Button
                    variant={filter === "unread" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("unread")}
                    className={filter !== "unread" ? "bg-transparent" : ""}
                  >
                    Chưa đọc ({unreadCount})
                  </Button>
                  <Button
                    variant={filter === "high" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("high")}
                    className={filter !== "high" ? "bg-transparent" : ""}
                  >
                    Ưu tiên cao
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications List */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="space-y-3">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'shadow-md' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className={`font-semibold ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>
                                {new Date(notification.timestamp).toLocaleString("vi-VN")}
                              </span>
                              {notification.sender && (
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarImage src={notification.sender.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {notification.sender.name.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{notification.sender.name}</span>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            {notification.actions && (
                              <div className="flex gap-2 pt-2">
                                {notification.actions.includes("approve") && (
                                  <Button size="sm" className="h-7 text-xs">
                                    Phê duyệt
                                  </Button>
                                )}
                                {notification.actions.includes("reject") && (
                                  <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                                    Từ chối
                                  </Button>
                                )}
                                {notification.actions.includes("view_details") && (
                                  <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                                    Xem chi tiết
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {!notification.isRead && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {filteredNotifications.length === 0 && (
                <Card>
                  <CardContent className="text-center p-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Không có thông báo</h3>
                    <p className="text-muted-foreground">
                      {filter === "unread" ? "Bạn đã đọc hết thông báo" : "Chưa có thông báo nào"}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>Tùy chỉnh loại thông báo bạn muốn nhận</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Phương thức nhận thông báo</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email</Label>
                      <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Nhận thông báo đẩy trên trình duyệt</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Loại thông báo</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="leave-requests">Đơn nghỉ phép</Label>
                      <p className="text-sm text-muted-foreground">Thông báo về đơn xin nghỉ phép</p>
                    </div>
                    <Switch
                      id="leave-requests"
                      checked={settings.leaveRequests}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, leaveRequests: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="attendance-alerts">Cảnh báo chấm công</Label>
                      <p className="text-sm text-muted-foreground">Cảnh báo về việc chấm công muộn hoặc thiếu</p>
                    </div>
                    <Switch
                      id="attendance-alerts"
                      checked={settings.attendanceAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, attendanceAlerts: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">Cập nhật hệ thống</Label>
                      <p className="text-sm text-muted-foreground">Thông báo về bảo trì và cập nhật</p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, systemUpdates: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="birthdays">Sinh nhật</Label>
                      <p className="text-sm text-muted-foreground">Thông báo sinh nhật đồng nghiệp</p>
                    </div>
                    <Switch
                      id="birthdays"
                      checked={settings.birthdays}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, birthdays: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>Lưu cài đặt</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}