"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Heart, ArrowLeft, Star, Sparkles, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const motivationalSlogans = [
  {
    text: "Thành công không phải là đích đến, mà là hành trình không ngừng nghỉ!",
    icon: Target,
    color: "text-blue-500",
  },
  {
    text: "Mỗi ngày là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình!",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    text: "Đam mê và kiên trì là chìa khóa mở ra mọi cánh cửa thành công!",
    icon: Trophy,
    color: "text-orange-500",
  },
  {
    text: "Hãy tin vào bản thân, bởi bạn mạnh mẽ hơn những gì bạn nghĩ!",
    icon: Sparkles,
    color: "text-purple-500",
  },
  {
    text: "Không có gì là không thể, chỉ cần bạn dám ước mơ và hành động!",
    icon: Heart,
    color: "text-red-500",
  },
  {
    text: "Tương lai thuộc về những ai tin vào vẻ đẹp của ước mơ!",
    icon: Star,
    color: "text-green-500",
  },
  {
    text: "Mỗi thử thách là một cơ hội để chứng minh sức mạnh của bạn!",
    icon: Trophy,
    color: "text-indigo-500",
  },
  {
    text: "Hãy làm việc chăm chỉ trong im lặng, để thành công tạo ra tiếng vang!",
    icon: Target,
    color: "text-pink-500",
  },
]

export default function LogoutPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [currentSlogan, setCurrentSlogan] = useState(null)
  const [showSlogan, setShowSlogan] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("vi-VN"))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Select random slogan
    const randomSlogan = motivationalSlogans[Math.floor(Math.random() * motivationalSlogans.length)]
    setCurrentSlogan(randomSlogan)

    // Show slogan after a delay
    const timer = setTimeout(() => {
      setShowSlogan(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!currentSlogan) return null

  const SloganIcon = currentSlogan.icon

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="shadow-2xl border-0 glass-effect text-white">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-6 relative"
            >
              {/* Company Logo with Animation */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
              >
                <Building2 className="h-12 w-12 text-white" />
              </motion.div>

              {/* Floating sparkles around logo */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                    top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                  }}
                />
              ))}
            </motion.div>

            <CardTitle className="text-3xl font-bold mb-2">Hẹn gặp lại!</CardTitle>
            <CardDescription className="text-white/80 text-lg">Cảm ơn bạn đã sử dụng hệ thống VSM</CardDescription>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            {/* Motivational Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: showSlogan ? 1 : 0, y: showSlogan ? 0 : 30 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="mb-4"
                >
                  <SloganIcon className={`h-12 w-12 mx-auto ${currentSlogan.color}`} />
                </motion.div>

                <motion.p
                  className="text-lg font-semibold mb-3 leading-relaxed"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  "{currentSlogan.text}"
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"
                />
              </div>
            </motion.div>

            {/* Time and Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="text-white/70 text-sm space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <span>⏰</span>
                    <span>Thời gian đăng xuất: {currentTime}</span>
                  </p>
                  <motion.p
                    className="font-medium"
                    animate={{
                      color: ["#ffffff", "#60a5fa", "#34d399", "#fbbf24", "#ffffff"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    "Công nghệ hiện đại - Quản lý hiệu quả - Tương lai số hóa"
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90 relative overflow-hidden group"
              >
                <Link href="/" className="flex items-center gap-2">
                  <motion.div
                    animate={{ x: [-10, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </motion.div>
                  <span>Quay về đăng nhập</span>

                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 300] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </Link>
              </Button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-6 border-t border-white/20 text-xs text-white/60 space-y-2"
            >
              <motion.p
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                Được phát triển bởi team <strong className="text-yellow-300 font-bold">The Next Generation</strong>
              </motion.p>
              <p>Phòng CNNT - Tổ chức VSM</p>
              <motion.p
                className="text-white/40"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                Hệ thống chấm công thông minh v2.0
              </motion.p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
