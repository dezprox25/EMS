
import { 
    Users, Shield, Calendar, FileText, AlertCircle, UserCheck
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
  const recentAdmins = [
    { id: 1, name: "Jane Smith", email: "jane.smith@example.com", department: "HR", status: "active" },
    { id: 2, name: "Mike Johnson", email: "mike.johnson@example.com", department: "Finance", status: "active" },
    { id: 3, name: "Sara Wilson", email: "sara.wilson@example.com", department: "Operations", status: "inactive" },
  ];
  
  const pendingLeaves = [
    { id: 1, name: "Tom Harris", department: "Marketing", startDate: "2023-05-15", endDate: "2023-05-17", reason: "Personal" },
    { id: 2, name: "Emily Clark", department: "IT", startDate: "2023-05-20", endDate: "2023-05-25", reason: "Vacation" },
  ];
  
  const systemAlerts = [
    { id: 1, type: "error", message: "Database backup failed", time: "2 hours ago" },
    { id: 2, type: "warning", message: "CPU usage above 80%", time: "3 hours ago" },
    { id: 3, type: "info", message: "System update available", time: "5 hours ago" },
  ];
  
  export default function SuperAdminDashboard() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your system.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={128}
            icon={<Users className="h-5 w-5" />}
            description="8% increase from last month"
          />
          <StatCard
            title="Total Admins"
            value={8}
            icon={<Shield className="h-5 w-5" />}
            description="2 new admins this month"
          />
          <StatCard
            title="Pending Leaves"
            value={12}
            icon={<Calendar className="h-5 w-5" />}
            description="5 new requests today"
          />
          <StatCard
            title="Unread Reports"
            value={25}
            icon={<FileText className="h-5 w-5" />}
            description="10 submitted today"
          />
        </div>
  
        <Tabs defaultValue="admins">
          <TabsList>
            <TabsTrigger value="admins">Admin Management</TabsTrigger>
            <TabsTrigger value="system">System Alerts</TabsTrigger>
            <TabsTrigger value="leaves">Pending Leaves</TabsTrigger>
          </TabsList>
          
          <TabsContent value="admins" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Admins</CardTitle>
                    <CardDescription>Manage your system administrators</CardDescription>
                  </div>
                  <Button>Add Admin</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.department}</TableCell>
                        <TableCell>
                          <Badge variant={admin.status === "active" ? "default" : "secondary"}>
                            {admin.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent system notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="mb-4 flex items-start space-x-4 rounded-md border p-4"
                  >
                    <div className="flex items-center justify-center">
                      <AlertCircle className={
                        alert.type === "error" ? "text-destructive" :
                        alert.type === "warning" ? "text-yellow-500" : "text-blue-500"
                      }/>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">{alert.time}</p>
                    </div>
                    <Button variant="outline" size="sm">Resolve</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Performance metrics and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">CPU Usage</div>
                      <div className="text-sm text-muted-foreground">65%</div>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Memory</div>
                      <div className="text-sm text-muted-foreground">42%</div>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Disk Space</div>
                      <div className="text-sm text-muted-foreground">78%</div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
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
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  