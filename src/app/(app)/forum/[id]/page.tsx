
'use client';

import { useState, useEffect } from 'react';
import { MOCK_FORUM_THREADS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Reply = {
    id: string;
    author: { name: string; avatarUrl: string; };
    timestamp: string;
    content: string;
};

export default function ForumTopicPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();
    
    // Find the initial thread, and use state to manage it so we can add replies
    const findThread = () => MOCK_FORUM_THREADS.find(thread => thread.id === params.id);
    const [thread, setThread] = useState(findThread());
    const [newReply, setNewReply] = useState('');

    useEffect(() => {
        // This effect ensures that if the underlying mock data changes for any reason (e.g. navigation),
        // the component reflects the correct thread.
        setThread(findThread());
    }, [params.id]);


    if (!thread) {
        return <div>Topic not found.</div>;
    }

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReply.trim() || !user) {
            toast({
                title: 'Error',
                description: 'You must be logged in and write a message to reply.',
                variant: 'destructive',
            });
            return;
        }

        const reply: Reply = {
            id: `reply-${thread.id}-${Date.now()}`,
            author: { name: user.name, avatarUrl: `https://picsum.photos/seed/${user.name}/40/40` },
            timestamp: 'Just now',
            content: newReply,
        };
        
        // Find the thread in the master list and update it.
        const threadIndex = MOCK_FORUM_THREADS.findIndex(t => t.id === thread.id);
        if (threadIndex !== -1) {
            const currentThread = MOCK_FORUM_THREADS[threadIndex];
            const updatedReplies = [...(currentThread.threadReplies || []), reply];
            
            currentThread.threadReplies = updatedReplies;
            currentThread.replies = updatedReplies.length;
            currentThread.lastActivity = { time: 'Just now', user: user.name };
        }

        // Update local state by re-fetching the (now updated) thread from the master list
        setThread(findThread());

        setNewReply('');
        toast({
            title: 'Reply Posted!',
            description: 'Your reply has been added to the discussion.',
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Forum
                </Button>
            </div>

            {/* Original Post */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold">{thread.title}</CardTitle>
                            <CardDescription className="mt-2">
                                <Badge variant="secondary">{thread.category}</Badge>
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>by {thread.author.name}</span>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={thread.author.avatarUrl} alt={thread.author.name} />
                                <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{thread.content}</p>
                </CardContent>
            </Card>

            {/* Replies */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Replies ({thread.threadReplies?.length || 0})</h2>
                {(thread.threadReplies || []).map(reply => (
                    <Card key={reply.id} className="bg-muted/50">
                        <CardHeader className="p-4 flex-row justify-between items-start">
                             <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={reply.author.avatarUrl} alt={reply.author.name} />
                                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold">{reply.author.name}</p>
                                    <p className="text-xs text-muted-foreground">{reply.timestamp}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-sm text-foreground">{reply.content}</p>
                        </CardContent>
                    </Card>
                ))}
                 {thread.threadReplies?.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                        <p>No replies yet. Be the first to join the conversation!</p>
                    </div>
                 )}
            </div>

            {/* Reply Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Post a Reply</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleReplySubmit} className="space-y-4">
                        <Textarea 
                            placeholder="Write your reply here..." 
                            className="min-h-[150px]"
                            value={newReply}
                            onChange={e => setNewReply(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={!newReply.trim()}>Post Reply</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
