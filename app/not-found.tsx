"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-0">
          <CardContent className="text-center p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8"
            >
              <div className="text-9xl font-bold text-primary/20 mb-4">404</div>
              <Search className="h-16 w-16 mx-auto text-muted-foreground" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold">Trang không tồn tại</h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có thể trang đã được di chuyển hoặc
                không còn tồn tại.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Button asChild size="lg" className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  Về Dashboard
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="flex items-center gap-2 bg-transparent">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Quay về đăng nhập
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t text-sm text-muted-foreground"
            >
              <p>Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với bộ phận hỗ trợ.</p>
              <p className="mt-2">
                <strong>Hệ thống chấm công VSM</strong> - The Next Generation Team
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
