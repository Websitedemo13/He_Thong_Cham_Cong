"use client"

import type * as React from "react"
import {
  BarChart3,
  Building2,
  Calendar,
  Clock,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Shield,
  Users,
  UserCheck,
  MapPin,
  PieChart,
  DollarSign,
  Target,
  Bell,
  Brain,
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  if (!user) return null

  const getNavigationItems = () => {
    const baseItems = [
      {
        title: "Tổng quan",
        url: "/dashboard",
        icon: Home,
        isActive: true,
      },
      {
        title: "Hồ sơ cá nhân",
        url: "/dashboard/profile",
        icon: Users,
      },
      {
        title: "Thông báo",
        url: "/dashboard/notifications",
        icon: Bell,
      },
    ]

    if (user.role === "admin") {
      return [
        ...baseItems,
        {
          title: "Quản lý nhân viên",
          url: "/dashboard/employees",
          icon: UserCheck,
        },
        {
          title: "Quản lý phòng ban",
          url: "/dashboard/departments",
          icon: Building2,
        },
        {
          title: "Bảng công toàn bộ",
          url: "/dashboard/attendance",
          icon: Clock,
        },
        {
          title: "Quản lý lương",
          url: "/dashboard/payroll",
          icon: DollarSign,
        },
        {
          title: "Quản lý hiệu suất",
          url: "/dashboard/performance",
          icon: Target,
        },
        {
          title: "Analytics & AI",
          url: "/dashboard/analytics",
          icon: Brain,
        },
        {
          title: "Lịch hệ thống",
          url: "/dashboard/calendar",
          icon: Calendar,
        },
        {
          title: "Báo cáo KPI",
          url: "/dashboard/reports",
          icon: BarChart3,
        },
        {
          title: "Tin nhắn",
          url: "/dashboard/messages",
          icon: MessageSquare,
        },
        {
          title: "Cấu hình hệ thống",
          url: "/dashboard/settings",
          icon: Settings,
        },
      ]
    } else if (user.role === "hr") {
      return [
        ...baseItems,
        {
          title: "Bảng công nhân viên",
          url: "/dashboard/attendance",
          icon: Clock,
        },
        {
          title: "Quản lý nghỉ phép",
          url: "/dashboard/leave-requests",
          icon: FileText,
        },
        {
          title: "Quản lý lương",
          url: "/dashboard/payroll",
          icon: DollarSign,
        },
        {
          title: "Quản lý hiệu suất",
          url: "/dashboard/performance",
          icon: Target,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: TrendingUp,
        },
        {
          title: "Lịch chung",
          url: "/dashboard/calendar",
          icon: Calendar,
        },
        {
          title: "Tin nhắn",
          url: "/dashboard/messages",
          icon: MessageSquare,
        },
        {
          title: "Báo cáo",
          url: "/dashboard/reports",
          icon: PieChart,
        },
      ]
    } else {
      return [
        ...baseItems,
        {
          title: "Chấm công",
          url: "/dashboard/checkin",
          icon: MapPin,
        },
        {
          title: "Bảng công cá nhân",
          url: "/dashboard/my-attendance",
          icon: Clock,
        },
        {
          title: "Xin nghỉ phép",
          url: "/dashboard/leave-request",
          icon: FileText,
        },
        {
          title: "Hiệu suất cá nhân",
          url: "/dashboard/performance",
          icon: Target,
        },
        {
          title: "Lịch cá nhân",
          url: "/dashboard/calendar",
          icon: Calendar,
        },
        {
          title: "Tin nhắn",
          url: "/dashboard/messages",
          icon: MessageSquare,
        },
        {
          title: "Thống kê cá nhân",
          url: "/dashboard/my-stats",
          icon: BarChart3,
        },
      ]
    }
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">VSM System</span>
                  <span className="truncate text-xs">Chấm công thông minh</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavigationItems()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}