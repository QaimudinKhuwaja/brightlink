import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAuth();

    const [
      totalAdmissions,
      pendingAdmissions,
      approvedAdmissions,
      rejectedAdmissions,
      totalGallery,
      totalFaculty,
      totalEvents,
      totalFeedback,
      unreadMessages,
      recentAdmissions,
      recentMessages,
      recentFeedback,
    ] = await Promise.all([
      prisma.admission.count(),
      prisma.admission.count({ where: { status: 'PENDING' } }),
      prisma.admission.count({ where: { status: 'APPROVED' } }),
      prisma.admission.count({ where: { status: 'REJECTED' } }),
      prisma.galleryImage.count({ where: { isActive: true } }),
      prisma.faculty.count({ where: { isActive: true } }),
      prisma.event.count({ where: { isActive: true } }),
      prisma.feedback.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.admission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          studentName: true,
          applyingClass: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          subject: true,
          isRead: true,
          createdAt: true,
        },
      }),
      prisma.feedback.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          rating: true,
          isPublished: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          admissions: {
            total: totalAdmissions,
            pending: pendingAdmissions,
            approved: approvedAdmissions,
            rejected: rejectedAdmissions,
          },
          gallery: totalGallery,
          faculty: totalFaculty,
          events: totalEvents,
          feedback: totalFeedback,
          unreadMessages,
        },
        recent: {
          admissions: recentAdmissions,
          messages: recentMessages,
          feedback: recentFeedback,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch dashboard stats',
      },
      { status: 500 }
    );
  }
}
