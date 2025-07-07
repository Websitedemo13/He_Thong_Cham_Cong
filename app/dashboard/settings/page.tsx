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
import { Settings, MapPin, Wifi, Shield, Clock, Users, Save, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // Location Settings
    requireLocationCheck: true,
    allowedRadius: 100,
    officeLocations: [
      {
        id: "main",
        name: "Văn phòng chính VSM",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        lat: 10.7769,
        lng: 106.7009,
        radius: 100,
        isActive: true
      }
    ],
    
    // WiFi Settings
    requireWifiCheck: false,
    allowedWifiNetworks: ["VSM-Office", "VSM-Guest"],
    
    // Security Settings
    strictMode: true,
    allowRemoteCheckin: false,
    requirePhotoVerification: false,
    
    // Time Settings
    workingHours: {
      start: "08:00",
      end: "17:00",
      lateThreshold: 15, // minutes
    },
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Settings className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho quản trị viên</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSaveSettings = () => {
    toast({
      title: "Cài đặt đã được lưu",
      description: "Các thay đổi sẽ có hiệu lực ngay lập tức",
    })
  }

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateNestedSetting = (parent: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [key]: value
      }
    }))
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
            <Settings className="h-8 w-8 text-primary" />
            Cài đặt hệ thống
          </h1>
          <p className="text-muted-foreground">Cấu hình chấm công và bảo mật</p>
        </div>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Lưu cài đặt
        </Button>
      </motion.div>

      <Tabs defaultValue="location" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="location">Vị trí</TabsTrigger>
          <TabsTrigger value="wifi">WiFi</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="time">Thời gian</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>

        <TabsContent value="location" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Cài đặt vị trí chấm công
                </CardTitle>
                <CardDescription>
                  Cấu hình yêu cầu vị trí và phạm vi cho phép chấm công
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-location">Yêu cầu kiểm tra vị trí</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhân viên phải ở trong phạm vi văn phòng để chấm công
                    </p>
                  </div>
                  <Switch
                    id="require-location"
                    checked={settings.requireLocationCheck}
                    onCheckedChange={(checked) => updateSetting('requireLocationCheck', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Phạm vi cho phép (mét)</Label>
                  <Input
                    type="number"
                    value={settings.allowedRadius}
                    onChange={(e) => updateSetting('allowedRadius', parseInt(e.target.value))}
                    placeholder="100"
                  />
                  <p className="text-sm text-muted-foreground">
                    Khoảng cách tối đa từ văn phòng để có thể chấm công
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Địa điểm văn phòng</Label>
                  {settings.officeLocations.map((location, index) => (
                    <Card key={location.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{location.name}</h4>
                          <Switch
                            checked={location.isActive}
                            onCheckedChange={(checked) => {
                              const newLocations = [...settings.officeLocations]
                              newLocations[index].isActive = checked
                              updateSetting('officeLocations', newLocations)
                            }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label>Latitude</Label>
                            <Input
                              type="number"
                              step="0.000001"
                              value={location.lat}
                              onChange={(e) => {
                                const newLocations = [...settings.officeLocations]
                                newLocations[index].lat = parseFloat(e.target.value)
                                updateSetting('officeLocations', newLocations)
                              }}
                            />
                          </div>
                          <div>
                            <Label>Longitude</Label>
                            <Input
                              type="number"
                              step="0.000001"
                              value={location.lng}
                              onChange={(e) => {
                                const newLocations = [...settings.officeLocations]
                                newLocations[index].lng = parseFloat(e.target.value)
                                updateSetting('officeLocations', newLocations)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    <MapPin className="h-4 w-4 mr-2" />
                    Thêm địa điểm mới
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="wifi" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Cài đặt WiFi
                </CardTitle>
                <CardDescription>
                  Cấu hình yêu cầu kết nối WiFi công ty
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-wifi">Yêu cầu kết nối WiFi công ty</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhân viên phải kết nối WiFi công ty để chấm công
                    </p>
                  </div>
                  <Switch
                    id="require-wifi"
                    checked={settings.requireWifiCheck}
                    onCheckedChange={(checked) => updateSetting('requireWifiCheck', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Mạng WiFi được phép</Label>
                  {settings.allowedWifiNetworks.map((network, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={network}
                        onChange={(e) => {
                          const newNetworks = [...settings.allowedWifiNetworks]
                          newNetworks[index] = e.target.value
                          updateSetting('allowedWifiNetworks', newNetworks)
                        }}
                        placeholder="Tên mạng WiFi"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newNetworks = settings.allowedWifiNetworks.filter((_, i) => i !== index)
                          updateSetting('allowedWifiNetworks', newNetworks)
                        }}
                        className="bg-transparent"
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateSetting('allowedWifiNetworks', [...settings.allowedWifiNetworks, ''])
                    }}
                    className="w-full bg-transparent"
                  >
                    <Wifi className="h-4 w-4 mr-2" />
                    Thêm mạng WiFi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Cài đặt bảo mật
                </CardTitle>
                <CardDescription>
                  Cấu hình các tính năng bảo mật cho chấm công
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="strict-mode">Chế độ nghiêm ngặt</Label>
                    <p className="text-sm text-muted-foreground">
                      Áp dụng tất cả các quy tắc bảo mật một cách nghiêm ngặt
                    </p>
                  </div>
                  <Switch
                    id="strict-mode"
                    checked={settings.strictMode}
                    onCheckedChange={(checked) => updateSetting('strictMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-remote">Cho phép làm việc từ xa</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhân viên có thể chấm công từ bất kỳ đâu
                    </p>
                  </div>
                  <Switch
                    id="allow-remote"
                    checked={settings.allowRemoteCheckin}
                    onCheckedChange={(checked) => updateSetting('allowRemoteCheckin', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="photo-verification">Xác thực bằng ảnh</Label>
                    <p className="text-sm text-muted-foreground">
                      Yêu cầu chụp ảnh khi chấm công
                    </p>
                  </div>
                  <Switch
                    id="photo-verification"
                    checked={settings.requirePhotoVerification}
                    onCheckedChange={(checked) => updateSetting('requirePhotoVerification', checked)}
                  />
                </div>

                {settings.strictMode && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800 dark:text-orange-300">
                        Chế độ nghiêm ngặt đang bật
                      </span>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                      Tất cả các quy tắc bảo mật sẽ được áp dụng nghiêm ngặt. 
                      Nhân viên không thể chấm công nếu không đáp ứng đầy đủ các yêu cầu.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Cài đặt thời gian
                </CardTitle>
                <CardDescription>
                  Cấu hình giờ làm việc và quy tắc chấm công
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Giờ bắt đầu làm việc</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={settings.workingHours.start}
                      onChange={(e) => updateNestedSetting('workingHours', 'start', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">Giờ kết thúc làm việc</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={settings.workingHours.end}
                      onChange={(e) => updateNestedSetting('workingHours', 'end', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="late-threshold">Ngưỡng đi trễ (phút)</Label>
                  <Input
                    id="late-threshold"
                    type="number"
                    value={settings.workingHours.lateThreshold}
                    onChange={(e) => updateNestedSetting('workingHours', 'lateThreshold', parseInt(e.target.value))}
                    placeholder="15"
                  />
                  <p className="text-sm text-muted-foreground">
                    Số phút trễ tối đa trước khi được coi là đi trễ
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Cài đặt thông báo
                </CardTitle>
                <CardDescription>
                  Cấu hình thông báo cho admin và nhân viên
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Thông báo email</Label>
                    <p className="text-sm text-muted-foreground">
                      Gửi thông báo qua email cho các sự kiện quan trọng
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">Thông báo SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Gửi thông báo qua tin nhắn SMS
                    </p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Thông báo đẩy</Label>
                    <p className="text-sm text-muted-foreground">
                      Gửi thông báo đẩy trên trình duyệt
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}