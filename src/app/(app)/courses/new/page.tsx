
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { MOCK_COURSES } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function NewCoursePage() {
  const router = useRouter();
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  if (role !== 'tutor') {
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">You do not have permission to access this page.</p>
        </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !description) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all fields to create a course.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
        toast({
            title: 'Authentication Error',
            description: 'You must be logged in to create a course.',
            variant: 'destructive',
        });
        return;
    }

    const newCourse = {
      id: `course-${Date.now()}`,
      title,
      description,
      tutor: user.name,
      category,
      imageId: `course-new-${Math.floor(Math.random() * 3) + 1}`,
    };

    MOCK_COURSES.unshift(newCourse);

    toast({
      title: 'Course Created!',
      description: `The course "${title}" has been successfully created.`,
    });

    router.push('/courses');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Course</CardTitle>
          <CardDescription>Fill out the details below to add a new course to the catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" placeholder="e.g., Introduction to Quantum Physics" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Tech, Design, Humanities" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea id="description" placeholder="Provide a detailed description of the course..." className="min-h-[150px]" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">Create Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
