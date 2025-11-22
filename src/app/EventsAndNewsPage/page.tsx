'use client';

import MotionDiv from '../component/MotionDivWrapper';

export default function EventsPage() {
  const events = [
    {
      title: 'Annual Sports Day',
      date: 'March 15, 2025',
      description:
        'Bright Link School ka sports day, jisme students apni athletic skills dikhayenge aur teamwork seekhenge.',
    },
    {
      title: 'Science Exhibition',
      date: 'April 10, 2025',
      description:
        'Students apne innovative science projects aur experiments showcase karenge.',
    },
    {
      title: 'Parent Teacher Meeting',
      date: 'May 5, 2025',
      description:
        'Teachers aur parents ke darmiyan meeting, taake bacho ki progress par guftagu ki ja sake.',
    },
    {
      title: 'Cultural Festival',
      date: 'June 20, 2025',
      description:
        'School ka annual cultural festival jisme students music, drama aur arts me perform karenge.',
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
        <h1 className="text-4xl font-bold text-red-900 mb-4">Events & News</h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          Bright Link School ke upcoming events aur latest news ke updates yahan
          dekhiye, taake aap humare taleemi aur extracurricular safar ka hissa
          ban saken.
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
            <p className="text-sm text-red-600 font-medium mb-4">
              {event.date}
            </p>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
