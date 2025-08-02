import { db } from './admin';
import { PersonalizedLearningPathOutput, CreateCourseOutput } from '@/types/ai-schemas';

export async function saveLearningPath(userId: string, learningPath: PersonalizedLearningPathOutput) {
  try {
    const learningPathRef = db.collection('learning_paths').doc();
    await learningPathRef.set({
      userId,
      path: learningPath.path,
      createdAt: new Date().toISOString(),
    });
    return learningPathRef.id;
  } catch (error) {
    console.error('Error saving learning path:', error);
    throw new Error('Failed to save learning path');
  }
}

export async function getLearningPath(pathId: string) {
  try {
    const pathDoc = await db.collection('learning_paths').doc(pathId).get();
    if (!pathDoc.exists) {
      throw new Error('Learning path not found');
    }
    return pathDoc.data() as PersonalizedLearningPathOutput & { userId: string };
  } catch (error) {
    console.error('Error getting learning path:', error);
    throw new Error('Failed to get learning path');
  }
}

export async function saveCourse(userId: string, course: CreateCourseOutput) {
  try {
    const courseRef = db.collection('courses').doc(course.id);
    await courseRef.set({
      ...course,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return course.id;
  } catch (error) {
    console.error('Error saving course:', error);
    throw new Error('Failed to save course');
  }
}

export async function getCourse(courseId: string) {
  try {
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      throw new Error('Course not found');
    }
    return courseDoc.data() as CreateCourseOutput & { userId: string };
  } catch (error) {
    console.error('Error getting course:', error);
    throw new Error('Failed to get course');
  }
}

export async function getUserLearningPaths(userId: string) {
  try {
    const paths = await db.collection('learning_paths')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    return paths.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user learning paths:', error);
    throw new Error('Failed to get user learning paths');
  }
}

export async function getUserCourses(userId: string) {
  try {
    const courses = await db.collection('courses')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    return courses.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user courses:', error);
    throw new Error('Failed to get user courses');
  }
}
