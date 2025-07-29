
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
export const PopQuizQuestionSchema = z.object({
    question: z.string().describe("The question text."),
    options: z.array(z.string()).length(4).describe("An array of 4 possible answers."),
    answer: z.string().describe("The correct answer, which must be one of the strings in the options array."),
});
export type PopQuizQuestion = z.infer<typeof PopQuizQuestionSchema>;

export const CourseLessonSchema = z.object({
    type: z.enum(['video', 'lecture', 'quiz', 'assignment']).describe("The type of the lesson."),
    title: z.string().describe("The title of the lesson."),
    url: z.string().optional().describe("The URL of the YouTube video, required if type is 'video'."),
    description: z.string().describe("For 'video', a short description. For 'lecture', the full text content of the lesson (at least 3-5 paragraphs). For 'quiz' or 'assignment', a description of the task."),
    notes: z.string().optional().describe("For 'video', a highly detailed, well-structured summary of the video content. Use multiple paragraphs, bullet points, and bold text for clarity."),
    popQuiz: z.array(PopQuizQuestionSchema).optional().describe("For 'video' lessons, a pop quiz with 5 multiple-choice questions based on the video."),
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
    overview: z.string().describe("A detailed course overview (at least 3-4 paragraphs, with an empty line between paragraphs)."),
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


// Schema for AI Buddy (replaces AI Tutor)
export const AIBuddyInputSchema = z.object({
  prompt: z.string().describe('The user\'s text prompt.'),
  photoDataUri: z.string().optional().describe("A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type AIBuddyInput = z.infer<typeof AIBuddyInputSchema>;


// Schema for AI Tutor (obsolete, replaced by AI Buddy but kept for reference if needed)
export const AITutorInputSchema = z.object({
  personality: z.string().describe("The desired personality for the AI tutor."),
  gender: z.string().describe("The desired gender for the AI tutor."),
  name: z.string().describe("The chosen name for the AI tutor."),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string(),
  })).describe("The history of the conversation so far."),
  currentMessage: z.string().describe("The user's latest message."),
});
export type AITutorInput = z.infer<typeof AITutorInputSchema>;

export const AITutorResponseSchema = z.object({
    response: z.string().describe("The AI tutor's response to the user's message."),
});
export type AITutorResponse = z.infer<typeof AITutorResponseSchema>;
