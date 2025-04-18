
export type UserRole = "superadmin" | "admin" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  joiningDate?: string;
  status: "active" | "inactive";
  profileImage?: string;
}

export interface Attendance {
  id: string;
  userId: string;
  checkIn: string;
  checkOut?: string;
  totalHours?: number;
  status: "present" | "absent" | "late";
  date: string;
}

export interface Leave {
  id: string;
  userId: string;
  userName?: string; // For display purposes
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export interface Report {
  id: string;
  userId: string;
  userName?: string; // For display purposes
  reportType: "daily" | "weekly" | "monthly";
  content: string;
  submittedAt: string;
}

export interface WorkLog {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  totalHours?: number;
  date: string;
  isActive: boolean;
}

export interface Certificate {
  id: string;
  userId: string;
  type: "experience" | "salary";
  generatedAt: string;
  url: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  pendingLeaves: number;
  todayCheckins: number;
}
