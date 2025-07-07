"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Clock, MapPin, CheckCircle, XCircle, Wifi, AlertTriangle } from "lucide-react"

interface QuickCheckInProps {
  isVisible: boolean
  onClose: () => void
}

export function QuickCheckIn({ isVisible, onClose }: QuickCheckInProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isInOfficeRange, setIsInOfficeRange] = useState(false)
  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("vi-VN"))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isVisible && navigator.geolocation) {
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
        },
      )
    }
  }, [isVisible])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3
    const φ1 = lat1 * Math.PI/180
    const φ2 = lat2 * Math.PI/180
    const Δφ = (lat2-lat1) * Math.PI/180
    const Δλ = (lon2-lon1) * Math.PI/180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c
  }

  const checkLocationValidity = (userPos: { lat: number; lng: number }) => {
    // Mock office location
    const officeLocation = { lat: 10.7769, lng: 106.7009 }
    const dist = calculateDistance(userPos.lat, userPos.lng, officeLocation.lat, officeLocation.lng)
    
    setDistance(Math.round(dist))
    setIsInOfficeRange(dist <= 100) // 100m radius
  }

  const handleQuickCheckIn = async () => {
    if (!isInOfficeRange) {
      toast({
        title: "Không thể chấm công",
        description: `Bạn đang ở cách văn phòng ${distance}m (cho phép: 100m)`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    toast({
      title: "Check-in thành công!",
      description: `Đã ghi nhận thời gian vào làm lúc ${currentTime}`,
    })
    
    setIsLoading(false)
    onClose()
  }

  if (!user || (user.role !== "staff" && user.role !== "hr")) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Card className="w-80 shadow-2xl border-2 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Chấm công nhanh
                </h3>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentTime}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("vi-VN")}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-4 w-4 ${isInOfficeRange ? 'text-green-600' : 'text-red-600'}`} />
                    <span>Vị trí</span>
                  </div>
                  <Badge variant={isInOfficeRange ? "default" : "destructive"}>
                    {isInOfficeRange ? "Trong phạm vi" : `Cách ${distance}m`}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-green-600" />
                    <span>Kết nối</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Ổn định
                  </Badge>
                </div>

                {!isInOfficeRange && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Ngoài phạm vi văn phòng</span>
                  </div>
                )}

                <Button
                  onClick={handleQuickCheckIn}
                  disabled={isLoading || !isInOfficeRange}
                  className="w-full"
                  size="sm"
                >
                  {isLoading ? (
                    "Đang xử lý..."
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Check-in ngay
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}