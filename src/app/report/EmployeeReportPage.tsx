'use client'
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileText, Calendar, UploadCloud, Save } from 'lucide-react';

// Report schema for validation
const reportFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  date: z.string().min(1, { message: "Date is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  file: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

export default function ReportSubmissionPage() {
  const { isAuthenticated, userRole } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      file: undefined,
    },
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  function onSubmit(data: ReportFormValues) {
    // Here you would typically send the data to your backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    form.reset();
  }

  return (
    <DashboardLayout userRole={userRole || "employee"}>
      <div className="max-w-2xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submit Employee Report
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Fill out the form below to submit your report. All fields marked with * are required.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter report title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Date *</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your report in detail"
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attach File (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={e => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Submit Report
                  </Button>
                </div>
                {submitted && (
                  <div className="text-green-600 font-medium mt-2">
                    Report submitted successfully!
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}