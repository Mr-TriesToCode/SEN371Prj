
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_FORUM_THREADS } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForumPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussions</h1>
          <p className="text-muted-foreground mt-2">
            Engage with the community, ask questions, and share your knowledge.
          </p>
        </div>
        <Button asChild>
          <Link href="/forum/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Topic
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Topic</TableHead>
                <TableHead className="text-center">Replies</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-right">Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_FORUM_THREADS.map((thread) => (
                <TableRow key={thread.id} onClick={() => router.push(`/forum/${thread.id}`)} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={thread.author.avatarUrl} alt={thread.author.name} />
                            <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-primary hover:underline">{thread.title}</p>
                            <p className="text-sm text-muted-foreground">
                            by {thread.author.name} in <Badge variant="secondary">{thread.category}</Badge>
                            </p>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{thread.replies}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{thread.views}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    <p>{thread.lastActivity.time}</p>
                    <p>by {thread.lastActivity.user}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
