
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

const LearningResourceSchema = z.object({
    title: z.string().describe("The title of the resource."),
    url: z.string().url().describe("The direct URL to the resource."),
});

const TutorGuidanceSchema = z.object({
    commonStickingPoints: z.array(z.string()).describe("A list of potential challenges or misunderstandings."),
    clarificationPrompts: z.array(z.string()).describe("A list of questions an AI tutor could ask to check for understanding."),
});

const PrimaryActivitySchema = z.object({
    type: z.enum(['Reading', 'Video', 'Interactive Exercise', 'Code-Along', 'Quiz', 'Mini-Project']).describe("The type of the primary activity."),
    description: z.string().describe("A detailed explanation of the activity."),
});

export const CourseLessonSchema = z.object({
    title: z.string().describe("A concise and descriptive title for the lesson."),
    objective: z.string().describe("A single sentence explaining what the student will be able to do after this lesson."),
    keyConcepts: z.array(z.string()).describe("A bulleted list of the core theories or skills to be covered."),
    primaryActivity: PrimaryActivitySchema,
    learningResources: z.object({
        articles: z.array(LearningResourceSchema).optional().describe("A list of high-quality articles."),
        videos: z.array(LearningResourceSchema).optional().describe("A list of relevant YouTube videos."),
    }).optional(),
    tutorGuidance: TutorGuidanceSchema.optional(),
    popQuiz: z.array(PopQuizQuestionSchema).optional().describe("For video lessons, a pop quiz with 5 multiple-choice questions."),
});
export type CourseLesson = z.infer<typeof CourseLessonSchema>;

const CourseModuleSchema = z.object({
    title: z.string().describe("The clear title of the course module."),
    objective: z.string().describe("A 1-2 sentence objective for the module."),
    lessons: z.array(CourseLessonSchema).describe("A list of lessons for the module."),
});

const CapstoneProjectSchema = z.object({
    goal: z.string().describe("The main goal of the final project."),
    requirements: z.array(z.string()).describe("A list of key requirements for the project."),
    evaluationCriteria: z.array(z.string()).describe("A list of criteria for evaluating the project."),
});

export const CreateCourseOutputSchema = z.object({
    id: z.string().describe("A unique ID for the course, which is a URL-friendly slug of the course title."),
    title: z.string().describe("A creative and descriptive title for the course."),
    description: z.string().describe("A compelling 100-word description (elevator pitch) of the course."),
    learningObjectives: z.array(z.string()).describe("5-7 specific, measurable, and action-oriented learning objectives."),
    instructor: z.literal("AI Curator").describe("The instructor for this course."),
    image: z.string().url().describe("A placeholder image URL for the course from Unsplash."),
    aiHint: z.string().describe("A one or two-word hint for the AI to find a relevant image."),
    curriculum: z.array(CourseModuleSchema).describe("The full curriculum for the course, broken into modules."),
    capstoneProject: CapstoneProjectSchema.optional().describe("A comprehensive final project."),
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
