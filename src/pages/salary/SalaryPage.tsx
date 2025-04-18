import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type SalaryStatus = "Paid" | "Unpaid";

interface SalaryRecord {
  id: number;
  name: string;
  role: "Admin" | "Employee";
  month: string;
  amount: number;
  status: SalaryStatus;
}

const initialSalaries: SalaryRecord[] = [
  { id: 1, name: "Priya Sharma", role: "Admin", month: "April 2025", amount: 80000, status: "Paid" },
  { id: 2, name: "Rahul Verma", role: "Admin", month: "April 2025", amount: 80000, status: "Unpaid" },
  { id: 3, name: "Emily Smith", role: "Employee", month: "April 2025", amount: 50000, status: "Paid" },
  { id: 4, name: "John Doe", role: "Employee", month: "April 2025", amount: 50000, status: "Unpaid" },
];

export default function SalaryPage() {
  const [salaries, setSalaries] = useState(initialSalaries);
  const [roleFilter, setRoleFilter] = useState<"All" | "Admin" | "Employee">("All");
  const [search, setSearch] = useState("");

  const handleToggleStatus = (id: number) => {
    setSalaries((prev) =>
      prev.map((sal) =>
        sal.id === id
          ? { ...sal, status: sal.status === "Paid" ? "Unpaid" : "Paid" }
          : sal
      )
    );
  };

  const filtered = salaries.filter(
    (sal) =>
      (roleFilter === "All" || sal.role === roleFilter) &&
      (sal.name.toLowerCase().includes(search.toLowerCase()) ||
        sal.month.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout userRole={"superadmin"}>
      <div className="max-w-5xl mx-auto py-10 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Salary Management</CardTitle>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                variant={roleFilter === "All" ? "default" : "outline"}
                onClick={() => setRoleFilter("All")}
              >
                All
              </Button>
              <Button
                variant={roleFilter === "Admin" ? "default" : "outline"}
                onClick={() => setRoleFilter("Admin")}
              >
                Admin
              </Button>
              <Button
                variant={roleFilter === "Employee" ? "default" : "outline"}
                onClick={() => setRoleFilter("Employee")}
              >
                Employee
              </Button>
              <Input
                className="ml-auto w-64"
                placeholder="Search by name or month"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Name</th>
                    <th className="py-2 px-4 border-b text-left">Role</th>
                    <th className="py-2 px-4 border-b text-left">Month</th>
                    <th className="py-2 px-4 border-b text-left">Amount</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                    <th className="py-2 px-4 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-muted-foreground">
                        No salary records found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((sal) => (
                      <tr key={sal.id} className="border-b">
                        <td className="py-2 px-4">{sal.name}</td>
                        <td className="py-2 px-4">{sal.role}</td>
                        <td className="py-2 px-4">{sal.month}</td>
                        <td className="py-2 px-4">₹{sal.amount.toLocaleString()}</td>
                        <td className="py-2 px-4">
                          <Badge
                            variant={sal.status === "Paid" ? "default" : "outline"}
                          >
                            {sal.status}
                          </Badge>
                        </td>
                        <td className="py-2 px-4">
                          <Button
                            size="sm"
                            variant={sal.status === "Paid" ? "outline" : "default"}
                            onClick={() => handleToggleStatus(sal.id)}
                          >
                            {sal.status === "Paid" ? "Mark Unpaid" : "Mark Paid"}
                          </Button>
                        </td>
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