"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Building2, Users, Shield, Sparkles, Zap, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import LoadingScreen from "@/components/loading-screen"

const gradients = [
  "from-blue-600 via-purple-600 to-indigo-600",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-pink-500 via-rose-500 to-red-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-violet-500 via-purple-500 to-fuchsia-500",
]

const floatingIcons = [
  { icon: Sparkles, delay: 0 },
  { icon: Zap, delay: 0.5 },
  { icon: Star, delay: 1 },
  { icon: Building2, delay: 1.5 },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("staff")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentGradient, setCurrentGradient] = useState(0)

  const { login, user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Gradient rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (isLoading) {
    return <LoadingScreen />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await login(email, password, role)

    if (success) {
      toast({
        title: "Đăng nhập thành công!",
        description: `Chào mừng bạn đến với hệ thống VSM`,
      })
      router.push("/dashboard")
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: "Email, mật khẩu hoặc vai trò không đúng",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  const roleIcons = {
    admin: Shield,
    hr: Users,
    staff: Building2,
  }

  const RoleIcon = roleIcons[role]

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGradient}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className={`absolute inset-0 bg-gradient-to-br ${gradients[currentGradient]}`}
          />
        </AnimatePresence>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
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
      </div>

      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <motion.span
                  className="text-3xl font-bold text-primary-foreground"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 20px rgba(255,255,255,0.8)",
                      "0 0 0px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  VSM
                </motion.span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Đăng nhập hệ thống
                </CardTitle>
                <CardDescription className="text-lg mt-2">Hệ thống chấm công VSM - Quản lý hiệu quả</CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@vsm.org.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <motion.div animate={{ rotate: showPassword ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </motion.div>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Label htmlFor="role" className="text-sm font-medium">
                    Vai trò
                  </Label>
                  <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                    <SelectTrigger className="h-12">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <RoleIcon className="h-4 w-4" />
                        </motion.div>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Quản trị viên
                        </div>
                      </SelectItem>
                      <SelectItem value="hr">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Nhân sự (HR)
                        </div>
                      </SelectItem>
                      <SelectItem value="staff">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Nhân viên
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-semibold relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                      animate={{ x: [-100, 300] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <span className="relative z-10">{isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}</span>
                  </Button>
                </motion.div>
              </form>

              <motion.div
                className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-center mb-3 font-semibold text-blue-800 dark:text-blue-300">
                  🚀 Demo Account
                </p>
                <div className="text-xs space-y-2 text-center">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                      <p className="font-medium">Admin: longqt@vsm.org.vn</p>
                    </div>
                    <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                      <p className="font-medium">HR: hr@vsm.org.vn</p>
                    </div>
                    <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                      <p className="font-medium">Staff: staff@vsm.org.vn</p>
                    </div>
                  </div>
                  <p className="font-bold text-blue-600 dark:text-blue-400 mt-3">🔑 Password: 123456</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right side - Company Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 text-white relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-lg"
        >
          {/* Floating Icons */}
          <div className="relative mb-8">
            {floatingIcons.map(({ icon: Icon, delay }, index) => (
              <motion.div
                key={index}
                className="absolute"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: delay,
                }}
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${10 + (index % 2) * 20}%`,
                }}
              >
                <Icon className="h-8 w-8 opacity-70" />
              </motion.div>
            ))}

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              className="mb-6"
            >
              <Building2 className="h-32 w-32 mx-auto opacity-90" />
            </motion.div>
          </div>

          <motion.h1
            className="text-5xl font-bold mb-6"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            style={{
              background: "linear-gradient(45deg, #fff, #e0e7ff, #fff, #ddd6fe, #fff)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hệ thống chấm công VSM
          </motion.h1>

          <motion.blockquote
            className="text-xl italic mb-8 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1 }}
          >
            "Công nghệ hiện đại - Quản lý hiệu quả - Tương lai số hóa"
          </motion.blockquote>

          <motion.div
            className="space-y-3 text-lg opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {["🚀 Chấm công thông minh", "📊 Báo cáo chi tiết", "💬 Giao tiếp nội bộ", "🎯 Quản lý hiệu suất"].map(
              (feature, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.2 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="cursor-default"
                >
                  {feature}
                </motion.p>
              ),
            )}
          </motion.div>

          <motion.div
            className="mt-12 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-sm opacity-70">
              Được phát triển bởi team <strong className="text-yellow-300">The Next Generation</strong>
            </p>
            <p className="text-sm opacity-70">Phòng CNNT - Tổ chức VSM</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
