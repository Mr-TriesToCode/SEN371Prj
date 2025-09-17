'use client';

import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthProvider, useAuth, UserRole } from '@/hooks/use-auth';

function LoginPageContent() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (role: UserRole) => {
    login(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 font-body">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 bg-gradient-to-r from-[#760078] to-[#BDBDBD] text-transparent bg-clip-text" />
              <span className="text-xl font-bold tracking-tight text-gray-900">CampusLearn</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen items-center justify-center pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl border-0 rounded-3xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-extrabold">Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 sm:space-y-5">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-semibold">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                        <Input id="email" type="email" placeholder="you@example.com" className="pl-12 py-3 rounded-lg border border-blue-300 focus:border-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-lg font-semibold">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-12 pr-12 py-3 rounded-lg border border-blue-300 focus:border-blue-500" />
                        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 text-blue-600 hover:text-blue-800" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded-lg" onClick={() => handleLogin('student')}>
                    Sign In (as Student)
                  </Button>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-blue-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-3 text-blue-600 font-semibold">Or continue with demo</span>
                    </div>
                  </div>
                  <div className="p-5 bg-blue-50 rounded-xl">
                    <p className="text-sm text-center text-blue-700 mb-4 font-semibold">Select a role to explore:</p>
                    <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" className="border-blue-600 hover:bg-blue-100 text-blue-700 font-semibold" onClick={() => handleLogin('student')}>
                            Student
                        </Button>
                        <Button variant="outline" className="border-orange-600 hover:bg-orange-100 text-orange-700 font-semibold" onClick={() => handleLogin('tutor')}>
                            Tutor
                        </Button>
                        <Button variant="outline" className="border-purple-600 hover:bg-purple-100 text-purple-700 font-semibold" onClick={() => handleLogin('admin')}>
                            Admin
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginPageContent />
        </AuthProvider>
    )
}
