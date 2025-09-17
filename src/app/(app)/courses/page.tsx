'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MOCK_COURSES } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Check, PlusCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export default function CoursesPage() {
  const { toast } = useToast();
  const { role } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const handleEnroll = (courseId: string, courseTitle: string) => {
    if (enrolledCourses.includes(courseId)) return;

    setEnrolledCourses((prev) => [...prev, courseId]);
    toast({
      title: "Successfully Enrolled!",
      description: `You have been enrolled in "${courseTitle}".`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
          <p className="text-muted-foreground mt-2">
            Find your next learning adventure from our curated list of courses.
          </p>
        </div>
        {role === 'tutor' && (
            <Button asChild>
              <Link href="/courses/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Course
              </Link>
            </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_COURSES.map((course) => {
          const courseImage = PlaceHolderImages.find(p => p.id === course.imageId);
          const isEnrolled = enrolledCourses.includes(course.id);
          return (
            <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                {courseImage && (
                  <div className="aspect-video relative w-full">
                    <Image
                      src={courseImage.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                      data-ai-hint={courseImage.imageHint}
                    />
                  </div>
                )}
                 <div className="p-6">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">By {course.tutor}</CardDescription>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow px-6 pb-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6 flex justify-between items-center">
                <Badge variant={course.category === 'Tech' ? 'default' : 'secondary'} className={course.category === 'Tech' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>{course.category}</Badge>
                <Button onClick={() => handleEnroll(course.id, course.title)} disabled={isEnrolled}>
                  {isEnrolled ? <><Check className="mr-2 h-4 w-4" />Enrolled</> : 'Enroll'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
