'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateTopicSuggestions, GenerateTopicSuggestionsOutput } from "@/ai/flows/tutor-assisted-topic-generation";
import { Bot, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

export default function TopicGenerator() {
  const [studentInterests, setStudentInterests] = useState('');
  const [suggestions, setSuggestions] = useState<GenerateTopicSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateTopics = async () => {
    if (!studentInterests.trim()) {
      toast({
        title: "Input required",
        description: "Please describe the student's interests.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await generateTopicSuggestions({ studentInterests });
      setSuggestions(result);
    } catch (error) {
      console.error("Error generating topics:", error);
      toast({
        title: "Error",
        description: "Failed to generate topic suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot /> AI Topic Generator
        </CardTitle>
        <CardDescription>Generate IT learning topics based on student interests.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <Textarea
          placeholder="e.g., Loves video games like Minecraft, enjoys building with LEGOs, and is curious about space exploration..."
          value={studentInterests}
          onChange={(e) => setStudentInterests(e.target.value)}
          className="flex-grow min-h-[100px]"
        />
        <Button onClick={handleGenerateTopics} disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : <><Sparkles className="mr-2 h-4 w-4" /> Generate Topics</>}
        </Button>
        
        {isLoading && (
            <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        )}

        {suggestions && (
          <div className="pt-4 space-y-2">
            <h3 className="font-semibold">Suggested Topics:</h3>
            <div className="p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
              {suggestions.topicSuggestions}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
