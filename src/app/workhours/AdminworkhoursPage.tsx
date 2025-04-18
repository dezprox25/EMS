'use client'
import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileText, Save, Play, Pause, Clock } from 'lucide-react';

// Report schema for validation
const reportFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  date: z.string().min(1, { message: "Date is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  file: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

// Mock data for employee reports
const mockReports = [
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

// Helper for formatting duration
function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function AdminReportPage() {
  const { isAuthenticated, userRole } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [reports, setReports] = useState(mockReports);

  // Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer handlers
  const handleStart = () => {
    setTimerActive(true);
    setStartTime(new Date());
    setElapsed(0);
  };

  const handleStop = () => {
    setTimerActive(false);
    setStartTime(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive]);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      file: undefined,
    },
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  function onSubmit(data: ReportFormValues) {
    setReports([
      {
        id: reports.length + 1,
        employee: "Current Admin", // Replace with actual admin name if available
        title: data.title,
        date: data.date,
        description: data.description,
        fileName: data.file?.name || "No file"
      },
      ...reports,
    ]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    form.reset();
  }

  return (
    <DashboardLayout userRole={userRole || "admin"}>
      <div className="max-w-2xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Work Hours Timer
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Start the timer when you begin working and stop it when you finish.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-5xl font-mono">{formatDuration(elapsed)}</div>
              <div className="flex gap-4">
                {!timerActive ? (
                  <Button onClick={handleStart} className="flex items-center gap-2">
                    <Play className="h-4 w-4" /> Start
                  </Button>
                ) : (
                  <Button onClick={handleStop} variant="destructive" className="flex items-center gap-2">
                    <Pause className="h-4 w-4" /> Stop & Save
                  </Button>
                )}
              </div>
              {timerActive && startTime && (
                <div className="text-xs text-muted-foreground">
                  Started at: {startTime.toLocaleTimeString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Report Details Table */}
      <div className="max-w-4xl mx-auto mt-12">
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
                  {reports.map((report) => (
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
              {reports.length === 0 && (
                <div className="text-center text-muted-foreground py-6">
                  No reports submitted yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}