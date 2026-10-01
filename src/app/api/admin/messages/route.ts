import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

// GET - Fetch all contact messages
export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');

    const where: any = {};

    if (filter === 'unread') {
      where.isRead = false;
    } else if (filter === 'read') {
      where.isRead = true;
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Fetch messages error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch messages',
      },
      { status: 500 }
    );
  }
}

// PATCH - Mark message as read/unread
export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { id, isRead } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Message ID is required',
        },
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });

    return NextResponse.json({
      success: true,
      message: 'Message updated successfully',
      data: message,
    });
  } catch (error) {
    console.error('Update message error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update message',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete message
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Message ID is required',
        },
        { status: 400 }
      );
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete message',
      },
      { status: 500 }
    );
  }
}
