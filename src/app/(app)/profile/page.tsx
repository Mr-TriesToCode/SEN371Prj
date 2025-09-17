'use client';

import { useAuth, UserRole } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { user, role } = useAuth();
  const userAvatar = PlaceHolderImages.find(p => p.id === `user-avatar-${role}`);

  if (!user) {
    return <div>Loading profile...</div>;
  }
  
  const roleColors: Record<string, string> = {
      student: "bg-blue-500",
      tutor: "bg-orange-500",
      admin: "bg-purple-500",
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>Manage your personal information and settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} />}
              <AvatarFallback className="text-3xl">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge className={`${role && roleColors[role]} text-white`}>{user.role}</Badge>
            </div>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <textarea 
                    id="bio"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us a little about yourself..."
                >
                    A passionate learner and educator, dedicated to exploring the depths of computer science.
                </textarea>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
