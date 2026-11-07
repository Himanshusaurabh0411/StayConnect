"use client";

import * as React from "react";
import { Star, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewFormProps {
  propertyId: string;
  propertyName: string;
  onReviewSubmitted?: (review: any) => void;
}

export function ResidentReviewForm({
  propertyId,
  propertyName,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const [ratings, setRatings] = React.useState({
    overall: 5,
    cleanliness: 5,
    food: 4,
    owner: 5,
    water: 5,
    electricity: 5,
    security: 5,
    maintenance: 4,
  });

  const [reviewText, setReviewText] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onReviewSubmitted) {
      onReviewSubmitted({
        propertyId,
        propertyName,
        ...ratings,
        reviewText,
      });
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-xs font-semibold"
      >
        <Star className="mr-1.5 h-3.5 w-3.5 text-amber-500 fill-amber-500" />
        Write a Resident Review
      </Button>
    );
  }

  if (submitted) {
    return (
      <div className="p-4 bg-secondary-50 border border-secondary/20 rounded-xl text-xs text-secondary-dark flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
        <span>
          Thank you! Your verified resident review has been submitted for display.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white border border-border rounded-xl shadow-card space-y-4 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div>
          <h4 className="font-bold text-sm text-foreground">Submit Resident Review</h4>
          <p className="text-[11px] text-foreground-secondary">
            Only verified current and past residents can review.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-foreground-muted hover:text-foreground text-xs"
        >
          Cancel
        </button>
      </div>

      {/* Sub-ratings Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: "cleanliness", label: "Cleanliness" },
          { key: "food", label: "Food Quality" },
          { key: "owner", label: "Owner Behavior" },
          { key: "water", label: "Water Supply" },
          { key: "electricity", label: "Electricity Backup" },
          { key: "security", label: "Security & Gates" },
          { key: "maintenance", label: "Maintenance" },
          { key: "overall", label: "Overall Score" },
        ].map((cat) => (
          <div key={cat.key} className="space-y-1">
            <label className="text-[11px] font-semibold text-foreground-secondary block">
              {cat.label}
            </label>
            <select
              value={(ratings as any)[cat.key]}
              onChange={(e) =>
                setRatings({ ...ratings, [cat.key]: Number(e.target.value) })
              }
              className="w-full h-8 px-2 rounded-md border border-border bg-surface text-xs font-semibold focus:outline-none"
            >
              <option value="5">5 ★ (Excellent)</option>
              <option value="4">4 ★ (Good)</option>
              <option value="3">3 ★ (Average)</option>
              <option value="2">2 ★ (Poor)</option>
              <option value="1">1 ★ (Terrible)</option>
            </select>
          </div>
        ))}
      </div>

      {/* Review Text */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-foreground-secondary block">
          Your Experience &amp; Advice for Students
        </label>
        <textarea
          required
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="How is the Wi-Fi speed, mess food taste, deposit refund process, and neighborhood safety?"
          className="w-full p-2.5 rounded-lg border border-border focus:ring-1 focus:ring-primary focus:outline-none text-xs"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-[11px] text-foreground-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
          <span>Anti-fraud verified submission</span>
        </div>
        <Button type="submit" size="sm" className="bg-primary hover:bg-primary-light text-white text-xs font-bold">
          Submit Review
        </Button>
      </div>
    </form>
  );
}
