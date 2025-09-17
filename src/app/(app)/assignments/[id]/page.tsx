
'use client';

import { MOCK_ASSIGNMENTS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, File, X, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AssignmentDetailsPage({ params }: { params: { id: string } }) {
    const { role } = useAuth();
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);

    const findAssignment = () => MOCK_ASSIGNMENTS.find(a => a.id === params.id);
    const [assignment, setAssignment] = useState(findAssignment());

    const [grade, setGrade] = useState(assignment?.grade || '');
    const [feedback, setFeedback] = useState('');


    useEffect(() => {
        setAssignment(findAssignment());
        setGrade(assignment?.grade || '');
    }, [params.id]);

    if (!assignment) {
        return <div>Assignment not found.</div>;
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };
    
    const handleStudentSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            toast({
                title: "No file selected",
                description: "Please select a file to submit.",
                variant: "destructive",
            });
            return;
        }

        const assignmentIndex = MOCK_ASSIGNMENTS.findIndex(a => a.id === params.id);
        if (assignmentIndex !== -1) {
            MOCK_ASSIGNMENTS[assignmentIndex].status = 'Submitted';
            MOCK_ASSIGNMENTS[assignmentIndex].submittedOn = new Date().toLocaleDateString();
            MOCK_ASSIGNMENTS[assignmentIndex].submittedFile = {
                name: file.name,
                url: URL.createObjectURL(file) // In a real app, this would be a URL to cloud storage
            };
        }

        setAssignment(findAssignment());

        toast({
            title: "Submission Successful!",
            description: `Your work for "${assignment.title}" has been submitted.`,
        });
    };

    const handleTutorSubmitGrade = (event: React.FormEvent) => {
        event.preventDefault();
        if (!grade) {
            toast({
                title: "No grade selected",
                description: "Please select a grade for the assignment.",
                variant: "destructive",
            });
            return;
        }

        const assignmentIndex = MOCK_ASSIGNMENTS.findIndex(a => a.id === params.id);
        if (assignmentIndex !== -1) {
            MOCK_ASSIGNMENTS[assignmentIndex].status = 'Graded';
            MOCK_ASSIGNMENTS[assignmentIndex].grade = grade;
            MOCK_ASSIGNMENTS[assignmentIndex].feedback = feedback;
        }

        setAssignment(findAssignment());

        toast({
            title: "Assignment Graded!",
            description: `The grade for "${assignment.title}" has been saved.`,
        });
    }
    
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Pending': return 'destructive';
            case 'Submitted': return 'secondary';
            case 'Graded': return 'default';
            default: return 'outline';
        }
    }

    const renderStudentView = () => (
        <Card>
            <CardHeader>
                <CardTitle>Submit Your Work</CardTitle>
                <CardDescription>Upload your assignment file and add any comments for your tutor.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleStudentSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="file-upload">File Upload</Label>
                        <div className="relative border-2 border-dashed border-muted rounded-lg p-6 flex flex-col justify-center items-center">
                            {file ? (
                                <div className="flex flex-col items-center gap-2">
                                    <File className="h-10 w-10 text-primary" />
                                    <span className="text-sm font-medium text-center">{file.name}</span>
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground" onClick={handleRemoveFile}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Drag & drop your file here, or click to browse.
                                    </p>
                                    <Input 
                                        id="file-upload" 
                                        type="file" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                        disabled={assignment.status !== 'Pending'}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comments">Comments (Optional)</Label>
                        <Textarea id="comments" placeholder="Add any notes for your tutor..." disabled={assignment.status !== 'Pending'}/>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={!file || assignment.status !== 'Pending'}>
                            {assignment.status === 'Pending' ? 'Submit Assignment' : 'Submitted'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );

    const renderTutorView = () => (
        <div className="space-y-6">
            {(assignment.status === 'Submitted' || assignment.status === 'Graded') && assignment.submittedFile && (
                <Card>
                    <CardHeader>
                        <CardTitle>Student Submission</CardTitle>
                        <CardDescription>Submitted on {assignment.submittedOn}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <a href={assignment.submittedFile.url} download={assignment.submittedFile.name}>
                            <Button variant="outline" className="w-full">
                                <Download className="mr-2 h-4 w-4"/>
                                Download {assignment.submittedFile.name}
                            </Button>
                        </a>
                    </CardContent>
                </Card>
            )}
             <Card>
                <CardHeader>
                    <CardTitle>Grade Assignment</CardTitle>
                    <CardDescription>Provide a grade and feedback for this submission.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleTutorSubmitGrade} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="grade">Grade</Label>
                             <Select onValueChange={setGrade} value={grade} disabled={assignment.status === 'Graded'}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A">A</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B">B</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="C+">C+</SelectItem>
                                    <SelectItem value="C">C</SelectItem>
                                    <SelectItem value="C-">C-</SelectItem>
                                    <SelectItem value="D">D</SelectItem>
                                    <SelectItem value="F">F</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea 
                                id="feedback"
                                placeholder="Provide constructive feedback for the student..." 
                                className="min-h-[150px]"
                                value={feedback || assignment.feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                disabled={assignment.status === 'Graded'}
                            />
                        </div>
                         <div className="flex justify-end">
                            <Button type="submit" disabled={!grade || assignment.status === 'Graded'}>
                                {assignment.status === 'Graded' ? 'Graded' : 'Submit Grade'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-bold">{assignment.title}</CardTitle>
                            <CardDescription className="mt-2">
                                <span className="font-semibold">Course:</span> {assignment.course} <br />
                                <span className="font-semibold">Due:</span> {assignment.dueDate}
                            </CardDescription>
                        </div>
                        <Badge variant={getStatusBadgeVariant(assignment.status)}>{assignment.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{assignment.description}</p>
                </CardContent>
            </Card>

            {role === 'student' && renderStudentView()}
            {role === 'tutor' && renderTutorView()}
        </div>
    )
}
