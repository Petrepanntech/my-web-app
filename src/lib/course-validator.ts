import type { CreateCourseOutput, CourseModule, CourseLesson } from '@/types/ai-schemas';

function generateQuickRevision(module: CourseModule): string {
    const concepts = module.lessons?.map(lesson => lesson.keyConcepts).flat() || [];
    return `Key concepts covered in this module: ${concepts.join(', ')}`;
}

function generateDefaultCheckpointQuiz(module: CourseModule) {
    const concepts = module.lessons?.map(lesson => lesson.keyConcepts).flat() || [];
    
    return [
        {
            question: `What is the main focus of the "${module.title}" module?`,
            options: [
                module.objective,
                "Understanding basic programming",
                "Learning web development",
                "Studying mathematics"
            ],
            answer: module.objective,
            insight: `This module focuses on ${module.objective.toLowerCase()}`
        },
        {
            question: `Which of the following is NOT covered in this module?`,
            options: [
                "Advanced quantum computing",
                ...concepts.slice(0, 3)
            ],
            answer: "Advanced quantum computing",
            insight: "This topic is not part of the current module's curriculum."
        },
        {
            question: `What is the primary learning outcome of this module?`,
            options: [
                module.objective,
                "Building a website",
                "Creating a mobile app",
                "Writing documentation"
            ],
            answer: module.objective,
            insight: `The primary goal is to ${module.objective.toLowerCase()}`
        }
    ];
}

export function validateAndRepairCourse(course: CreateCourseOutput): CreateCourseOutput {
    if (!course.curriculum) {
        throw new Error("Course curriculum is missing");
    }

    const repairedCurriculum = course.curriculum.map(module => {
        // Ensure quickRevision exists
        if (!module.quickRevision) {
            console.warn(`Module "${module.title}" was missing a quickRevision. Generating one.`);
            module.quickRevision = generateQuickRevision(module);
        }

        // Ensure checkpointQuiz exists with required questions
        if (!module.checkpointQuiz || module.checkpointQuiz.length < 3) {
            console.warn(`Module "${module.title}" was missing a checkpointQuiz. Generating one.`);
            module.checkpointQuiz = generateDefaultCheckpointQuiz(module);
        }

        // Ensure all lessons have required fields
        if (module.lessons) {
            module.lessons = module.lessons.map(lesson => validateAndRepairLesson(lesson));
        }

        return module;
    });

    return {
        ...course,
        curriculum: repairedCurriculum
    };
}

function validateAndRepairLesson(lesson: CourseLesson): CourseLesson {
    if (!lesson.keyConcepts || lesson.keyConcepts.length === 0) {
        lesson.keyConcepts = [lesson.objective];
    }

    if (!lesson.primaryActivity) {
        lesson.primaryActivity = {
            type: "Reading",
            description: `Study and understand ${lesson.title}`
        };
    }

    return lesson;
}
