'use client'
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';

// Mock data for admin work hours
const adminWorkHours = [
  {
    id: 1,
    admin: "Priya Sharma",
    date: "2025-04-15",
    start: "09:00:00",
    end: "17:30:00",
    duration: "08:30:00"
  },
  {
    id: 2,
    admin: "Rahul Verma",
    date: "2025-04-15",
    start: "10:00:00",
    end: "18:00:00",
    duration: "08:00:00"
  }
];

// Mock data for employee work hours
const employeeWorkHours = [
  {
    id: 1,
    employee: "Emily Smith",
    date: "2025-04-15",
    start: "09:15:00",
    end: "17:45:00",
    duration: "08:30:00"
  },
  {
    id: 2,
    employee: "John Doe",
    date: "2025-04-15",
    start: "10:00:00",
    end: "18:00:00",
    duration: "08:00:00"
  }
];

export default function SuperadminWorkhoursPage() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout userRole={userRole || "superadmin"}>
      <div className="max-w-6xl mx-auto py-10 space-y-12">
        {/* Admin Work Hours Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Admin Work Hours
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              View all admins' work hours below.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Admin</th>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Start Time</th>
                    <th className="py-2 px-4 border-b text-left">End Time</th>
                    <th className="py-2 px-4 border-b text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {adminWorkHours.map((log) => (
                    <tr key={log.id} className="border-b">
                      <td className="py-2 px-4">{log.admin}</td>
                      <td className="py-2 px-4">{log.date}</td>
                      <td className="py-2 px-4">{log.start}</td>
                      <td className="py-2 px-4">{log.end}</td>
                      <td className="py-2 px-4">{log.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {adminWorkHours.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  No admin work hours recorded yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Employee Work Hours Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Employee Work Hours
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              View all employees' work hours below.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Employee</th>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Start Time</th>
                    <th className="py-2 px-4 border-b text-left">End Time</th>
                    <th className="py-2 px-4 border-b text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeWorkHours.map((log) => (
                    <tr key={log.id} className="border-b">
                      <td className="py-2 px-4">{log.employee}</td>
                      <td className="py-2 px-4">{log.date}</td>
                      <td className="py-2 px-4">{log.start}</td>
                      <td className="py-2 px-4">{log.end}</td>
                      <td className="py-2 px-4">{log.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {employeeWorkHours.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  No employee work hours recorded yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}