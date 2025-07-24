
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  idToken: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = loginSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten() }, { status: 400 });
    }
    
    const { idToken } = parsedData.data;

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    (await cookies()).set('session', sessionCookie, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: expiresIn, path: '/' });

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Failed to create session.' }, { status: 401 });
  }
}
