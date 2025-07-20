import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface RatingSystemProps {
  productId: string;
  orderId?: string;
  showReviewForm?: boolean;
}

interface Rating {
  id: string;
  user_id: string;
  rating: number;
  review?: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

const RatingSystem: React.FC<RatingSystemProps> = ({ 
  productId, 
  orderId, 
  showReviewForm = false 
}) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasUserRated, setHasUserRated] = useState(false);
  const { user } = useAuth();

  const fetchRatings = async () => {
    try {
      const { data, error } = await supabase
        .from('product_ratings')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedRatings: Rating[] = data?.map(rating => ({
        ...rating,
        profiles: Array.isArray(rating.profiles) && rating.profiles.length > 0 
          ? rating.profiles[0] 
          : { full_name: 'Anonymous' }
      })) || [];

      setRatings(formattedRatings);

      // Check if current user has rated this product
      if (user) {
        const userRatingData = data?.find(r => r.user_id === user.id);
        if (userRatingData) {
          setHasUserRated(true);
          setUserRating(userRatingData.rating);
          setUserReview(userRatingData.review || '');
        }
      }
    } catch (error: any) {
      console.error('Error fetching ratings:', error);
    }
  };

  const submitRating = async () => {
    if (!user || !orderId) {
      toast.error('Please log in and complete a purchase to rate this product');
      return;
    }

    if (userRating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('product_ratings')
        .upsert({
          user_id: user.id,
          product_id: productId,
          order_id: orderId,
          rating: userRating,
          review: userReview.trim() || null
        });

      if (error) throw error;

      toast.success('Rating submitted successfully!');
      setHasUserRated(true);
      await fetchRatings();
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
    : 0;

  useEffect(() => {
    fetchRatings();
  }, [productId, user]);

  const renderStars = (rating: number, interactive = false, size = 'w-5 h-5') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} cursor-pointer transition-colors ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
        onClick={interactive ? () => setUserRating(i + 1) : undefined}
        onMouseEnter={interactive ? () => setHoverRating(i + 1) : undefined}
        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Average Rating Display */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {renderStars(averageRating)}
          <span className="text-sm text-muted-foreground">
            {averageRating.toFixed(1)} ({ratings.length} reviews)
          </span>
        </div>
      </div>

      {/* Rating Form */}
      {showReviewForm && user && orderId && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">
              {hasUserRated ? 'Update Your Rating' : 'Rate This Product'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Your rating:</span>
                <div className="flex space-x-1">
                  {renderStars(hoverRating || userRating, true)}
                </div>
              </div>

              <Textarea
                placeholder="Write your review (optional)..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                rows={3}
              />

              <Button onClick={submitRating} disabled={loading}>
                {loading ? 'Submitting...' : hasUserRated ? 'Update Rating' : 'Submit Rating'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {ratings.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Customer Reviews</h3>
          
          {ratings.map((rating) => (
            <Card key={rating.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {renderStars(rating.rating, false, 'w-4 h-4')}
                      <span className="font-medium">{rating.profiles.full_name}</span>
                    </div>
                    
                    {rating.review && (
                      <p className="text-sm text-muted-foreground">{rating.review}</p>
                    )}
                  </div>
                  
                  <span className="text-xs text-muted-foreground">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingSystem;