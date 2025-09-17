'use server';
/**
 * @fileOverview An AI agent to assist tutors in generating relevant and engaging learning topics based on student interests.
 *
 * - generateTopicSuggestions - A function that takes student interests as input and returns topic suggestions.
 * - GenerateTopicSuggestionsInput - The input type for the generateTopicSuggestions function.
 * - GenerateTopicSuggestionsOutput - The return type for the generateTopicSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTopicSuggestionsInputSchema = z.object({
  studentInterests: z
    .string()
    .describe('A description of the students interests.'),
});
export type GenerateTopicSuggestionsInput = z.infer<
  typeof GenerateTopicSuggestionsInputSchema
>;

const GenerateTopicSuggestionsOutputSchema = z.object({
  topicSuggestions: z
    .string()
    .describe('A list of suggested learning topics.'),
});
export type GenerateTopicSuggestionsOutput = z.infer<
  typeof GenerateTopicSuggestionsOutputSchema
>;

export async function generateTopicSuggestions(
  input: GenerateTopicSuggestionsInput
): Promise<GenerateTopicSuggestionsOutput> {
  return generateTopicSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTopicSuggestionsPrompt',
  input: {schema: GenerateTopicSuggestionsInputSchema},
  output: {schema: GenerateTopicSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to help tutors generate engaging learning topics for their students.

  Based on the provided student interests, suggest a list of learning topics that would be relevant and engaging for them.

  Student Interests: {{{studentInterests}}}

  Topic Suggestions:`,
});

const generateTopicSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateTopicSuggestionsFlow',
    inputSchema: GenerateTopicSuggestionsInputSchema,
    outputSchema: GenerateTopicSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
