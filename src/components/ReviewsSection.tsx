
// src/components/ReviewsSection.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Review {
  id: string;
  author: string;
  avatarUrl?: string;
  rating: number;
  date: string;
  comment: string;
}

// Mock Data
const mockReviews: Review[] = [
  { id: '1', author: 'Alice Wonderland', rating: 5, date: '2024-03-10', comment: 'Absolutely fantastic product! Exceeded my expectations.' },
  { id: '2', author: 'Bob The Builder', rating: 4, date: '2024-03-12', comment: 'Very good quality, though shipping was a bit slow. Would recommend.', avatarUrl: 'https://placehold.co/40x40.png' },
  { id: '3', author: 'Charlie Brown', rating: 3, date: '2024-03-15', comment: 'It\'s okay. Does the job but nothing special.' },
];

const StarRating = ({ rating, setRating, interactive = true }: { rating: number, setRating?: (rating: number) => void, interactive?: boolean }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={interactive && setRating ? () => setRating(star) : undefined}
          className={`p-1 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          aria-label={`Rate ${star} stars`}
          disabled={!interactive}
        >
          <Star
            className={`h-5 w-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews.slice(0, Math.floor(Math.random() * mockReviews.length) + 1)); // Show random number of mock reviews
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // --- IMPORTANT ---
    // This is a UI placeholder. Real review submission requires a backend.
    if (!newReviewText || !newReviewAuthor || newReviewRating === 0) {
        alert("Please fill in all fields and provide a rating.");
        return;
    }
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewText,
    };
    setReviews([newReview, ...reviews]);
    setNewReviewText('');
    setNewReviewRating(0);
    setNewReviewAuthor('');
    console.log(`UI: Submitted review for product ${productId}:`, newReview);
    alert("Review submitted (UI demo)!");
  };

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

  return (
    <section id="reviews" className="py-12 md:py-16 bg-secondary/30 dark:bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Customer Reviews & Ratings</h2>
        {reviews.length > 0 && (
            <div className="flex items-center justify-center mb-8 gap-2">
                <StarRating rating={averageRating} interactive={false} />
                <p className="text-muted-foreground">({averageRating.toFixed(1)} average from {reviews.length} reviews)</p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
                <CardDescription>Share your thoughts about this product.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitReview}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="review-author">Your Name</Label>
                    <Input id="review-author" value={newReviewAuthor} onChange={(e) => setNewReviewAuthor(e.target.value)} placeholder="e.g., Jane Doe" required />
                  </div>
                  <div className="space-y-1">
                    <Label>Your Rating</Label>
                    <StarRating rating={newReviewRating} setRating={setNewReviewRating} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="review-text">Your Review</Label>
                    <Textarea
                      id="review-text"
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="What did you like or dislike?"
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit Review</Button>
                   <p className="text-xs text-muted-foreground pt-2">
                    Review submission is a UI demonstration. Backend integration needed.
                  </p>
                </CardContent>
              </form>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="md:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatarUrl} alt={review.author} data-ai-hint="person avatar" />
                        <AvatarFallback>{review.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{review.author}</h4>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <StarRating rating={review.rating} interactive={false} />
                        <p className="mt-2 text-sm text-foreground/90">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
