'use client'

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  XCircle,
  Play,
  Pause,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EmployeeDashboard() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  // Format seconds into HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };
  
  // Toggle timer
  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };
  
  // Reset timer
  const resetTimer = () => {
    setIsTimerActive(false);
    setTimerSeconds(0);
  };
  
  // Demo data
  const attendanceHistory = [
    { date: "2023-05-01", status: "present", checkIn: "09:00 AM", checkOut: "05:30 PM", workHours: "8h 30m" },
    { date: "2023-05-02", status: "present", checkIn: "08:45 AM", checkOut: "05:15 PM", workHours: "8h 30m" },
    { date: "2023-05-03", status: "late", checkIn: "10:15 AM", checkOut: "06:30 PM", workHours: "8h 15m" },
    { date: "2023-05-04", status: "present", checkIn: "08:55 AM", checkOut: "05:30 PM", workHours: "8h 35m" },
    { date: "2023-05-05", status: "absent", checkIn: "-", checkOut: "-", workHours: "-" },
  ];
  
  const upcomingLeaves = [
    { id: 1, status: "approved", type: "Vacation", startDate: "2023-06-15", endDate: "2023-06-20" },
    { id: 2, status: "pending", type: "Personal", startDate: "2023-07-05", endDate: "2023-07-06" },
  ];
  
  const reports = [
    { id: 1, title: "Weekly Status Report", date: "2023-04-28", status: "submitted" },
    { id: 2, title: "Project XYZ Update", date: "2023-04-21", status: "submitted" },
    { id: 3, title: "Monthly Performance Review", date: "2023-04-30", status: "pending" },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Employee Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's your personal workspace.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Status"
          value="Present"
          icon={<CheckCircle2 className="h-5 w-5" />}
          description="Checked in at 09:05 AM"
        />
        <StatCard
          title="This Week"
          value="38.5h"
          icon={<Clock className="h-5 w-5" />}
          description="Weekly target: 40h"
        />
        <StatCard
          title="Upcoming Leave"
          value="5 days"
          icon={<Calendar className="h-5 w-5" />}
          description="June 15 - June 20"
        />
        <StatCard
          title="Pending Reports"
          value="1"
          icon={<FileText className="h-5 w-5" />}
          description="Due in 2 days"
        />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Work Hour Timer</CardTitle>
            <CardDescription>Track your working hours in real-time</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="text-5xl font-bold tracking-tighter">
              {formatTime(timerSeconds)}
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={toggleTimer}
                className={isTimerActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
              >
                {isTimerActive ? (
                  <><Pause className="mr-2 h-4 w-4" /> Pause</>
                ) : (
                  <><Play className="mr-2 h-4 w-4" /> Start</>
                )}
              </Button>
              <Button variant="outline" onClick={resetTimer}>Reset</Button>
            </div>
            <div className="w-full mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Today's Progress</span>
                <span>
                  {Math.round((timerSeconds / (8 * 60 * 60)) * 100)}% of daily target
                </span>
              </div>
              <Progress value={(timerSeconds / (8 * 60 * 60)) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-brand-purple hover:bg-brand-darkPurple">
              <Calendar className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
            <Button className="w-full bg-brand-purple hover:bg-brand-darkPurple">
              <FileText className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
            <Button className="w-full bg-brand-purple hover:bg-brand-darkPurple">
              <Calendar className="mr-2 h-4 w-4" />
              Apply for Leave
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="attendance">
        <TabsList>
          <TabsTrigger value="attendance">Attendance History</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="reports">My Reports</TabsTrigger>
          <TabsTrigger value="stats">Work Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Your attendance log for the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Working Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            day.status === "present" ? "default" : 
                            day.status === "late" ? "outline" : "secondary"
                          }
                          className={day.status === "late" ? "border-yellow-500 text-yellow-500" : ""}
                        >
                          {day.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{day.checkIn}</TableCell>
                      <TableCell>{day.checkOut}</TableCell>
                      <TableCell>{day.workHours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Full History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>Your upcoming and past leave requests</CardDescription>
                </div>
                <Button>New Request</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLeaves.map((leave) => (
                  <div
                    key={leave.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div>
                      <h4 className="font-medium">{leave.type} Leave</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={leave.status === "approved" ? "default" : "outline"}>
                      {leave.status}
                    </Badge>
                  </div>
                ))}
                
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Leave Balance</h3>
                    <span className="text-sm text-muted-foreground">2023</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Annual Leave</span>
                      <span className="text-sm">15 days remaining (out of 20)</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm">Sick Leave</span>
                      <span className="text-sm">8 days remaining (out of 10)</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Reports</CardTitle>
                  <CardDescription>Track and submit your work reports</CardDescription>
                </div>
                <Button>New Report</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "submitted" ? "default" : "outline"}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {report.status === "pending" ? (
                          <Button size="sm">Submit</Button>
                        ) : (
                          <Button variant="outline" size="sm">View</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Work Statistics</CardTitle>
              <CardDescription>Your performance metrics and work patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Weekly Work Hours</h4>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {[35, 38, 40, 36, 38, 20, 0].map((hours, i) => (
                      <div key={i} className="relative flex-1">
                        <div 
                          className="bg-brand-purple rounded-sm" 
                          style={{ height: `${(hours / 40) * 100}%` }}
                        ></div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-8">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold">38.5h</h4>
                      <p className="text-xs text-muted-foreground">This Week</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold">40.2h</h4>
                      <p className="text-xs text-muted-foreground">Last Week</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold">39.8h</h4>
                      <p className="text-xs text-muted-foreground">Average</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-4">Punctuality Score</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full border-8 border-brand-purple flex items-center justify-center">
                      <span className="text-xl font-bold">95%</span>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>On Time</span>
                          <span>19 days</span>
                        </div>
                        <Progress value={95} className="h-1.5" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Late</span>
                          <span>1 day</span>
                        </div>
                        <Progress value={5} className="h-1.5 bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}