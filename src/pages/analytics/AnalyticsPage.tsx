import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#F9A602"];

const workData = [
  { name: "Admins", daysWorked: 22, leaves: 2, paidLeaves: 1, unpaidLeaves: 1, salaryPaid: 5, salaryUnpaid: 0, performance: 88 },
  { name: "Employees", daysWorked: 20, leaves: 3, paidLeaves: 2, unpaidLeaves: 1, salaryPaid: 15, salaryUnpaid: 1, performance: 76 },
];

const salaryData = [
  { name: "Paid", value: 20 },
  { name: "Unpaid", value: 1 },
];

const performanceData = [
  { name: "Admins", performance: 88 },
  { name: "Employees", performance: 76 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout userRole={"superadmin"}>
      <div className="max-w-6xl mx-auto py-10 space-y-8">
        <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Days Worked & Leaves */}
          <Card>
            <CardHeader>
              <CardTitle>Days Worked & Leaves</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="daysWorked" fill="#0088FE" name="Days Worked" />
                  <Bar dataKey="leaves" fill="#FF8042" name="Total Leaves" />
                  <Bar dataKey="paidLeaves" fill="#00C49F" name="Paid Leaves" />
                  <Bar dataKey="unpaidLeaves" fill="#FFBB28" name="Unpaid Leaves" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Salary Paid/Unpaid Pie */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={salaryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        {/* Performance Line Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="performance" stroke="#845EC2" name="Performance (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>Summary Details</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Role</th>
                    <th className="py-2 px-4 border-b text-left">Days Worked</th>
                    <th className="py-2 px-4 border-b text-left">Paid Leaves</th>
                    <th className="py-2 px-4 border-b text-left">Unpaid Leaves</th>
                    <th className="py-2 px-4 border-b text-left">Salary Paid</th>
                    <th className="py-2 px-4 border-b text-left">Salary Unpaid</th>
                    <th className="py-2 px-4 border-b text-left">Performance (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {workData.map((row, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4">{row.name}</td>
                      <td className="py-2 px-4">{row.daysWorked}</td>
                      <td className="py-2 px-4">{row.paidLeaves}</td>
                      <td className="py-2 px-4">{row.unpaidLeaves}</td>
                      <td className="py-2 px-4">{row.salaryPaid}</td>
                      <td className="py-2 px-4">{row.salaryUnpaid}</td>
                      <td className="py-2 px-4">{row.performance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}