import { z } from 'zod';

export const feedbackSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  childClass: z.string().min(1, 'Please select your child\'s class'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Feedback must be at least 10 characters').max(1000),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
