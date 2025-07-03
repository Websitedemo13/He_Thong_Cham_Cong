"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Clock, CheckCircle, XCircle, Calendar, Navigation, Wifi, Battery } from "lucide-react"

export default function CheckInPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Không thể lấy vị trí",
            description: "Vui lòng cho phép truy cập vị trí để chấm công",
            variant: "destructive",
          })
        },
      )
    }
  }, [toast])

  const handleCheckIn = async () => {
    if (!location) {
      toast({
        title: "Lỗi vị trí",
        description: "Không thể xác định vị trí hiện tại",
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

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-bold mb-2">Chấm công</h1>
        <p className="text-muted-foreground">Ghi nhận thời gian làm việc của bạn</p>
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Check-in/out Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
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
                  disabled={isLoading || !location}
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

        {/* Location & Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Location Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Vị trí hiện tại
              </CardTitle>
            </CardHeader>
            <CardContent>
              {location ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">Đã xác định vị trí</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Lat: {location.lat.toFixed(6)}</p>
                    <p>Lng: {location.lng.toFixed(6)}</p>
                    <p className="mt-2 font-medium">📍 Văn phòng VSM</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <MapPin className="h-4 w-4" />
                  <span>Đang xác định vị trí...</span>
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
                  Hoạt động
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
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Today's Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
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
