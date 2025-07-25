import { z } from 'zod';

// Schema for Personalized Learning Path
export const PersonalizedLearningPathInputSchema = z.object({
  interests: z.string().describe('The interests of the student.'),
  goals: z.string().describe('The goals of the student.'),
});
export type PersonalizedLearningPathInput = z.infer<typeof PersonalizedLearningPathInputSchema>;

export const PersonalizedLearningPathOutputSchema = z.object({
  path: z.array(z.object({
      title: z.string().describe("The title of the learning module."),
      description: z.string().describe("A brief description of the module."),
  })).describe("A structured learning path with modules.")
});
export type PersonalizedLearningPathOutput = z.infer<typeof PersonalizedLearningPathOutputSchema>;


// Schema for Create Course
export const CourseLessonSchema = z.object({
    type: z.enum(['video', 'lecture']),
    title: z.string().describe("The title of the lesson."),
    url: z.string().optional().describe("The URL of the YouTube video, if applicable."),
    description: z.string().describe("A short description of the lesson or video."),
});
export type CourseLesson = z.infer<typeof CourseLessonSchema>;

const CourseModuleSchema = z.object({
    title: z.string().describe("The title of the course module."),
    lessons: z.array(CourseLessonSchema).describe("A list of lessons for the module."),
});

export const CreateCourseOutputSchema = z.object({
    id: z.string().describe("A unique ID for the course, perhaps using a slug of the title."),
    title: z.string().describe("A compelling title for the entire course."),
    instructor: z.string().describe("The instructor for this course, which should always be 'AI Curator'."),
    image: z.string().describe("A placeholder image URL for the course. Use an Unsplash URL related to the course topic."),
    aiHint: z.string().describe("A one or two-word hint for the AI to find a relevant image."),
    curriculum: z.array(CourseModuleSchema).describe("The full curriculum for the course."),
});
export type CreateCourseOutput = z.infer<typeof CreateCourseOutputSchema>;


// Schema for Generate MOU
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
