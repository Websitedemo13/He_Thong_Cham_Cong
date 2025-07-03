"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Briefcase,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  Trash2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    position: user?.position || "",
    department: user?.department || "",
  })

  if (!user) return null

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Cập nhật thành công!",
      description: "Thông tin hồ sơ đã được lưu.",
    })
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      position: user.position,
      department: user.department,
    })
    setIsEditing(false)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File quá lớn",
          description: "Vui lòng chọn file nhỏ hơn 5MB",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "File không hợp lệ",
          description: "Vui lòng chọn file hình ảnh",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = (e.target as FileReader | null)?.result
        if (typeof result === "string") {
          setAvatarPreview(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveAvatar = () => {
    if (avatarPreview) {
      // Here you would upload the avatar to your server
      console.log("Uploading avatar:", avatarPreview)
      toast({
        title: "Cập nhật ảnh đại diện thành công!",
        description: "Ảnh đại diện mới đã được lưu.",
      })
      setShowAvatarDialog(false)
      setAvatarPreview(null)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarPreview(null)
    toast({
      title: "Đã xóa ảnh đại diện",
      description: "Ảnh đại diện đã được xóa.",
    })
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Quản trị viên"
      case "hr":
        return "Nhân sự"
      case "staff":
        return "Nhân viên"
      default:
        return role
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "hr":
        return "default"
      case "staff":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Lưu
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 bg-transparent">
                <X className="h-4 w-4" />
                Hủy
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Enhanced Profile Card with Avatar Upload */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <Avatar className="h-32 w-32 mx-auto border-4 border-background shadow-lg">
                  <AvatarImage src={avatarPreview || user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-4xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Avatar Upload Button */}
                <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
                  <DialogTrigger asChild>
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
                      <DialogDescription>
                        Chọn ảnh mới cho hồ sơ của bạn. File phải nhỏ hơn 5MB và định dạng JPG, PNG.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Avatar Preview */}
                      <div className="flex justify-center">
                        <Avatar className="h-32 w-32 border-4 border-muted">
                          <AvatarImage src={avatarPreview || user.avatar || "/placeholder.svg"} alt="Preview" />
                          <AvatarFallback className="text-2xl">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Upload Controls */}
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Chọn ảnh mới
                        </Button>

                        {avatarPreview && (
                          <Button
                            variant="outline"
                            className="w-full text-red-600 hover:text-red-700 bg-transparent"
                            onClick={handleRemoveAvatar}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa ảnh
                          </Button>
                        )}

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowAvatarDialog(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleSaveAvatar} disabled={!avatarPreview}>
                          Lưu ảnh
                        </Button>
                      </div>

                      {/* Upload Guidelines */}
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="font-medium">Hướng dẫn:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Kích thước tối đa: 5MB</li>
                          <li>Định dạng: JPG, PNG, GIF</li>
                          <li>Khuyến nghị: Ảnh vuông, độ phân giải cao</li>
                          <li>Nội dung: Ảnh chân dung, phù hợp môi trường công sở</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Badge variant={getRoleBadgeVariant(user.role)}>{getRoleLabel(user.role)}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{user.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{user.position}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Sinh ngày {user.dob}</span>
              </div>
              {user.startDate && (
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Bắt đầu làm việc: {user.startDate}</span>
                </div>
              )}

              {/* Profile Completion */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Hoàn thiện hồ sơ</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Thêm số điện thoại và địa chỉ để hoàn thiện hồ sơ</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Information - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Cập nhật thông tin liên hệ và chi tiết cá nhân</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Chức vụ</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10 min-h-[80px]"
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Work Information - Enhanced */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin công việc</CardTitle>
            <CardDescription>Chi tiết về vị trí và phòng ban làm việc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Phòng ban</Label>
                <div className="p-3 bg-muted rounded-md">{user.department}</div>
              </div>

              <div className="space-y-2">
                <Label>Vai trò hệ thống</Label>
                <div className="p-3 bg-muted rounded-md">{getRoleLabel(user.role)}</div>
              </div>

              <div className="space-y-2">
                <Label>Mã nhân viên</Label>
                <div className="p-3 bg-muted rounded-md">VSM-{user.id.padStart(4, "0")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt bảo mật</CardTitle>
            <CardDescription>Quản lý mật khẩu và cài đặt bảo mật tài khoản</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Đổi mật khẩu
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Cài đặt xác thực 2 bước
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Xem lịch sử đăng nhập
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
