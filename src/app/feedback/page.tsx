'use client';

import { useState, useEffect } from 'react';
import MotionDiv from '@/app/components/ui/MotionDiv';
import { MessageSquare, Star, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { feedbackSchema, type FeedbackFormData } from '@/lib/validations/feedback';
import { FormInput } from '@/components/ui/FormInput';
import { FormSelect } from '@/components/ui/FormSelect';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { Alert } from '@/components/ui/Alert';

interface Feedback {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  childClass: string;
}

export default function ParentsFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const classes = [
    'Nursery',
    'KG',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
  ].map((cls) => ({ value: cls, label: cls }));

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      const data = await response.json();
      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const onSubmit = async (data: FeedbackFormData) => {
    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
        setSelectedRating(0);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setAlert({ type: 'error', message: result.message });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to submit feedback. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-amber-600 to-orange-700 dark:from-amber-700 dark:to-orange-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="glow-blob-blue w-96 h-96 -top-48 -right-48 opacity-30" />
        <div className="glow-blob-blue w-80 h-80 bottom-0 left-20 opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Parents&apos; <span className="italic">Feedback</span>
            </h1>
            <p className="text-lg md:text-xl text-amber-100 leading-relaxed">
              Your voice matters! Share your experience and help us serve our students better
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Testimonials Section */}
      {feedbacks.length > 0 && (
        <section className="section-padding bg-background-secondary relative overflow-hidden">
          <div className="glow-blob-blue w-96 h-96 top-20 -left-48" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="section-heading">
                What Parents <span className="heading-emphasis">Say</span>
              </h2>
              <p className="section-subheading">
                Hear from families who trust us with their children&apos;s education
              </p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {feedbacks.map((feedback, index) => (
                <MotionDiv
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="saas-card p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-none text-foreground-secondary/30'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-4 italic">
                    &ldquo;{feedback.comment}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">{feedback.name}</p>
                    <p className="text-sm text-foreground-secondary">Parent of {feedback.childClass} student</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feedback Form Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-blob-blue w-80 h-80 bottom-20 right-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="section-heading">
                Share Your <span className="heading-emphasis">Experience</span>
              </h2>
              <p className="section-subheading">
                Your feedback helps us improve and serve our community better
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="saas-card p-8"
            >
              {alert && (
                <div className="mb-6">
                  <Alert type={alert.type} message={alert.message} />
                </div>
              )}

              {isSubmitted && (
                <div className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Thank You for Your Feedback!</h3>
                    <p className="text-sm text-foreground-secondary">
                      Your review has been submitted and will be published after moderation.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Your Name"
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="John Doe"
                  />

                  <FormInput
                    label="Email (Optional)"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="john@example.com"
                  />
                </div>

                <FormSelect
                  label="Child's Class"
                  {...register('childClass')}
                  error={errors.childClass?.message}
                  options={classes}
                />

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingClick(rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            rating <= (hoveredRating || selectedRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-none text-foreground-secondary/30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <input type="hidden" {...register('rating')} />
                  {errors.rating && (
                    <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
                  )}
                </div>

                <FormTextarea
                  label="Your Feedback"
                  {...register('comment')}
                  error={errors.comment?.message}
                  placeholder="Share your experience with Bright Link School..."
                  rows={6}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            </MotionDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
