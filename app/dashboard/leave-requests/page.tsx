"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, FileText, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockLeaveRequests = [
  {
    id: "1",
    employeeName: "Trần Thị Staff",
    department: "Phòng Kinh doanh",
    type: "sick",
    startDate: "2025-01-10",
    endDate: "2025-01-10",
    reason: "Bị cảm lạnh, cần nghỉ ngơi",
    status: "pending",
    submittedAt: "2025-01-08T10:30:00",
    days: 1,
  },
  {
    id: "2",
    employeeName: "Lê Minh Tân",
    department: "Phòng CNTT",
    type: "vacation",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    reason: "Nghỉ lễ Tết Nguyên đán",
    status: "pending",
    submittedAt: "2025-01-01T14:20:00",
    days: 3,
  },
  {
    id: "3",
    employeeName: "Phạm Thu Hà",
    department: "Phòng Marketing",
    type: "personal",
    startDate: "2024-12-25",
    endDate: "2024-12-25",
    reason: "Việc gia đình cần xử lý",
    status: "approved",
    submittedAt: "2024-12-20T09:15:00",
    days: 1,
  },
]

export default function LeaveRequestsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedStatus, setSelectedStatus] = useState("all")

  if (!user || user.role !== "hr") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho HR</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleApprove = (id: string) => {
    toast({
      title: "Đã phê duyệt đơn nghỉ phép",
      description: "Đơn nghỉ phép đã được phê duyệt thành công.",
    })
  }

  const handleReject = (id: string) => {
    toast({
      title: "Đã từ chối đơn nghỉ phép",
      description: "Đơn nghỉ phép đã bị từ chối.",
      variant: "destructive",
    })
  }

  const filteredRequests = mockLeaveRequests.filter((request) => {
    if (selectedStatus === "all") return true
    return request.status === selectedStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Chờ duyệt</Badge>
        )
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Đã duyệt</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Từ chối</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sick":
        return "Nghỉ ốm"
      case "vacation":
        return "Nghỉ phép"
      case "personal":
        return "Việc cá nhân"
      case "emergency":
        return "Khẩn cấp"
      default:
        return type
    }
  }

  const stats = {
    total: mockLeaveRequests.length,
    pending: mockLeaveRequests.filter((r) => r.status === "pending").length,
    approved: mockLeaveRequests.filter((r) => r.status === "approved").length,
    rejected: mockLeaveRequests.filter((r) => r.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Quản lý nghỉ phép</h1>
          <p className="text-muted-foreground">Phê duyệt và quản lý đơn xin nghỉ phép của nhân viên</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Tổng đơn</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Chờ duyệt</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Đã duyệt</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Từ chối</p>
                <p className="text-3xl font-bold text-red-700 dark:text-red-300">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leave Requests Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn xin nghỉ phép</CardTitle>
            <CardDescription>Hiển thị {filteredRequests.length} đơn xin nghỉ phép</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request, index) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{request.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTypeLabel(request.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{request.startDate}</div>
                          {request.startDate !== request.endDate && (
                            <div className="text-sm text-muted-foreground">đến {request.endDate}</div>
                          )}
                          <div className="text-xs text-muted-foreground">{request.days} ngày</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{request.reason}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Duyệt
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                              <XCircle className="h-4 w-4 mr-1" />
                              Từ chối
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
