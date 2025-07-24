
import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const sessionCookie = (await cookies()).get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ isAuthenticated: false, user: null }, { status: 200 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userDoc = await adminDb.collection('users').doc(decodedClaims.uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ isAuthenticated: false, user: null }, { status: 404 });
    }

    const user = userDoc.data();
    return NextResponse.json({ isAuthenticated: true, user }, { status: 200 });
  } catch (error) {
    // Session cookie is invalid or expired.
    return NextResponse.json({ isAuthenticated: false, user: null, error: 'Invalid session cookie' }, { status: 401 });
  }
}
