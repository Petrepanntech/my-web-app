import { z } from 'zod';

export const GenerateMOUInputSchema = z.object({
  clientName: z.string().describe('The name of the client or business.'),
  freelancerName: z.string().describe('The name of the freelancer or mentor.'),
  projectScope: z
    .string()
    .describe('A detailed description of the project scope and deliverables.'),
  budget: z.string().describe('The total budget for the project in NGN.'),
});
export type GenerateMOUInput = z.infer<typeof GenerateMOUInputSchema>;

export const GenerateMOUOutputSchema = z.object({
  mou: z.string().describe('The full text of the generated Memorandum of Understanding.'),
});
export type GenerateMOUOutput = z.infer<typeof GenerateMOUOutputSchema>;
