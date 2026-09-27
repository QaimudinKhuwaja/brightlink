import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Super Admin
  console.log('Creating Super Admin...');
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@brightlinkschool.edu.pk' },
    update: {},
    create: {
      username: 'superadmin',
      email: 'admin@brightlinkschool.edu.pk',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  // Seed Faculty
  console.log('Adding faculty members...');
  await prisma.faculty.createMany({
    data: [
      {
        name: 'Adnan Ahmed',
        role: 'Principal',
        qualification: 'M.Ed',
        experience: '15+ years',
        emoji: '👨‍💼',
        order: 1,
      },
      {
        name: 'Sarah Khan',
        role: 'Head of Sciences',
        qualification: 'M.Sc Physics',
        experience: '10 years',
        emoji: '👩‍🔬',
        order: 2,
      },
      {
        name: 'Ahmed Ali',
        role: 'Mathematics Lead',
        qualification: 'M.Math',
        experience: '8 years',
        emoji: '👨‍🏫',
        order: 3,
      },
      {
        name: 'Fatima Baloch',
        role: 'English Department',
        qualification: 'MA English',
        experience: '12 years',
        emoji: '👩‍🏫',
        order: 4,
      },
      {
        name: 'Hassan Raza',
        role: 'Sports Coordinator',
        qualification: 'BPE',
        experience: '6 years',
        emoji: '🏃‍♂️',
        order: 5,
      },
      {
        name: 'Ayesha Siddiqui',
        role: 'Primary Section Head',
        qualification: 'B.Ed',
        experience: '9 years',
        emoji: '👩‍🎓',
        order: 6,
      },
    ],
  });

  // Seed Events
  console.log('Adding events...');
  await prisma.event.createMany({
    data: [
      {
        title: 'Annual Sports Day',
        description:
          'Students showcase their athletic skills in cricket, football, track events, and learn the value of teamwork and sportsmanship.',
        date: 'March 2024',
        category: 'SPORTS',
        color: 'orange',
        icon: 'Trophy',
      },
      {
        title: 'Science Exhibition',
        description:
          'Innovative student projects and experiments displayed, promoting scientific thinking and creativity among young minds.',
        date: 'February 2024',
        category: 'ACADEMIC',
        color: 'blue',
        icon: 'FlaskConical',
      },
      {
        title: 'Parent Teacher Meeting',
        description:
          'Regular meetings where teachers and parents discuss student progress, challenges, and collaborative strategies for growth.',
        date: 'Monthly',
        category: 'ACADEMIC',
        color: 'purple',
        icon: 'Users',
      },
      {
        title: 'Cultural Festival',
        description:
          'Annual celebration featuring music, drama, art exhibitions, and cultural performances showcasing student talents.',
        date: 'November 2024',
        category: 'CULTURAL',
        color: 'pink',
        icon: 'Palette',
      },
      {
        title: 'Independence Day Celebration',
        description:
          "Patriotic celebrations with flag hoisting, national songs, speeches, and activities honoring our nation's heritage.",
        date: '14 August',
        category: 'NATIONAL',
        color: 'green',
        icon: 'Flag',
      },
      {
        title: "Teacher's Day",
        description:
          'A special day dedicated to celebrating and appreciating the dedication, hard work, and commitment of our teachers.',
        date: '5 October',
        category: 'CELEBRATION',
        color: 'red',
        icon: 'Heart',
      },
    ],
  });

  // Seed Sample Feedback (these will need admin approval to be published)
  console.log('Adding sample feedback...');
  await prisma.feedback.createMany({
    data: [
      {
        name: 'Ahmed Khan',
        childClass: 'Class 5',
        rating: 5,
        comment:
          'Excellent school! My child has shown tremendous improvement in both academics and character. The teachers are very supportive.',
        isApproved: true,
        isPublished: true,
      },
      {
        name: 'Sara Ali',
        childClass: 'Class 8',
        rating: 5,
        comment:
          "Very impressed with the school's focus on modern education. The digital learning facilities are outstanding.",
        isApproved: true,
        isPublished: true,
      },
      {
        name: 'Muhammad Hassan',
        childClass: 'Class 3',
        rating: 4,
        comment:
          'Good school with dedicated staff. My only suggestion would be to add more extracurricular activities.',
        isApproved: true,
        isPublished: true,
      },
      {
        name: 'Fatima Baloch',
        childClass: 'Class 6',
        rating: 5,
        comment:
          'The best school in Khuhra! My children love going to school every day. Thank you Bright Link!',
        isApproved: true,
        isPublished: true,
      },
    ],
  });

  console.log('✅ Seeding completed successfully!');

  console.log('\n🔐 Admin Login Credentials:');
  console.log('═══════════════════════════════════════');
  console.log('   Email: admin@brightlinkschool.edu.pk');
  console.log('   Password: Admin@123');
  console.log('═══════════════════════════════════════');
  console.log('   Login URL: http://localhost:3000/admin/login');
  console.log('   Dashboard: http://localhost:3000/admin/dashboard');
  console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
