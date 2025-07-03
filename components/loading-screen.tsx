"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function LoadingScreen() {
  const { theme } = useTheme()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="mx-auto mb-4"
        >
          <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary"></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-bold text-primary mb-2">VSM</h2>
          <p className="text-muted-foreground">Đang tải hệ thống...</p>
        </motion.div>
      </div>
    </div>
  )
}
