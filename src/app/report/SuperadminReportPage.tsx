'use client'
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';

// Mock data for admin and employee reports
const adminReports = [
  {
    id: 1,
    admin: "Priya Sharma",
    title: "Monthly Summary",
    date: "2025-04-10",
    description: "Summary of admin activities for April.",
    fileName: "admin_april_summary.pdf"
  },
  {
    id: 2,
    admin: "Rahul Verma",
    title: "Incident Report",
    date: "2025-04-05",
    description: "Reported a system downtime incident.",
    fileName: "incident_apr5.docx"
  }
];

const employeeReports = [
  {
    id: 1,
    employee: "Emily Smith",
    title: "Weekly Progress",
    date: "2025-04-15",
    description: "Completed the frontend dashboard and started API integration.",
    fileName: "progress_week15.pdf"
  },
  {
    id: 2,
    employee: "John Doe",
    title: "Bug Report",
    date: "2025-04-14",
    description: "Identified and fixed login page validation bug.",
    fileName: "login_bug_report.docx"
  }
];

export default function SuperadminReportPage() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout userRole={userRole || "superadmin"}>
      <div className="max-w-6xl mx-auto py-10 space-y-12">
        {/* Admin Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Admin Reports
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Review all submitted admin reports below.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Admin</th>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Description</th>
                    <th className="py-2 px-4 border-b text-left">File</th>
                  </tr>
                </thead>
                <tbody>
                  {adminReports.map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="py-2 px-4">{report.admin}</td>
                      <td className="py-2 px-4">{report.title}</td>
                      <td className="py-2 px-4">{report.date}</td>
                      <td className="py-2 px-4 max-w-xs truncate" title={report.description}>{report.description}</td>
                      <td className="py-2 px-4">{report.fileName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {adminReports.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  No admin reports submitted yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Employee Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Employee Reports
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Review all submitted employee reports below.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Employee</th>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Description</th>
                    <th className="py-2 px-4 border-b text-left">File</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeReports.map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="py-2 px-4">{report.employee}</td>
                      <td className="py-2 px-4">{report.title}</td>
                      <td className="py-2 px-4">{report.date}</td>
                      <td className="py-2 px-4 max-w-xs truncate" title={report.description}>{report.description}</td>
                      <td className="py-2 px-4">{report.fileName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {employeeReports.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  No employee reports submitted yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}