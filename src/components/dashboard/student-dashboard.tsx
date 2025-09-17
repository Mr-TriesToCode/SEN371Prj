import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, FileText } from "lucide-react";
import Link from 'next/link';

export default function StudentDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Hello, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Ready to start coding? Here's a quick overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <GraduationCap className="h-6 w-6" />
              Enrolled Courses
            </CardTitle>
            <CardDescription className="text-blue-100">Continue your IT journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-blue-50">You are enrolled in <strong className="text-white">4</strong> courses. Your next class is "Advanced JavaScript" at 2 PM.</p>
            <Button asChild variant="secondary" className="mt-6 bg-white text-blue-700 hover:bg-blue-50 font-semibold">
              <Link href="/courses">
                Go to Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
              <FileText className="h-6 w-6 text-green-600" />
              Recent Assignments
            </CardTitle>
            <CardDescription className="text-gray-600">Stay on top of your deadlines.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">You have <strong className="text-green-600">2</strong> assignments due this week. The "Software Engineering Project" is due tomorrow.</p>
            <Button asChild variant="outline" className="mt-6 border-green-600 text-green-700 hover:bg-green-50 font-semibold">
              <Link href="/assignments">
                View Assignments <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
              <FileText className="h-6 w-6 text-purple-600" />
              Additional Resources & Material
            </CardTitle>
            <CardDescription className="text-gray-600">Access additional learning materials.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Explore <strong className="text-purple-600">15</strong> new resources uploaded this week.</p>
            <Button asChild variant="outline" className="mt-6 border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold">
              <Link href="/resources">
                Browse Resources <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
