
'use client'
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, MoreHorizontal, Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define employee type
interface Employee {
  id: string; 
  name: string; 
  email: string; 
  department: string; 
  position: string;
  joiningDate: string;
  status: "active" | "inactive";
}

// Demo data
const employeesData: Employee[] = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john.doe@example.com", 
    department: "Engineering", 
    position: "Senior Developer",
    joiningDate: "2021-03-15",
    status: "active"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    department: "Design", 
    position: "UX Designer",
    joiningDate: "2022-01-10",
    status: "active"
  },
  { 
    id: "3", 
    name: "Robert Johnson", 
    email: "robert.johnson@example.com", 
    department: "Marketing", 
    position: "Marketing Manager",
    joiningDate: "2020-11-05",
    status: "active"
  },
  { 
    id: "4", 
    name: "Emily Davis", 
    email: "emily.davis@example.com", 
    department: "HR", 
    position: "HR Specialist",
    joiningDate: "2022-04-20",
    status: "inactive"
  },
  { 
    id: "5", 
    name: "Michael Wilson", 
    email: "michael.wilson@example.com", 
    department: "Finance", 
    position: "Financial Analyst",
    joiningDate: "2021-07-12",
    status: "active"
  },
];

const departments = [
  "All Departments",
  "Engineering",
  "Design",
  "Marketing",
  "HR",
  "Finance",
  "Operations",
];

// Form schema for adding/editing employees
const employeeFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  department: z.string().min(1, {
    message: "Please select a department.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  joiningDate: z.string(),
  status: z.enum(["active", "inactive"]),
});

export default function EmployeesPage() {
  const { isAuthenticated, userRole } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // If not authenticated or not admin/superadmin, redirect to login
  if (!isAuthenticated || (userRole !== "admin" && userRole !== "superadmin")) {
    return <Navigate to="/login" replace />;
  }

  // Set up form for adding/editing employees
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: editingEmployee ? {
      name: editingEmployee.name,
      email: editingEmployee.email,
      department: editingEmployee.department,
      position: editingEmployee.position,
      joiningDate: editingEmployee.joiningDate,
      status: editingEmployee.status
    } : {
      name: "",
      email: "",
      department: "",
      position: "",
      joiningDate: new Date().toISOString().split('T')[0],
      status: "active"
    },
  });

  // Filter employees based on search query and department
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === "All Departments" || 
      employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof employeeFormSchema>) {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { 
          ...emp, 
          name: values.name,
          email: values.email,
          department: values.department,
          position: values.position,
          joiningDate: values.joiningDate,
          status: values.status
        } : emp
      ));
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: (employees.length + 1).toString(),
        name: values.name,
        email: values.email,
        department: values.department,
        position: values.position,
        joiningDate: values.joiningDate,
        status: values.status
      };
      setEmployees([...employees, newEmployee]);
    }
    
    setIsDialogOpen(false);
    setEditingEmployee(null);
    form.reset();
  }

  // Handle edit employee
  const handleEditEmployee = (employee: typeof employeesData[0]) => {
    setEditingEmployee(employee);
    form.reset(employee);
    setIsDialogOpen(true);
  };

  // Handle delete employee
  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <DashboardLayout userRole={userRole || "admin"}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employee Management</h2>
          <p className="text-muted-foreground">Manage your organization's employees</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingEmployee ? "Edit Employee" : "Add New Employee"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingEmployee 
                      ? "Update employee information in the form below."
                      : "Fill in the information below to add a new employee."}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                              <Select 
                                value={field.value} 
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                  {departments.slice(1).map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                      {dept}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Software Developer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="joiningDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Joining Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <Select 
                                value={field.value} 
                                onValueChange={field.onChange as (value: string) => void}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">
                        {editingEmployee ? "Update Employee" : "Add Employee"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Employees</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <EmployeeList 
              employees={filteredEmployees} 
              onEdit={handleEditEmployee} 
              onDelete={handleDeleteEmployee} 
            />
          </TabsContent>
          
          <TabsContent value="active">
            <EmployeeList 
              employees={filteredEmployees.filter(emp => emp.status === "active")} 
              onEdit={handleEditEmployee} 
              onDelete={handleDeleteEmployee} 
            />
          </TabsContent>
          
          <TabsContent value="inactive">
            <EmployeeList 
              employees={filteredEmployees.filter(emp => emp.status === "inactive")} 
              onEdit={handleEditEmployee} 
              onDelete={handleDeleteEmployee} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

function EmployeeList({ employees, onEdit, onDelete }: EmployeeListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No employees found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    {new Date(employee.joiningDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(employee)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.location.href = `/employees/${employee.id}`}
                        >
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(employee.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
