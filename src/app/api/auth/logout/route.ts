
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { z } from 'zod';

const sessionSchema = z.object({
  session: z.string().optional(),
});

export async function POST(request: Request) {
  const sessionCookie = (await cookies()).get('session')?.value || '';
  
  if (!sessionCookie) {
    return NextResponse.json({ status: 'already logged out' }, { status: 200 });
  }

  (await cookies()).delete('session');
  
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true).catch(() => null);
    if (decodedClaims) {
      await adminAuth.revokeRefreshTokens(decodedClaims.sub);
    }
  } catch (error) {
    // Session cookie is invalid or expired.
    // This is not a critical error, so we can ignore it and just clear the cookie.
    console.warn("Error revoking refresh tokens:", error);
  }

  return NextResponse.json({ status: 'success' });
}
