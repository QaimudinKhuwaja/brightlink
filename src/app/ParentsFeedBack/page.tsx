'use client';

import { useState, useEffect } from 'react';
import MotionDiv from '../component/MotionDivWrapper';

export default function FeedbackPage() {
  // Feedback list (frontend-only)
  const [feedbacks, setFeedbacks] = useState<
    { name: string; role: string; feedback: string }[]
  >([]);

  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  // Save & Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('feedbacks');
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    } else {
      // default feedbacks if none stored
      setFeedbacks([
        {
          name: 'Mrs. Ayesha Khan',
          role: 'Parent of Grade 5 Student',
          feedback:
            'Bright Link School ne mere bache ki learning aur confidence ko bohot improve kiya hai. Teachers bohot supportive aur dedicated hain.',
        },
        {
          name: 'Mr. Imran Ali',
          role: 'Parent of Grade 3 Student',
          feedback:
            'School ka environment safe aur friendly hai. Har student ko equal attention milta hai jo parents ke liye sukoon ki baat hai.',
        },
      ]);
    }
  }, []);

  // Save to localStorage when feedbacks update
  useEffect(() => {
    if (feedbacks.length > 0) {
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }
  }, [feedbacks]);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) return;

    const newFeedback = { name, role: 'Parent', feedback };
    setFeedbacks([...feedbacks, newFeedback]);
    setName('');
    setFeedback('');
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 md:px-16">
      {/* Heading */}
      <MotionDiv
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-red-900 mb-4">Parents Feedback</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Humare school ke baray me parents ki raaye — jo humare liye bohot qeemti hai.
        </p>
      </MotionDiv>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {feedbacks.map((item, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
          >
            {/* FIXED QUOTES HERE */}
            <p className="text-gray-700 italic mb-4">
              &quot;{item.feedback}&quot;
            </p>
            <h3 className="text-lg font-semibold text-red-900">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.role}</p>
          </MotionDiv>
        ))}
      </div>

      {/* Feedback Form */}
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">
          Share Your Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-black"
            />
          </div>

          {/* Feedback Input */}
          <div>
            <label className="block text-gray-700 mb-2">Your Feedback</label>
            <textarea
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-black"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-900 text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </MotionDiv>
    </section>
  );
}
