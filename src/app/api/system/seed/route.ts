
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { courseCategories } from '@/lib/courses-data'; // Assuming this is the correct path

export async function GET(request: Request) {
  try {
    const coursesCollection = adminDb.collection('courses');
    let coursesAdded = 0;
    
    // Using a batch to write all documents at once for efficiency.
    const batch = adminDb.batch();

    for (const course of courseCategories) {
      // Use the 'slug' as the document ID to prevent duplicates.
      const courseRef = coursesCollection.doc(course.slug);
      const doc = await courseRef.get();

      if (!doc.exists) {
        // The document does not exist, so we add it to the batch.
        batch.set(courseRef, {
            // We are using the spread operator to copy the course data.
            // You can add or modify fields here as needed.
            ...course,
            createdAt: new Date().toISOString(),
        });
        coursesAdded++;
      }
    }

    // Commit the batch.
    await batch.commit();

    if (coursesAdded > 0) {
        return NextResponse.json({ status: 'success', message: `${coursesAdded} courses have been added to the database.` });
    } else {
        return NextResponse.json({ status: 'success', message: 'The database is already up-to-date. No new courses were added.' });
    }

  } catch (error: any) {
    console.error('Seeding Error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
