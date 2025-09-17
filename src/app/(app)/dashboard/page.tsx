'use client';

import AdminDashboard from '@/components/dashboard/admin-dashboard';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import TutorDashboard from '@/components/dashboard/tutor-dashboard';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { role, user } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'tutor':
        return <TutorDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      default:
        return (
          <div>
            <Skeleton className="h-8 w-1/4 mb-4" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderDashboard()}
    </div>
  );
}
