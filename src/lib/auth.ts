import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Session management
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

export async function createSession(adminId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, adminId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value || null;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentAdmin() {
  const sessionId = await getSession();
  if (!sessionId) return null;

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: sessionId, isActive: true },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return admin;
  } catch (error) {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const admin = await getCurrentAdmin();
  return admin !== null;
}

export async function requireAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error('Unauthorized');
  }
  return admin;
}

export async function requireSuperAdmin() {
  const admin = await requireAuth();
  if (admin.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden: Super Admin access required');
  }
  return admin;
}
