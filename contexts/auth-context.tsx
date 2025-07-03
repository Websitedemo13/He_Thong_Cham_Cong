"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "hr" | "staff"

export interface User {
  id: string
  name: string
  dob: string
  email: string
  role: UserRole
  department: string
  position: string
  avatar: string
  phone?: string
  address?: string
  startDate?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: User[] = [
  {
    id: "1",
    name: "Quách Thành Long",
    dob: "13/07/2003",
    email: "longqt@vsm.org.vn",
    role: "admin",
    department: "Phòng CNNT",
    position: "Frontend Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    phone: "0123456789",
    address: "Hà Nội, Việt Nam",
    startDate: "01/01/2023",
  },
  {
    id: "2",
    name: "Nguyễn Văn HR",
    dob: "15/05/1990",
    email: "hr@vsm.org.vn",
    role: "hr",
    department: "Phòng Nhân sự",
    position: "HR Manager",
    avatar: "/placeholder.svg?height=100&width=100",
    phone: "0987654321",
    address: "TP.HCM, Việt Nam",
    startDate: "01/06/2022",
  },
  {
    id: "3",
    name: "Trần Thị Staff",
    dob: "20/08/1995",
    email: "staff@vsm.org.vn",
    role: "staff",
    department: "Phòng Kinh doanh",
    position: "Sales Executive",
    avatar: "/placeholder.svg?height=100&width=100",
    phone: "0369852147",
    address: "Đà Nẵng, Việt Nam",
    startDate: "15/03/2023",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("vsm-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const foundUser = mockUsers.find((u) => u.email === email && u.role === role)

    if (foundUser && password === "123456") {
      setUser(foundUser)
      localStorage.setItem("vsm-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("vsm-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
