'use server';

/**
 * @fileOverview A Genkit flow for generating a Memorandum of Understanding (MOU).
 *
 * - generateMOU - A function that generates an MOU for a freelance project.
 * - GenerateMOUInput - The input type for the generateMOU function.
 * - GenerateMOUOutput - The return type for the generateMOU function.
 */

import { ai } from '@/ai/genkit';
import {
    GenerateMOUInputSchema,
    GenerateMOUOutputSchema,
    type GenerateMOUInput,
    type GenerateMOUOutput,
} from '@/types/ai-schemas';


export async function generateMOU(
  input: GenerateMOUInput
): Promise<GenerateMOUOutput> {
  return generateMOUFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMOUbPrompt',
  input: { schema: GenerateMOUInputSchema },
  output: { schema: GenerateMOUOutputSchema },
  prompt: `You are an expert legal assistant specializing in freelance contracts in Nigeria.
Your task is to generate a clear, concise, and fair Memorandum of Understanding (MOU) for a freelance project.

Use the following information to draft the MOU:
- Client Name: {{{clientName}}}
- Freelancer Name: {{{freelancerName}}}
- Project Scope: {{{projectScope}}}
- Total Budget: ₦{{{budget}}}

The MOU should include the following sections:
1.  **Parties**: Clearly state the names of the Client and the Freelancer.
2.  **Project Scope**: Detail the work to be done based on the provided scope.
3.  **Deliverables**: List the expected outputs from the freelancer.
4.  **Timeline**: State that the timeline will be agreed upon separately by both parties.
5.  **Payment Terms**: Specify the total project fee (₦{{{budget}}}) and state that payment milestones will be managed through the Alternative Academy platform escrow system.
6.  **Confidentiality**: Include a standard confidentiality clause.
7.  **Termination**: Briefly explain the conditions under which the agreement can be terminated.
8.  **Dispute Resolution**: Mention that any disputes will be mediated through the Alternative Academy resolution center.
9.  **Signatures**: Provide placeholder lines for both parties to sign and date.

Format the output as a single string of text for the 'mou' field. Use Markdown for formatting (e.g., bold headings).
`,
});

const generateMOUFlow = ai.defineFlow(
  {
    name: 'generateMOUFlow',
    inputSchema: GenerateMOUInputSchema,
    outputSchema: GenerateMOUOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
