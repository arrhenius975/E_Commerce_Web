
// src/ai/flows/personalized-recommendations.ts
'use server';

/**
 * @fileOverview Flow for generating personalized product recommendations based on viewed items.
 *
 * - generatePersonalizedRecommendations - A function that generates personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  viewedProducts: z
    .array(z.string())
    .describe('An array of product IDs that the user has viewed.'),
  userPreferences: z
    .string()
    .optional()
    .describe('Optional user preferences to refine recommendations.'),
  // Removed currentCategory as the flow should be generic. Filtering by category can happen client-side if needed.
});

export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of product IDs recommended for the user.'),
});

export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function generatePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a personal shopping assistant. Based on the products the user has viewed (by their IDs) and their stated preferences, recommend other relevant product IDs.
You should try to recommend diverse products.

Viewed Product IDs: {{viewedProducts}}
User Preferences: {{userPreferences}}

Based on this information, what product IDs would you recommend? Return ONLY an array of product IDs. Do not include products already viewed.
Aim for 3-5 recommendations if possible.
Example output: ["prod-123", "prod-456", "prod-789"]
`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure output is not null and is an array, even if empty.
    // The schema validation should handle this, but as a fallback:
    if (!output || !Array.isArray(output.recommendations)) {
        return { recommendations: [] };
    }
    return output;
  }
);
