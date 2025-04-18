
// import { useAuth } from "@/contexts/AuthContext";
// import { DashboardLayout } from "@/components/layout/DashboardLayout";
// import SuperAdminDashboard from "./dashborad/SuperAdminDashborad";
// import AdminDashboard from "./dashborad/AdminDashborad";
// import EmployeeDashboard from "./dashborad/EmployeeDashborad";
// import { Navigate } from "react-router-dom";

// export default function Dashboard() {
//   const { isAuthenticated, userRole } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Render the appropriate dashboard based on user role
//   const renderDashboard = () => {
//     switch (userRole) {
//       case "superadmin":
//         return <SuperAdminDashboard />;
//       case "admin":
//         return <AdminDashboard />;
//       case "employee":
//         return <EmployeeDashboard />;
//       default:
//         return <Navigate to="/login" replace />;
//     }
//   };

//   return (
//     <DashboardLayout userRole={userRole || "employee"}>
//       {renderDashboard()}
//     </DashboardLayout>
//   );
// }



import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import SuperAdminDashboard from "./dashborad/SuperAdminDashborad";
import AdminDashboard from "./dashborad/AdminDashborad";
import EmployeeDashboard from "./dashborad/EmployeeDashborad";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  let dashboardContent;
  if (userRole === "superadmin") dashboardContent = <SuperAdminDashboard />;
  else if (userRole === "admin") dashboardContent = <AdminDashboard />;
  else if (userRole === "employee") dashboardContent = <EmployeeDashboard />;
  else dashboardContent = <div>Role not recognized</div>;

  return (
    <DashboardLayout userRole={userRole || "employee"}>
      {dashboardContent}
    </DashboardLayout>
  );
}

