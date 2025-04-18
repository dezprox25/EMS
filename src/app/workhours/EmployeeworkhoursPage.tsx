'use client'
import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play, Pause, Save } from 'lucide-react';

// Helper function to format seconds as HH:mm:ss
function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

type WorkLog = {
  date: string;
  start: string;
  end: string;
  duration: string;
};

export default function EmployeeWorkHoursPage() {
  const { isAuthenticated, userRole } = useAuth();
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start Timer
  const handleStart = () => {
    setStartTime(new Date());
    setElapsed(0);
    setTimerActive(true);
  };

  // Stop Timer and save log
  const handleStop = () => {
    if (startTime) {
      const endTime = new Date();
      const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      const log: WorkLog = {
        date: startTime.toLocaleDateString(),
        start: startTime.toLocaleTimeString(),
        end: endTime.toLocaleTimeString(),
        duration: formatDuration(durationSeconds),
      };
      setWorkLogs([log, ...workLogs]);
    }
    setTimerActive(false);
    setElapsed(0);
    setStartTime(null);
  };

  // Timer effect
  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout userRole={userRole || "employee"}>
      <div className="max-w-2xl mx-auto py-10 space-y-10">
        {/* Timer Card */}
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

        {/* Work Log Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Past Work Sessions
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              View your previous working sessions below.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Start Time</th>
                    <th className="py-2 px-4 border-b text-left">End Time</th>
                    <th className="py-2 px-4 border-b text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {workLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center text-muted-foreground py-6">
                        No work sessions recorded yet.
                      </td>
                    </tr>
                  ) : (
                    workLogs.map((log, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 px-4">{log.date}</td>
                        <td className="py-2 px-4">{log.start}</td>
                        <td className="py-2 px-4">{log.end}</td>
                        <td className="py-2 px-4">{log.duration}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}