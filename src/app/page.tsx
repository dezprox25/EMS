'use client'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashborad";
import EmployeesPage from "@/pages/EmployeesPage";
import AttendancePage from "@/pages/AttendancePage";
import NotFound from "@/pages/NotFound";
import LeaveManagementPage from "@/pages/leaves/LeaveManagementPage";
import ReportsPage from "@/app/report/page";
import ProfilePage from "@/app/profile/page";
import WorkHoursPage from "@/app/workhours/page";
import AnalyticsPage from "@/pages/analytics/AnalyticsPage";
import SalaryPage from "@/pages/salary/SalaryPage";
import AdminsPage from "@/pages/admins/AdminsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admins" element={<AdminsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/leaves" element={<LeaveManagementPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/work-hours" element={<WorkHoursPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/salary" element={<SalaryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
