
'use client'
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  UserCircle, 
  Users, 
  Calendar, 
  FileText, 
  Clock, 
  BarChart, 
  FileCheck, 
  Shield, 
  LogOut, 
  Menu,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { useState } from "react";

interface SidebarNavProps {
  userRole: UserRole;
}

export function SidebarNav({ userRole }: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Define navigation items based on user role
  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home, roles: ["superadmin", "admin", "employee"] },
    { name: "Profile", href: "/profile", icon: UserCircle, roles: ["superadmin", "admin", "employee"] },
    { name: "Admins", href: "/admins", icon: Shield, roles: ["superadmin"] },
    { name: "Employees", href: "/employees", icon: Users, roles: ["superadmin", "admin"] },
    { name: "Attendance", href: "/attendance", icon: Calendar, roles: ["superadmin", "admin", "employee"] },
    { name: "Leave Management", href: "/leaves", icon: Calendar, roles: ["superadmin", "admin", "employee"] },
    { name: "Reports", href: "/reports", icon: FileText, roles: ["superadmin", "admin", "employee"] },
    { name: "Work Hours", href: "/work-hours", icon: Clock, roles: ["superadmin", "admin", "employee"] },
    { name: "Analytics", href: "/analytics", icon: BarChart, roles: ["superadmin"] },
    { name: "Salary", href: "/salary", icon: FileCheck, roles: ["superadmin"] },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-sidebar-border text-sidebar-foreground transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="font-bold text-xl text-sidebar-foreground">
            EmpowrHR
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 py-4 overflow-auto">
        <nav className="px-2 space-y-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
            >
              <item.icon className={cn("h-5 w-5 mr-3", collapsed && "mr-0")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/logout"
          className="flex items-center p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className={cn("h-5 w-5 mr-3", collapsed && "mr-0")} />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
