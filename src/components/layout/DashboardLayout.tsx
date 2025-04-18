
import { ReactNode } from "react";
import { SidebarNav } from "./SideBarNav";
import { Header } from "./Header";
import { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: UserRole;
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  // Hardcoded user name for demo purposes - would come from auth context in real app
  const userName = "John Doe";

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav userRole={userRole} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header userName={userName} userRole={userRole} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
