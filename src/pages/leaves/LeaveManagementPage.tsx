'use client'
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { 
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Calendar as Download, ChevronRight, CheckCircle, XCircle, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

// --- Mock Data ---
type LeaveStatus = "pending" | "approved" | "rejected";
type LeaveType = "Sick Leave" | "Casual Leave" | "Earned Leave" | "Maternity Leave";

interface LeaveRequest {
  id: string;
  userId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approver?: string;
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    userId: "1",
    type: "Sick Leave",
    startDate: "2025-04-10",
    endDate: "2025-04-12",
    reason: "Fever and cold",
    status: "approved",
    appliedOn: "2025-04-09",
    approver: "HR Admin"
  },
  {
    id: "2",
    userId: "2",
    type: "Casual Leave",
    startDate: "2025-04-15",
    endDate: "2025-04-16",
    reason: "Personal work",
    status: "pending",
    appliedOn: "2025-04-14"
  },
  {
    id: "3",
    userId: "3",
    type: "Earned Leave",
    startDate: "2025-04-20",
    endDate: "2025-04-25",
    reason: "Vacation",
    status: "rejected",
    appliedOn: "2025-04-18",
    approver: "HR Admin"
  },
  {
    id: "4",
    userId: "1",
    type: "Casual Leave",
    startDate: "2025-03-01",
    endDate: "2025-03-02",
    reason: "Family function",
    status: "approved",
    appliedOn: "2025-02-27",
    approver: "HR Admin"
  },
];

const employeeData = [
  { id: "1", name: "John Doe", department: "Engineering" },
  { id: "2", name: "Jane Smith", department: "Design" },
  { id: "3", name: "Robert Johnson", department: "Marketing" },
  { id: "4", name: "Emily Davis", department: "HR" },
];

// --- Main Page ---
export default function LeaveManagementPage() {
  const { isAuthenticated, userRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Get employee data by ID
  const getEmployeeById = (id: string) => {
    return employeeData.find(emp => emp.id === id);
  };

  // Filter leave requests based on search query and department
  const filteredLeaves = leaveRequests.filter(request => {
    const employee = getEmployeeById(request.userId);
    if (!employee) return false;

    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      employee.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout userRole={userRole || "employee"}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leave Management</h2>
          <p className="text-muted-foreground">
            {userRole === "employee"
              ? "Apply for leave, view leave status and history"
              : "Monitor and manage employee leave requests"}
          </p>
        </div>

        {userRole === "employee" ? (
          <EmployeeLeaveView
            employeeId="1" // Would come from auth context in a real app
            leaves={leaveRequests}
          />
        ) : (
          <AdminLeaveView
            leaves={filteredLeaves}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            getEmployeeById={getEmployeeById}
            onViewEmployee={setSelectedEmployee}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

// --- Employee View ---
interface EmployeeLeaveViewProps {
  employeeId: string;
  leaves: LeaveRequest[];
}

function EmployeeLeaveView({ employeeId, leaves }: EmployeeLeaveViewProps) {
  // Get employee's leave requests
  const employeeLeaves = leaves.filter(request => request.userId === employeeId);

  // Calculate leave balance (mock)
  const leaveBalance = {
    "Sick Leave": 8,
    "Casual Leave": 10,
    "Earned Leave": 15,
    "Maternity Leave": 90,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Leave Balance</CardTitle>
          <CardDescription>Your available leave types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(leaveBalance).map(([type, days]) => (
              <div key={type} className="flex flex-col items-center">
                <span className="text-lg font-semibold">{days}</span>
                <span className="text-xs text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>View your past leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveHistoryTable
            records={employeeLeaves}
            getEmployeeById={() => null}
            showName={false}
            isAdmin={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// --- Admin View ---
interface AdminLeaveViewProps {
  leaves: LeaveRequest[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  getEmployeeById: (id: string) => { id: string; name: string; department: string } | undefined;
  onViewEmployee: (employeeId: string | null) => void;
}

function AdminLeaveView({
  leaves,
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  getEmployeeById,
  onViewEmployee,
}: AdminLeaveViewProps) {
  const departments = ["All Departments", "Engineering", "Design", "Marketing", "HR", "Finance"];

  // Leave stats
  const leaveStats = {
    total: leaves.length,
    pending: leaves.filter(l => l.status === "pending").length,
    approved: leaves.filter(l => l.status === "approved").length,
    rejected: leaves.filter(l => l.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <div className="h-4 w-4 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-4 w-4 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <div className="h-4 w-4 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveStats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <div className="h-4 w-4 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
              <XCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveStats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {["all", "pending", "approved", "rejected"].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Leave Requests
                </CardTitle>
                <CardDescription>
                  {tab === "all"
                    ? "All leave requests"
                    : `Requests with status: ${tab}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaveHistoryTable
                  records={
                    tab === "all"
                      ? leaves
                      : leaves.filter(l => l.status === tab)
                  }
                  getEmployeeById={getEmployeeById}
                  isAdmin={true}
                  showName={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// --- Leave History Table ---
interface LeaveHistoryTableProps {
  records: LeaveRequest[];
  getEmployeeById: (id: string) => { id: string; name: string; department: string } | undefined | null;
  isAdmin?: boolean;
  showName?: boolean;
}

function LeaveHistoryTable({
  records,
  getEmployeeById,
  isAdmin = false,
  showName = true,
}: LeaveHistoryTableProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No leave records found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showName && <TableHead>Employee</TableHead>}
          <TableHead>Type</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Applied On</TableHead>
          {isAdmin && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((leave) => {
          const employee = getEmployeeById?.(leave.userId);
          return (
            <TableRow key={leave.id}>
              {showName && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{employee?.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                    <span>{employee?.name || "Unknown"}</span>
                  </div>
                </TableCell>
              )}
              <TableCell>{leave.type}</TableCell>
              <TableCell>{format(new Date(leave.startDate), "MMM d, yyyy")}</TableCell>
              <TableCell>{format(new Date(leave.endDate), "MMM d, yyyy")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    leave.status === "approved"
                      ? "default"
                      : leave.status === "pending"
                      ? "outline"
                      : "secondary"
                  }
                  className={
                    leave.status === "pending"
                      ? "border-yellow-500 text-yellow-500"
                      : leave.status === "rejected"
                      ? "border-destructive text-destructive"
                      : ""
                  }
                >
                  {leave.status}
                </Badge>
              </TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{format(new Date(leave.appliedOn), "MMM d, yyyy")}</TableCell>
              {isAdmin && (
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Review
                  </Button>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}