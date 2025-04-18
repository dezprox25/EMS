'use client'
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Calendar as  Download, ChevronRight, CheckCircle, XCircle, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Attendance } from "@/types";

// Mock data
const attendanceData: Attendance[] = [
  { 
    id: "1", 
    userId: "1", 
    checkIn: "2023-05-15T09:00:00", 
    checkOut: "2023-05-15T17:30:00", 
    totalHours: 8.5, 
    status: "present",
    date: "2023-05-15"
  },
  { 
    id: "2", 
    userId: "2", 
    checkIn: "2023-05-15T08:45:00", 
    checkOut: "2023-05-15T17:15:00", 
    totalHours: 8.5, 
    status: "present",
    date: "2023-05-15"
  },
  { 
    id: "3", 
    userId: "3", 
    checkIn: "2023-05-15T10:20:00", 
    checkOut: "2023-05-15T18:45:00", 
    totalHours: 8.4, 
    status: "late",
    date: "2023-05-15"
  },
  { 
    id: "4", 
    userId: "4", 
    checkIn: "", 
    checkOut: "", 
    totalHours: 0, 
    status: "absent",
    date: "2023-05-15"
  },
];

const employeeData = [
  { id: "1", name: "John Doe", department: "Engineering" },
  { id: "2", name: "Jane Smith", department: "Design" },
  { id: "3", name: "Robert Johnson", department: "Marketing" },
  { id: "4", name: "Emily Davis", department: "HR" },
];

export default function AttendancePage() {
  const { isAuthenticated, userRole } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedEmployee, setSelectedEmployee] = useState<Attendance | null>(null);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Get employee data by ID
  const getEmployeeById = (id: string) => {
    return employeeData.find(emp => emp.id === id);
  };

  // Filter attendance based on search query and department
  const filteredAttendance = attendanceData.filter(record => {
    const employee = getEmployeeById(record.userId);
    if (!employee) return false;
    
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = 
      selectedDepartment === "All Departments" || 
      employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Get attendance by date
  const getAttendanceByDate = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    return attendanceData.filter(record => record.date === formattedDate);
  };

  const todayAttendance = getAttendanceByDate(new Date());
  
  // Handle check-in
  const handleCheckIn = (userId: string) => {
    console.log("Check in for user:", userId);
    // In a real app, this would update the attendance record
  };

  // Handle check-out
  const handleCheckOut = (userId: string) => {
    console.log("Check out for user:", userId);
    // In a real app, this would update the attendance record
  };

  return (
    <DashboardLayout userRole={userRole || "employee"}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
          <p className="text-muted-foreground">
            {userRole === "employee" 
              ? "Track your attendance and view history"
              : "Monitor employee attendance and manage records"}
          </p>
        </div>

        {userRole === "employee" ? (
          <EmployeeAttendanceView 
            employeeId="1" // Would come from auth context in a real app
            attendance={attendanceData}
          />
        ) : (
          <AdminAttendanceView 
            attendance={filteredAttendance} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            getEmployeeById={getEmployeeById}
            onViewEmployee={setSelectedEmployee}
            date={date}
            setDate={setDate}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

interface EmployeeAttendanceViewProps {
  employeeId: string;
  attendance: Attendance[];
}

function EmployeeAttendanceView({ employeeId, attendance }: EmployeeAttendanceViewProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  
  // Get today's attendance record for the employee
  const todayRecord = attendance.find(
    record => record.userId === employeeId && record.date === format(new Date(), "yyyy-MM-dd")
  );
  
  // Check if already checked in
  const hasCheckedIn = !!todayRecord?.checkIn;
  // Check if already checked out
  const hasCheckedOut = !!todayRecord?.checkOut;

  // Get employee's attendance history
  const employeeAttendance = attendance.filter(record => record.userId === employeeId);
  
  // Handle check-in
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    // In a real app, this would make an API call to record attendance
  };
  
  // Handle check-out
  const handleCheckOut = () => {
    // In a real app, this would make an API call to update attendance
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <CardDescription>Record your attendance for the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-medium mb-2">Current Status</h3>
              <div className="flex items-center gap-2">
                {hasCheckedIn ? (
                  <Badge variant="default" className="px-3 py-1">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Checked In
                  </Badge>
                ) : (
                  <Badge variant="outline" className="px-3 py-1">
                    <XCircle className="mr-1 h-4 w-4" />
                    Not Checked In
                  </Badge>
                )}
              </div>
              
              {hasCheckedIn && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Checked in at {todayRecord?.checkIn ? format(new Date(todayRecord.checkIn), "h:mm a") : ""}
                </div>
              )}
              
              {hasCheckedIn && hasCheckedOut && (
                <div className="mt-1 text-sm text-muted-foreground">
                  Checked out at {todayRecord?.checkOut ? format(new Date(todayRecord.checkOut), "h:mm a") : ""}
                </div>
              )}
              
              {hasCheckedIn && hasCheckedOut && todayRecord?.totalHours && (
                <div className="mt-1 text-sm">
                  <span className="font-medium">Total Hours:</span> {todayRecord.totalHours}h
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                size="lg" 
                className="w-48"
                disabled={hasCheckedIn}
                onClick={handleCheckIn}
              >
                <Clock className="mr-2 h-4 w-4" />
                Check In
              </Button>
              
              <Button 
                size="lg" 
                variant={hasCheckedIn ? "default" : "outline"}
                className="w-48"
                disabled={!hasCheckedIn || hasCheckedOut}
                onClick={handleCheckOut}
              >
                <Clock className="mr-2 h-4 w-4" />
                Check Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>View your past attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
              />
            </div>
            
            <AttendanceHistoryTable 
              records={employeeAttendance} 
              date={date} 
              getEmployeeById={() => null} // Not needed for employee view
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface AdminAttendanceViewProps {
  attendance: Attendance[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  getEmployeeById: (id: string) => { id: string; name: string; department: string } | undefined;
  onViewEmployee: (attendance: Attendance | null) => void;
  date: Date;
  setDate: (date: Date) => void;
}

function AdminAttendanceView({ 
  attendance, 
  searchQuery, 
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  getEmployeeById,
  onViewEmployee,
  date,
  setDate
}: AdminAttendanceViewProps) {
  
  const departments = ["All Departments", "Engineering", "Design", "Marketing", "HR", "Finance"];
  
  // Get attendance for the selected date
  const selectedDateAttendance = attendance.filter(
    record => record.date === format(date, "yyyy-MM-dd")
  );
  
  // Get attendance stats
  const attendanceStats = {
    total: selectedDateAttendance.length,
    present: selectedDateAttendance.filter(record => record.status === "present").length,
    late: selectedDateAttendance.filter(record => record.status === "late").length,
    absent: selectedDateAttendance.filter(record => record.status === "absent").length,
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
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <div className="h-4 w-4 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <div className="h-4 w-4 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.present}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceStats.total > 0 
                ? Math.round((attendanceStats.present / attendanceStats.total) * 100) 
                : 0}% attendance rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <div className="h-4 w-4 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.late}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceStats.total > 0 
                ? Math.round((attendanceStats.late / attendanceStats.total) * 100) 
                : 0}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <div className="h-4 w-4 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
              <XCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.absent}</div>
            <p className="text-xs text-muted-foreground">
              {attendanceStats.total > 0 
                ? Math.round((attendanceStats.absent / attendanceStats.total) * 100) 
                : 0}% of total
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance</CardTitle>
              <CardDescription>Attendance records for {format(date, "MMMM d, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <AttendanceHistoryTable 
                    records={selectedDateAttendance} 
                    date={date} 
                    getEmployeeById={getEmployeeById}
                    isAdmin={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Summary</CardTitle>
              <CardDescription>Overview for {format(date, "MMMM yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Present Days</TableHead>
                      <TableHead>Absent Days</TableHead>
                      <TableHead>Late Days</TableHead>
                      <TableHead>Working Hours</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* This would be calculated from the full month's data in a real app */}
                    {Array.from(new Set(attendance.map(a => a.userId))).map(userId => {
                      const employee = getEmployeeById(userId);
                      const employeeRecords = attendance.filter(a => a.userId === userId);
                      
                      const presentDays = employeeRecords.filter(r => r.status === "present").length;
                      const absentDays = employeeRecords.filter(r => r.status === "absent").length;
                      const lateDays = employeeRecords.filter(r => r.status === "late").length;
                      const totalHours = employeeRecords.reduce((total, r) => total + (r.totalHours || 0), 0);
                      
                      return (
                        <TableRow key={userId}>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>{employee?.name.charAt(0) || "?"}</AvatarFallback>
                            </Avatar>
                            <span>{employee?.name || "Unknown"}</span>
                          </TableCell>
                          <TableCell>{employee?.department || "Unknown"}</TableCell>
                          <TableCell>{presentDays}</TableCell>
                          <TableCell>{absentDays}</TableCell>
                          <TableCell>{lateDays}</TableCell>
                          <TableCell>{totalHours.toFixed(1)}h</TableCell>
                          <TableCell>
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Details <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                  <SheetTitle>Attendance Details</SheetTitle>
                                  <SheetDescription>
                                    Complete attendance record for {employee?.name}
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="py-6">
                                  <AttendanceHistoryTable 
                                    records={employeeRecords} 
                                    date={new Date()} 
                                    getEmployeeById={getEmployeeById}
                                    showName={false}
                                  />
                                </div>
                              </SheetContent>
                            </Sheet>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AttendanceHistoryTableProps {
  records: Attendance[];
  date: Date;
  getEmployeeById: (id: string) => { id: string; name: string; department: string } | undefined | null;
  isAdmin?: boolean;
  showName?: boolean;
}

function AttendanceHistoryTable({ 
  records, 
  date, 
  getEmployeeById,
  isAdmin = false,
  showName = true 
}: AttendanceHistoryTableProps) {
  // Filter records for the selected date
  const dateRecords = records.filter(
    record => record.date === format(date, "yyyy-MM-dd")
  );
  
  if (dateRecords.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No attendance records for this date.</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showName && <TableHead>Employee</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Working Hours</TableHead>
          {isAdmin && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dateRecords.map((record) => {
          const employee = getEmployeeById?.(record.userId);
          return (
            <TableRow key={record.id}>
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
              <TableCell>
                <Badge 
                  variant={
                    record.status === "present" ? "default" : 
                    record.status === "late" ? "outline" : "secondary"
                  }
                  className={record.status === "late" ? "border-yellow-500 text-yellow-500" : ""}
                >
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell>
                {record.checkIn 
                  ? format(new Date(record.checkIn), "h:mm a") 
                  : "-"}
              </TableCell>
              <TableCell>
                {record.checkOut 
                  ? format(new Date(record.checkOut), "h:mm a") 
                  : "-"}
              </TableCell>
              <TableCell>
                {record.totalHours ? `${record.totalHours}h` : "-"}
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}