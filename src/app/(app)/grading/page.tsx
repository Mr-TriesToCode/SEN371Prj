
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_ASSIGNMENTS } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function GradingPage() {
    const router = useRouter();

    const assignmentsToGrade = MOCK_ASSIGNMENTS.filter(a => a.status === 'Submitted' || a.status === 'Graded');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Grading Center</h1>
                    <p className="text-muted-foreground mt-2">
                        Review and grade student submissions.
                    </p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40%]">Assignment</TableHead>
                                <TableHead className="w-[30%]">Course</TableHead>
                                <TableHead>Submitted On</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignmentsToGrade.length > 0 ? (
                                assignmentsToGrade.map((assignment) => (
                                    <TableRow key={assignment.id}>
                                        <TableCell className="font-medium">{assignment.title}</TableCell>
                                        <TableCell className="text-muted-foreground">{assignment.course}</TableCell>
                                        <TableCell>{assignment.submittedOn || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => router.push(`/assignments/${assignment.id}`)}>
                                                {assignment.status === 'Graded' ? 'View Grade' : 'Grade'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        No assignments are currently waiting for grading.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

    