import React from "react";
import SuperAdminReport from "./SuperadminReportPage";
import AdminReport from "./AdminReportPage";
import EmployeeReport from "./EmployeeReportPage";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { userRole } = useAuth();

  if (userRole === "superadmin") return <SuperAdminReport />;
  if (userRole === "admin") return <AdminReport />;
  if (userRole === "employee") return <EmployeeReport />;
  return <div>Role not recognized</div>;
}
