
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MOCK_ASSIGNMENTS } from "@/lib/data";
import { FilePenLine, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AssignmentsPage() {
    const router = useRouter();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending':
                return <Clock className="h-4 w-4 text-orange-500" />;
            case 'Submitted':
                return <CheckCircle className="h-4 w-4 text-blue-500" />;
            case 'Graded':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            default:
                return null;
        }
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'destructive';
            case 'Submitted':
                return 'secondary';
            case 'Graded':
                return 'default';
            default:
                return 'outline';
        }
    }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
          <p className="text-muted-foreground mt-2">
            Keep track of your coursework and deadlines.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[45%]">Assignment</TableHead>
                <TableHead className="w-[25%]">Course</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ASSIGNMENTS.map((assignment) => (
                <TableRow key={assignment.id} onClick={() => router.push(`/assignments/${assignment.id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">{assignment.title}</TableCell>
                  <TableCell className="text-muted-foreground">{assignment.course}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusBadgeVariant(assignment.status)} className="flex items-center justify-center gap-1.5 w-[100px]">
                        {getStatusIcon(assignment.status)}
                        {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{assignment.grade || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
