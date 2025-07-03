"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  SettingsIcon,
  Shield,
  Bell,
  Users,
  Clock,
  Mail,
  Smartphone,
  Globe,
  Lock,
  Save,
  Database,
  Palette,
  Zap,
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const [settings, setSettings] = useState({
    // System Settings
    systemName: "Hệ thống chấm công VSM",
    companyName: "Tổ chức VSM",
    companyLogo: "",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    currency: "VND",

    // Database Settings
    backupFrequency: "daily",
    maxStorageSize: "10GB",
    dataRetention: "365",

    // Attendance Settings
    workStartTime: "08:00",
    workEndTime: "17:00",
    lunchBreakStart: "12:00",
    lunchBreakEnd: "13:00",
    lateThreshold: "15",
    earlyLeaveThreshold: "15",
    overtimeThreshold: "30",
    autoCheckout: true,
    requireLocation: true,
    allowedRadius: "100",
    workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true,
    realTimeAlerts: true,

    // Email Configuration
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    emailFrom: "noreply@vsm.org.vn",

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: "60",
    passwordExpiry: "90",
    minPasswordLength: "8",
    requireSpecialChars: true,
    maxLoginAttempts: "5",
    lockoutDuration: "30",
    ipWhitelist: "",

    // API Settings
    apiKey: "vsm_api_key_2024_secure_token_12345",
    apiRateLimit: "1000",
    webhookUrl: "",

    // Feature Toggles
    enableChat: true,
    enableReports: true,
    enableCalendar: true,
    enableLeaveRequests: true,
    enableTimeTracking: true,
    enableGeofencing: true,
    enableFaceRecognition: false,
    enableQRCode: true,

    // Theme Settings
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    darkMode: false,
    compactMode: false,

    // Performance Settings
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: false,

    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "Hệ thống đang bảo trì, vui lòng quay lại sau.",
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho quản trị viên</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Cài đặt đã được lưu!",
      description: "Các thay đổi sẽ có hiệu lực ngay lập tức.",
    })

    setIsLoading(false)
  }

  const handleReset = () => {
    toast({
      title: "Đặt lại cài đặt",
      description: "Tất cả cài đặt đã được khôi phục về mặc định.",
      variant: "destructive",
    })
  }

  const handleBackup = () => {
    toast({
      title: "Sao lưu thành công",
      description: "Dữ liệu đã được sao lưu vào cloud storage.",
    })
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const systemHealth = {
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 92,
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Cấu hình hệ thống</h1>
          <p className="text-muted-foreground">Quản lý cài đặt và tính năng hệ thống</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Đặt lại
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isLoading ? "Đang lưu..." : "Lưu cài đặt"}
          </Button>
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Trạng thái hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU</span>
                  <span>{systemHealth.cpu}%</span>
                </div>
                <Progress value={systemHealth.cpu} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory</span>
                  <span>{systemHealth.memory}%</span>
                </div>
                <Progress value={systemHealth.memory} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span>{systemHealth.storage}%</span>
                </div>
                <Progress value={systemHealth.storage} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Network</span>
                  <span>{systemHealth.network}%</span>
                </div>
                <Progress value={systemHealth.network} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="general" className="text-xs md:text-sm">
              Chung
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs md:text-sm">
              Chấm công
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs md:text-sm">
              Thông báo
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs md:text-sm">
              Bảo mật
            </TabsTrigger>
            <TabsTrigger value="features" className="text-xs md:text-sm">
              Tính năng
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs md:text-sm">
              Nâng cao
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    Thông tin cơ bản
                  </CardTitle>
                  <CardDescription>Cấu hình thông tin hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">Tên hệ thống</Label>
                    <Input
                      id="systemName"
                      value={settings.systemName}
                      onChange={(e) => updateSetting("systemName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Tên công ty</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => updateSetting("companyName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Logo công ty</Label>
                    <div className="flex gap-2">
                      <Input
                        id="companyLogo"
                        placeholder="URL logo hoặc upload file"
                        value={settings.companyLogo}
                        onChange={(e) => updateSetting("companyLogo", e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Múi giờ</Label>
                      <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</SelectItem>
                          <SelectItem value="Asia/Bangkok">Bangkok (UTC+7)</SelectItem>
                          <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Ngôn ngữ</Label>
                      <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Định dạng ngày</Label>
                      <Select value={settings.dateFormat} onValueChange={(value) => updateSetting("dateFormat", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeFormat">Định dạng giờ</Label>
                      <Select value={settings.timeFormat} onValueChange={(value) => updateSetting("timeFormat", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24 giờ</SelectItem>
                          <SelectItem value="12h">12 giờ (AM/PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Cơ sở dữ liệu
                  </CardTitle>
                  <CardDescription>Quản lý dữ liệu và sao lưu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Tần suất sao lưu</Label>
                    <Select
                      value={settings.backupFrequency}
                      onValueChange={(value) => updateSetting("backupFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Mỗi giờ</SelectItem>
                        <SelectItem value="daily">Hàng ngày</SelectItem>
                        <SelectItem value="weekly">Hàng tuần</SelectItem>
                        <SelectItem value="monthly">Hàng tháng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStorageSize">Dung lượng tối đa</Label>
                    <Select
                      value={settings.maxStorageSize}
                      onValueChange={(value) => updateSetting("maxStorageSize", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5GB">5 GB</SelectItem>
                        <SelectItem value="10GB">10 GB</SelectItem>
                        <SelectItem value="50GB">50 GB</SelectItem>
                        <SelectItem value="100GB">100 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Thời gian lưu trữ (ngày)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => updateSetting("dataRetention", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleBackup} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Sao lưu ngay
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Khôi phục
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendance Settings */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Thời gian làm việc
                  </CardTitle>
                  <CardDescription>Cấu hình giờ làm việc và quy định</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workStartTime">Giờ bắt đầu</Label>
                      <Input
                        id="workStartTime"
                        type="time"
                        value={settings.workStartTime}
                        onChange={(e) => updateSetting("workStartTime", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workEndTime">Giờ kết thúc</Label>
                      <Input
                        id="workEndTime"
                        type="time"
                        value={settings.workEndTime}
                        onChange={(e) => updateSetting("workEndTime", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lunchBreakStart">Giờ nghỉ trưa bắt đầu</Label>
                      <Input
                        id="lunchBreakStart"
                        type="time"
                        value={settings.lunchBreakStart}
                        onChange={(e) => updateSetting("lunchBreakStart", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lunchBreakEnd">Giờ nghỉ trưa kết thúc</Label>
                      <Input
                        id="lunchBreakEnd"
                        type="time"
                        value={settings.lunchBreakEnd}
                        onChange={(e) => updateSetting("lunchBreakEnd", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lateThreshold">Ngưỡng đi trễ (phút)</Label>
                      <Input
                        id="lateThreshold"
                        type="number"
                        value={settings.lateThreshold}
                        onChange={(e) => updateSetting("lateThreshold", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="earlyLeaveThreshold">Ngưỡng về sớm (phút)</Label>
                      <Input
                        id="earlyLeaveThreshold"
                        type="number"
                        value={settings.earlyLeaveThreshold}
                        onChange={(e) => updateSetting("earlyLeaveThreshold", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="overtimeThreshold">Ngưỡng tăng ca (phút)</Label>
                      <Input
                        id="overtimeThreshold"
                        type="number"
                        value={settings.overtimeThreshold}
                        onChange={(e) => updateSetting("overtimeThreshold", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ngày làm việc</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "monday", label: "T2" },
                        { key: "tuesday", label: "T3" },
                        { key: "wednesday", label: "T4" },
                        { key: "thursday", label: "T5" },
                        { key: "friday", label: "T6" },
                        { key: "saturday", label: "T7" },
                        { key: "sunday", label: "CN" },
                      ].map((day) => (
                        <Badge
                          key={day.key}
                          variant={settings.workDays.includes(day.key) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const newWorkDays = settings.workDays.includes(day.key)
                              ? settings.workDays.filter((d) => d !== day.key)
                              : [...settings.workDays, day.key]
                            updateSetting("workDays", newWorkDays)
                          }}
                        >
                          {day.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Cài đặt vị trí
                  </CardTitle>
                  <CardDescription>Quản lý chấm công theo vị trí</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tự động checkout</Label>
                      <p className="text-sm text-muted-foreground">Tự động checkout khi hết giờ làm</p>
                    </div>
                    <Switch
                      checked={settings.autoCheckout}
                      onCheckedChange={(checked) => updateSetting("autoCheckout", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Yêu cầu vị trí</Label>
                      <p className="text-sm text-muted-foreground">Bắt buộc GPS khi chấm công</p>
                    </div>
                    <Switch
                      checked={settings.requireLocation}
                      onCheckedChange={(checked) => updateSetting("requireLocation", checked)}
                    />
                  </div>

                  {settings.requireLocation && (
                    <div className="space-y-2">
                      <Label htmlFor="allowedRadius">Bán kính cho phép (mét)</Label>
                      <Input
                        id="allowedRadius"
                        type="number"
                        value={settings.allowedRadius}
                        onChange={(e) => updateSetting("allowedRadius", e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Geofencing</Label>
                      <p className="text-sm text-muted-foreground">Tự động chấm công khi vào/ra khỏi khu vực</p>
                    </div>
                    <Switch
                      checked={settings.enableGeofencing}
                      onCheckedChange={(checked) => updateSetting("enableGeofencing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nhận diện khuôn mặt</Label>
                      <p className="text-sm text-muted-foreground">Sử dụng AI để xác thực danh tính</p>
                    </div>
                    <Switch
                      checked={settings.enableFaceRecognition}
                      onCheckedChange={(checked) => updateSetting("enableFaceRecognition", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>QR Code</Label>
                      <p className="text-sm text-muted-foreground">Chấm công bằng mã QR</p>
                    </div>
                    <Switch
                      checked={settings.enableQRCode}
                      onCheckedChange={(checked) => updateSetting("enableQRCode", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Thông báo người dùng
                  </CardTitle>
                  <CardDescription>Cấu hình thông báo gửi đến người dùng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <div className="space-y-0.5">
                        <Label>Email thông báo</Label>
                        <p className="text-sm text-muted-foreground">Gửi thông báo qua email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <div className="space-y-0.5">
                        <Label>SMS thông báo</Label>
                        <p className="text-sm text-muted-foreground">Gửi thông báo qua SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <div className="space-y-0.5">
                        <Label>Push notification</Label>
                        <p className="text-sm text-muted-foreground">Thông báo trên trình duyệt</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo thời gian thực</Label>
                      <p className="text-sm text-muted-foreground">Cảnh báo ngay lập tức</p>
                    </div>
                    <Switch
                      checked={settings.realTimeAlerts}
                      onCheckedChange={(checked) => updateSetting("realTimeAlerts", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Báo cáo hàng tuần</Label>
                      <p className="text-sm text-muted-foreground">Gửi báo cáo tự động hàng tuần</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => updateSetting("weeklyReports", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Báo cáo hàng tháng</Label>
                      <p className="text-sm text-muted-foreground">Gửi báo cáo tự động hàng tháng</p>
                    </div>
                    <Switch
                      checked={settings.monthlyReports}
                      onCheckedChange={(checked) => updateSetting("monthlyReports", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Cấu hình Email
                  </CardTitle>
                  <CardDescription>Thiết lập máy chủ email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpServer">SMTP Server</Label>
                      <Input
                        id="smtpServer"
                        value={settings.smtpServer}
                        onChange={(e) => updateSetting("smtpServer", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={settings.smtpPort}
                        onChange={(e) => updateSetting("smtpPort", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Username</Label>
                    <Input
                      id="smtpUsername"
                      value={settings.smtpUsername}
                      onChange={(e) => updateSetting("smtpUsername", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => updateSetting("smtpPassword", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailFrom">Email gửi</Label>
                    <Input
                      id="emailFrom"
                      type="email"
                      value={settings.emailFrom}
                      onChange={(e) => updateSetting("emailFrom", e.target.value)}
                    />
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Test kết nối
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Bảo mật đăng nhập
                  </CardTitle>
                  <CardDescription>Cấu hình bảo mật xác thực</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <div className="space-y-0.5">
                        <Label>Xác thực 2 bước</Label>
                        <p className="text-sm text-muted-foreground">Tăng cường bảo mật đăng nhập</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Thời gian hết phiên (phút)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Hết hạn mật khẩu (ngày)</Label>
                      <Input
                        id="passwordExpiry"
                        type="number"
                        value={settings.passwordExpiry}
                        onChange={(e) => updateSetting("passwordExpiry", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPasswordLength">Độ dài mật khẩu tối thiểu</Label>
                      <Input
                        id="minPasswordLength"
                        type="number"
                        value={settings.minPasswordLength}
                        onChange={(e) => updateSetting("minPasswordLength", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts">Số lần đăng nhập tối đa</Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) => updateSetting("maxLoginAttempts", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Yêu cầu ký tự đặc biệt</Label>
                      <p className="text-sm text-muted-foreground">Mật khẩu phải có ký tự đặc biệt</p>
                    </div>
                    <Switch
                      checked={settings.requireSpecialChars}
                      onCheckedChange={(checked) => updateSetting("requireSpecialChars", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lockoutDuration">Thời gian khóa tài khoản (phút)</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      value={settings.lockoutDuration}
                      onChange={(e) => updateSetting("lockoutDuration", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Bảo mật mạng
                  </CardTitle>
                  <CardDescription>Cấu hình truy cập và API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                    <Textarea
                      id="ipWhitelist"
                      placeholder="192.168.1.1&#10;10.0.0.1&#10;..."
                      value={settings.ipWhitelist}
                      onChange={(e) => updateSetting("ipWhitelist", e.target.value)}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">Mỗi IP một dòng</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={settings.apiKey}
                        onChange={(e) => updateSetting("apiKey", e.target.value)}
                      />
                      <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => updateSetting("apiRateLimit", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      placeholder="https://your-webhook-url.com"
                      value={settings.webhookUrl}
                      onChange={(e) => updateSetting("webhookUrl", e.target.value)}
                    />
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Tạo API Key mới
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feature Management */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Quản lý tính năng
                </CardTitle>
                <CardDescription>Bật/tắt các tính năng theo vai trò</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-4">
                    <h4 className="font-medium">Tính năng cơ bản</h4>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Chat nội bộ</Label>
                        <p className="text-sm text-muted-foreground">Cho phép nhân viên chat với nhau</p>
                      </div>
                      <Switch
                        checked={settings.enableChat}
                        onCheckedChange={(checked) => updateSetting("enableChat", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Lịch làm việc</Label>
                        <p className="text-sm text-muted-foreground">Quản lý lịch và sự kiện</p>
                      </div>
                      <Switch
                        checked={settings.enableCalendar}
                        onCheckedChange={(checked) => updateSetting("enableCalendar", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Xin nghỉ phép</Label>
                        <p className="text-sm text-muted-foreground">Cho phép nhân viên xin nghỉ phép</p>
                      </div>
                      <Switch
                        checked={settings.enableLeaveRequests}
                        onCheckedChange={(checked) => updateSetting("enableLeaveRequests", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Tính năng nâng cao</h4>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Báo cáo</Label>
                        <p className="text-sm text-muted-foreground">Tính năng tạo và xem báo cáo</p>
                      </div>
                      <Switch
                        checked={settings.enableReports}
                        onCheckedChange={(checked) => updateSetting("enableReports", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Theo dõi thời gian</Label>
                        <p className="text-sm text-muted-foreground">Tracking thời gian làm việc chi tiết</p>
                      </div>
                      <Switch
                        checked={settings.enableTimeTracking}
                        onCheckedChange={(checked) => updateSetting("enableTimeTracking", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Geofencing</Label>
                        <p className="text-sm text-muted-foreground">Chấm công theo vị trí địa lý</p>
                      </div>
                      <Switch
                        checked={settings.enableGeofencing}
                        onCheckedChange={(checked) => updateSetting("enableGeofencing", checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Tính năng AI</h4>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Nhận diện khuôn mặt</Label>
                        <p className="text-sm text-muted-foreground">AI xác thực danh tính</p>
                      </div>
                      <Switch
                        checked={settings.enableFaceRecognition}
                        onCheckedChange={(checked) => updateSetting("enableFaceRecognition", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>QR Code</Label>
                        <p className="text-sm text-muted-foreground">Chấm công bằng mã QR</p>
                      </div>
                      <Switch
                        checked={settings.enableQRCode}
                        onCheckedChange={(checked) => updateSetting("enableQRCode", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Giao diện
                  </CardTitle>
                  <CardDescription>Tùy chỉnh giao diện hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Màu chính</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => updateSetting("primaryColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => updateSetting("primaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Màu phụ</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => updateSetting("secondaryColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => updateSetting("secondaryColor", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chế độ tối</Label>
                      <p className="text-sm text-muted-foreground">Giao diện tối mặc định</p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chế độ compact</Label>
                      <p className="text-sm text-muted-foreground">Giao diện thu gọn</p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => updateSetting("compactMode", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Hiệu suất
                  </CardTitle>
                  <CardDescription>Tối ưu hóa hiệu suất hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bật cache</Label>
                      <p className="text-sm text-muted-foreground">Tăng tốc độ tải trang</p>
                    </div>
                    <Switch
                      checked={settings.cacheEnabled}
                      onCheckedChange={(checked) => updateSetting("cacheEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Nén dữ liệu</Label>
                      <p className="text-sm text-muted-foreground">Giảm băng thông</p>
                    </div>
                    <Switch
                      checked={settings.compressionEnabled}
                      onCheckedChange={(checked) => updateSetting("compressionEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>CDN</Label>
                      <p className="text-sm text-muted-foreground">Content Delivery Network</p>
                    </div>
                    <Switch
                      checked={settings.cdnEnabled}
                      onCheckedChange={(checked) => updateSetting("cdnEnabled", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chế độ bảo trì</Label>
                      <p className="text-sm text-muted-foreground">Tạm khóa hệ thống</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                    />
                  </div>

                  {settings.maintenanceMode && (
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceMessage">Thông báo bảo trì</Label>
                      <Textarea
                        id="maintenanceMessage"
                        value={settings.maintenanceMessage}
                        onChange={(e) => updateSetting("maintenanceMessage", e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Vùng nguy hiểm
                </CardTitle>
                <CardDescription>Các thao tác không thể hoàn tác</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Các thao tác dưới đây sẽ ảnh hưởng nghiêm trọng đến hệ thống và không thể hoàn tác.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa tất cả dữ liệu
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset hệ thống
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
