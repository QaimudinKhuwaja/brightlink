import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  category: z.enum(['SPORTS', 'ACADEMIC', 'CULTURAL', 'NATIONAL', 'CELEBRATION', 'OTHER']),
  color: z.string().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  isActive: z.boolean().optional(),
});

// GET - Fetch all events
export async function GET() {
  try {
    await requireAuth();

    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error('Fetch events error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch events',
      },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const validatedData = eventSchema.parse(body);

    const event = await prisma.event.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Event created successfully',
        data: event,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Create event error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create event',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update event
export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Event ID is required',
        },
        { status: 400 }
      );
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      data: event,
    });
  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update event',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Event ID is required',
        },
        { status: 400 }
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete event',
      },
      { status: 500 }
    );
  }
}
