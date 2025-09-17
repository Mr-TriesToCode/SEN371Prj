import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Users } from "lucide-react";
import Link from 'next/link';

export default function TutorDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name}. Manage your students and topics.</p>
      </div>

      <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-accent text-accent-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users />
                  Student Progress
                </CardTitle>
                <CardDescription className="text-accent-foreground/80">
                  Review recent submissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>You have <strong>7</strong> new assignments to grade. <strong>3</strong> are from "Software Engineering for Dummies".</p>
                <Button asChild variant="secondary" className="mt-4 bg-background text-foreground hover:bg-background/80">
                  <Link href="/grading">
                    Start Grading <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot />
                  Create Topics and Materials
                </CardTitle>
                <CardDescription>Create new study material and lesson topics.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Use this functional environment to make interactive lessons and material.</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/topic-generator">
                    Create Topics <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  );
}
