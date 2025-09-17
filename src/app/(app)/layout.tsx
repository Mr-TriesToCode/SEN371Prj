'use client';

import { AuthProvider, useAuth } from '@/hooks/use-auth.tsx';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { BookOpen, User, LayoutDashboard, MessageSquare, GraduationCap, Settings, LogOut, FileText, Bot, CheckSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthLoading, role, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['student', 'tutor', 'admin'] },
    { href: '/courses', icon: GraduationCap, label: 'Courses', roles: ['student', 'tutor', 'admin'] },
    { href: '/assignments', icon: FileText, label: 'Assignments', roles: ['student'] },
    { href: '/forum', icon: MessageSquare, label: 'Forum', roles: ['student', 'tutor', 'admin'] },
    { href: '/profile', icon: User, label: 'Profile', roles: ['student', 'tutor', 'admin'] },
  ];

  const tutorNav = [
    { href: '/topic-generator', icon: Bot, label: 'Topic Generator', roles: ['tutor'] },
    { href: '/grading', icon: CheckSquare, label: 'Grading', roles: ['tutor'] }
  ]

  const adminNav = [
     { href: '/users', icon: User, label: 'Users', roles: ['admin'] },
     { href: '/reports', icon: FileText, label: 'Reports', roles: ['admin'] },
  ]
  
  if (isAuthLoading || !isAuthenticated) {
    return (
        <div className="flex h-screen w-full items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-8">
                <Skeleton className="h-12 w-1/3" />
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        </div>
    );
  }
  
  const userAvatar = PlaceHolderImages.find(p => p.id === `user-avatar-${role}`);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text" />
            <span className="text-xl font-bold tracking-tight text-gray-900">CampusLearn</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.filter(item => item.roles.includes(role!)).map(item => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton asChild tooltip={item.label} isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}>
                    <div>
                        <item.icon />
                        <span>{item.label}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            {role === 'tutor' && tutorNav.map(item => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref>
                      <SidebarMenuButton asChild tooltip={item.label} isActive={pathname.startsWith(item.href)}>
                        <div>
                            <item.icon />
                            <span>{item.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
             {role === 'admin' && adminNav.map(item => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref>
                      <SidebarMenuButton asChild tooltip={item.label} isActive={pathname.startsWith(item.href)}>
                        <div>
                            <item.icon />
                            <span>{item.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton onClick={() => { logout(); router.push('/'); }}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
                {/* Potentially breadcrumbs or page title */}
            </div>
             <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user?.name} />}
                <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </AuthProvider>
    );
}
