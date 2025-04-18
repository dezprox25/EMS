import React from "react";
import SuperAdminProfile from "./SuperadminprofilePage";
import AdminProfile from "./AdminProfilePage";
import EmployeeProfile from "./EmployeeProfilePage";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { userRole } = useAuth();

  if (userRole === "superadmin") return <SuperAdminProfile />;
  if (userRole === "admin") return <AdminProfile />;
  if (userRole === "employee") return <EmployeeProfile />;
  return <div>Role not recognized</div>;
}
