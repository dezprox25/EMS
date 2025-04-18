
import { 
    Users, Calendar, Clock, FileText, CheckCircle2, Briefcase 
  } from "lucide-react";
  import { StatCard } from "@/components/dashboard/StatCard";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Progress } from "@/components/ui/progress";
  
  // Demo data for display
  const recentEmployees = [
    { id: 1, name: "John Doe", position: "Software Developer", department: "IT", status: "active" },
    { id: 2, name: "Alice Brown", position: "UX Designer", department: "Design", status: "active" },
    { id: 3, name: "Robert Green", position: "Project Manager", department: "Operations", status: "inactive" },
  ];
  
  const todayAttendance = [
    { id: 1, name: "John Doe", status: "present", checkIn: "09:05 AM", checkOut: "" },
    { id: 2, name: "Alice Brown", status: "present", checkIn: "08:45 AM", checkOut: "" },
    { id: 3, name: "Robert Green", status: "absent", checkIn: "", checkOut: "" },
    { id: 4, name: "Emily White", status: "late", checkIn: "10:15 AM", checkOut: "" },
  ];
  
  const pendingLeaves = [
    { id: 1, name: "Tom Harris", department: "Marketing", startDate: "2023-05-15", endDate: "2023-05-17", reason: "Personal" },
    { id: 2, name: "Emily Clark", department: "IT", startDate: "2023-05-20", endDate: "2023-05-25", reason: "Vacation" },
  ];
  
  const taskCompletion = [
    { project: "Website Redesign", progress: 75 },
    { project: "Mobile App Development", progress: 45 },
    { project: "Database Migration", progress: 90 },
  ];
  
  export default function AdminDashboard() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your team overview.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={24}
            icon={<Users className="h-5 w-5" />}
            description="2 new this month"
          />
          <StatCard
            title="Present Today"
            value={18}
            icon={<CheckCircle2 className="h-5 w-5" />}
            description="75% attendance rate"
          />
          <StatCard
            title="Pending Leaves"
            value={5}
            icon={<Calendar className="h-5 w-5" />}
            description="3 new requests"
          />
          <StatCard
            title="Average Work Hours"
            value="7.5h"
            icon={<Clock className="h-5 w-5" />}
            description="Last 7 days"
          />
        </div>
  
        <Tabs defaultValue="employees">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="attendance">Today's Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
            <TabsTrigger value="projects">Project Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Employee Management</CardTitle>
                    <CardDescription>View and manage your team members</CardDescription>
                  </div>
                  <Button>Add Employee</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>Employee check-in/check-out status for today</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={record.status === "present" ? "default" : 
                                    record.status === "late" ? "outline" : "secondary"}
                            className={record.status === "late" ? "border-yellow-500 text-yellow-500" : ""}
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.checkIn || "-"}</TableCell>
                        <TableCell>{record.checkOut || "-"}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" disabled={record.status === "absent"}>
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leaves" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Leave Requests</CardTitle>
                <CardDescription>Approve or reject employee leave requests</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingLeaves.map((leave) => (
                  <div
                    key={leave.id}
                    className="mb-4 flex items-start space-x-4 rounded-md border p-4"
                  >
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{leave.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{leave.name}</p>
                      <p className="text-sm text-muted-foreground">{leave.department}</p>
                      <p className="text-sm">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Reason: {leave.reason}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Current status of ongoing projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {taskCompletion.map((task, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div className="text-sm font-medium">{task.project}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-muted-foreground">{task.progress}%</div>
                          <Badge variant={
                            task.progress >= 70 ? "default" : 
                            task.progress >= 40 ? "outline" : "secondary"
                          }>
                            {task.progress >= 70 ? "On Track" : 
                             task.progress >= 40 ? "In Progress" : "At Risk"}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>Latest employee reports submitted</CardDescription>
                  </div>
                  <Button variant="outline">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <div>
                      <FileText className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Weekly Progress Report</p>
                      <p className="text-sm text-muted-foreground">Submitted by John Doe</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex items-start space-x-4 rounded-md border p-4">
                    <div>
                      <FileText className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Daily Status Update</p>
                      <p className="text-sm text-muted-foreground">Submitted by Alice Brown</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }