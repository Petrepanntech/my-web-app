
import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { z } from 'zod';
import { cookies } from 'next/headers';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['student', 'mentor', 'business', 'admin']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten() }, { status: 400 });
    }

    const { email, password, name, role } = parsedData.data;

    // Create user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });
    
    // Create user document in Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role,
      avatar: `https://avatar.vercel.sh/${userRecord.uid}`,
      createdAt: new Date().toISOString(),
    });

    // Create session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(await adminAuth.createCustomToken(userRecord.uid), { expiresIn });
    
    (await cookies()).set('session', sessionCookie, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: expiresIn, path: '/' });

    return NextResponse.json({ status: 'success', uid: userRecord.uid });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
