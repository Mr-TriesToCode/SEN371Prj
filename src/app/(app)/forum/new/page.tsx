
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { MOCK_FORUM_THREADS } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function NewTopicPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !message) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all fields to create a topic.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
        toast({
            title: 'Authentication Error',
            description: 'You must be logged in to create a topic.',
            variant: 'destructive',
        });
        return;
    }

    const newTopic = {
      id: `thread-${Date.now()}`,
      title,
      author: { name: user.name, avatarUrl: `https://picsum.photos/seed/${user.name}/40/40` },
      category,
      replies: 0,
      views: 0,
      lastActivity: { time: 'Just now', user: user.name },
    };

    MOCK_FORUM_THREADS.unshift(newTopic);

    toast({
      title: 'Topic Created!',
      description: 'Your new topic has been added to the forum.',
    });

    router.push('/forum');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Topic</CardTitle>
          <CardDescription>Start a new discussion and share your thoughts with the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input id="title" placeholder="Enter a descriptive title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., React, Python, General" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea id="message" placeholder="Write your message here..." className="min-h-[200px]" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">Create Topic</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
