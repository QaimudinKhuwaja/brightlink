import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: 'Not authenticated',
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: admin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get current admin error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get current admin',
      },
      { status: 500 }
    );
  }
}
