"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Clock, CheckCircle, XCircle, Calendar, Navigation, Wifi, Battery, AlertTriangle, Settings, Shield } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock company location settings
const COMPANY_LOCATIONS = [
  {
    id: "main_office",
    name: "Văn phòng chính VSM",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    lat: 10.7769,
    lng: 106.7009,
    radius: 100, // meters
    wifiSSIDs: ["VSM-Office", "VSM-Guest"],
    isActive: true
  },
  {
    id: "branch_office",
    name: "Chi nhánh Hà Nội",
    address: "456 Đường XYZ, Ba Đình, Hà Nội",
    lat: 21.0285,
    lng: 105.8542,
    radius: 150,
    wifiSSIDs: ["VSM-HN", "VSM-HN-Guest"],
    isActive: true
  }
]

// Mock admin settings
const ADMIN_SETTINGS = {
  requireLocationCheck: true,
  requireWifiCheck: false,
  allowRemoteCheckin: false,
  strictMode: true
}

export default function CheckInPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyWifi, setNearbyWifi] = useState<string[]>([])
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isInOfficeRange, setIsInOfficeRange] = useState(false)
  const [nearestOffice, setNearestOffice] = useState<any>(null)
  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("vi-VN"))
      setCurrentDate(
        now.toLocaleDateString("vi-VN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(userPos)
          checkLocationValidity(userPos)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError("Không thể lấy vị trí. Vui lòng cho phép truy cập vị trí.")
          if (ADMIN_SETTINGS.strictMode) {
            toast({
              title: "Lỗi vị trí",
              description: "Không thể chấm công khi không xác định được vị trí",
              variant: "destructive",
            })
          }
        },
      )
    }

    // Mock WiFi detection (in real app, this would use a native API)
    detectNearbyWifi()
  }, [])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180
    const φ2 = lat2 * Math.PI/180
    const Δφ = (lat2-lat1) * Math.PI/180
    const Δλ = (lon2-lon1) * Math.PI/180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c // Distance in meters
  }

  const checkLocationValidity = (userPos: { lat: number; lng: number }) => {
    let minDistance = Infinity
    let closestOffice = null

    COMPANY_LOCATIONS.forEach(office => {
      if (office.isActive) {
        const dist = calculateDistance(userPos.lat, userPos.lng, office.lat, office.lng)
        if (dist < minDistance) {
          minDistance = dist
          closestOffice = office
        }
      }
    })

    setDistance(Math.round(minDistance))
    setNearestOffice(closestOffice)
    
    if (closestOffice && minDistance <= closestOffice.radius) {
      setIsInOfficeRange(true)
    } else {
      setIsInOfficeRange(false)
    }
  }

  const detectNearbyWifi = () => {
    // Mock WiFi detection - in real app this would use native APIs
    // For demo purposes, randomly detect company WiFi
    const mockWifiNetworks = ["VSM-Office", "VSM-Guest", "Other-Network", "Home-WiFi"]
    const detectedNetworks = mockWifiNetworks.filter(() => Math.random() > 0.7)
    setNearbyWifi(detectedNetworks)
  }

  const isWifiValid = () => {
    if (!ADMIN_SETTINGS.requireWifiCheck) return true
    
    const companyWifis = COMPANY_LOCATIONS.flatMap(office => office.wifiSSIDs)
    return nearbyWifi.some(wifi => companyWifis.includes(wifi))
  }

  const canCheckIn = () => {
    if (!ADMIN_SETTINGS.requireLocationCheck && !ADMIN_SETTINGS.requireWifiCheck) {
      return true // No restrictions
    }

    if (ADMIN_SETTINGS.allowRemoteCheckin) {
      return true // Remote work allowed
    }

    const locationValid = !ADMIN_SETTINGS.requireLocationCheck || isInOfficeRange
    const wifiValid = !ADMIN_SETTINGS.requireWifiCheck || isWifiValid()

    return locationValid && wifiValid
  }

  const getCheckInBlockReason = () => {
    if (!ADMIN_SETTINGS.requireLocationCheck && !ADMIN_SETTINGS.requireWifiCheck) {
      return null
    }

    if (ADMIN_SETTINGS.allowRemoteCheckin) {
      return null
    }

    const reasons = []
    
    if (ADMIN_SETTINGS.requireLocationCheck && !isInOfficeRange) {
      reasons.push(`Bạn đang ở cách văn phòng ${distance}m (cho phép: ${nearestOffice?.radius || 100}m)`)
    }
    
    if (ADMIN_SETTINGS.requireWifiCheck && !isWifiValid()) {
      reasons.push("Không kết nối WiFi công ty")
    }

    return reasons.length > 0 ? reasons : null
  }

  const handleCheckIn = async () => {
    if (!canCheckIn()) {
      const reasons = getCheckInBlockReason()
      toast({
        title: "Không thể chấm công",
        description: reasons?.join(", ") || "Không đáp ứng điều kiện chấm công",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const now = new Date().toLocaleTimeString("vi-VN")
    setCheckInTime(now)
    setIsCheckedIn(true)
    setIsLoading(false)

    toast({
      title: "Check-in thành công!",
      description: `Đã ghi nhận thời gian vào làm lúc ${now}`,
    })
  }

  const handleCheckOut = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const now = new Date().toLocaleTimeString("vi-VN")
    setCheckOutTime(now)
    setIsLoading(false)

    toast({
      title: "Check-out thành công!",
      description: `Đã ghi nhận thời gian tan làm lúc ${now}`,
    })
  }

  if (!user || user.role !== "staff") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho nhân viên</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const blockReasons = getCheckInBlockReason()

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-bold mb-2">Chấm công thông minh</h1>
        <p className="text-muted-foreground">Ghi nhận thời gian làm việc với xác thực vị trí</p>
      </motion.div>

      {/* Current Time Display */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="text-center p-8">
            <div className="text-6xl font-bold mb-2">{currentTime}</div>
            <div className="text-xl opacity-90">{currentDate}</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Location & Security Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Trạng thái bảo mật chấm công
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Location Status */}
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <MapPin className={`h-5 w-5 ${isInOfficeRange ? 'text-green-600' : 'text-red-600'}`} />
                <div>
                  <p className="font-medium">Vị trí</p>
                  <p className="text-sm text-muted-foreground">
                    {nearestOffice ? nearestOffice.name : "Không xác định"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={isInOfficeRange ? "default" : "destructive"}>
                  {isInOfficeRange ? "Trong phạm vi" : `Cách ${distance}m`}
                </Badge>
                {distance && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Cho phép: {nearestOffice?.radius || 100}m
                  </p>
                )}
              </div>
            </div>

            {/* WiFi Status */}
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Wifi className={`h-5 w-5 ${isWifiValid() ? 'text-green-600' : 'text-orange-600'}`} />
                <div>
                  <p className="font-medium">WiFi</p>
                  <p className="text-sm text-muted-foreground">
                    {nearbyWifi.length > 0 ? `${nearbyWifi.length} mạng phát hiện` : "Không phát hiện"}
                  </p>
                </div>
              </div>
              <Badge variant={isWifiValid() ? "default" : "secondary"}>
                {isWifiValid() ? "Hợp lệ" : "Không yêu cầu"}
              </Badge>
            </div>

            {/* Admin Settings Display */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Cài đặt chấm công:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ADMIN_SETTINGS.requireLocationCheck ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span>Kiểm tra vị trí</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ADMIN_SETTINGS.requireWifiCheck ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span>Kiểm tra WiFi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ADMIN_SETTINGS.allowRemoteCheckin ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span>Làm việc từ xa</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${ADMIN_SETTINGS.strictMode ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                  <span>Chế độ nghiêm ngặt</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Warning if can't check in */}
      {blockReasons && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Không thể chấm công:</strong>
              <ul className="mt-2 list-disc list-inside">
                {blockReasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Check-in/out Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Thao tác chấm công
              </CardTitle>
              <CardDescription>Nhấn để ghi nhận thời gian làm việc</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isCheckedIn ? (
                <Button
                  onClick={handleCheckIn}
                  disabled={isLoading || !canCheckIn()}
                  size="lg"
                  className="w-full h-16 text-lg"
                >
                  {isLoading ? (
                    "Đang xử lý..."
                  ) : (
                    <>
                      <CheckCircle className="h-6 w-6 mr-2" />
                      Check-in
                    </>
                  )}
                </Button>
              ) : !checkOutTime ? (
                <Button
                  onClick={handleCheckOut}
                  disabled={isLoading}
                  variant="destructive"
                  size="lg"
                  className="w-full h-16 text-lg"
                >
                  {isLoading ? (
                    "Đang xử lý..."
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 mr-2" />
                      Check-out
                    </>
                  )}
                </Button>
              ) : (
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-800 dark:text-green-400">Đã hoàn thành ca làm việc hôm nay</p>
                </div>
              )}

              {/* Status Display */}
              <div className="space-y-3">
                {checkInTime && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Giờ vào:</span>
                    <Badge variant="default">{checkInTime}</Badge>
                  </div>
                )}

                {checkOutTime && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Giờ ra:</span>
                    <Badge variant="destructive">{checkOutTime}</Badge>
                  </div>
                )}

                {checkInTime && checkOutTime && (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm font-medium">Tổng thời gian:</span>
                    <Badge variant="outline" className="text-green-600">
                      8 giờ 30 phút
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Location Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Chi tiết vị trí
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userLocation ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">Đã xác định vị trí</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Vị trí hiện tại:</strong></p>
                    <p>Lat: {userLocation.lat.toFixed(6)}</p>
                    <p>Lng: {userLocation.lng.toFixed(6)}</p>
                    {nearestOffice && (
                      <>
                        <p className="mt-2"><strong>Văn phòng gần nhất:</strong></p>
                        <p>📍 {nearestOffice.name}</p>
                        <p className="text-xs">{nearestOffice.address}</p>
                        <p className="text-xs">Khoảng cách: {distance}m</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <MapPin className="h-4 w-4" />
                  <span>{locationError || "Đang xác định vị trí..."}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái hệ thống</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Kết nối mạng</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  Tốt
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">GPS</span>
                </div>
                <Badge variant="outline" className="text-blue-600">
                  {userLocation ? "Hoạt động" : "Đang kết nối"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Đồng bộ thời gian</span>
                </div>
                <Badge variant="outline" className="text-purple-600">
                  Chính xác
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Bảo mật</span>
                </div>
                <Badge variant="outline" className="text-orange-600">
                  {canCheckIn() ? "Đạt yêu cầu" : "Không đạt"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Today's Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tóm tắt hôm nay
            </CardTitle>
            <CardDescription>Thông tin chấm công trong ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{checkInTime || "--:--"}</div>
                <div className="text-sm text-muted-foreground">Giờ vào</div>
              </div>

              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{checkOutTime || "--:--"}</div>
                <div className="text-sm text-muted-foreground">Giờ ra</div>
              </div>

              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {checkInTime && checkOutTime ? "8.5h" : checkInTime ? "..." : "0h"}
                </div>
                <div className="text-sm text-muted-foreground">Tổng giờ</div>
              </div>

              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {isCheckedIn ? (checkOutTime ? "Hoàn thành" : "Đang làm") : "Chưa vào"}
                </div>
                <div className="text-sm text-muted-foreground">Trạng thái</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}