'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function EventsPage() {
  const events = [
    {
      title: 'Annual Sports Day',
      description: 'Students showcase their athletic skills and learn teamwork.',
    },
    {
      title: 'Science Exhibition',
      description: 'Innovative student projects and experiments are displayed.',
    },
    {
      title: 'Parent Teacher Meeting',
      description: 'Teachers and parents discuss student progress and growth.',
    },
    {
      title: 'Cultural Festival',
      description: 'Students perform music, drama, and arts in the annual festival.',
    },
    {
      title: 'Independence Day Celebration',
      description: 'Honoring the nation with performances and activities.',
    },
    {
      title: 'Teacher’s Day',
      description: 'Celebrating and appreciating the dedication of our teachers.',
    },
 
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">Events & Celebrations</h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          Explore BrightLink School events and celebrations, where students shine academically and creatively throughout the year.
        </p>
      </MotionDiv>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
