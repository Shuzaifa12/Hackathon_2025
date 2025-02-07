'use client';
import { useState, useEffect } from "react";

export default function DynamicPage(props: any) {
  const { id } = props.params;
  const localStorageKey = `reviews-${id}`; // Unique key for each product

  const [reviews, setReviews] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState("");

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const storedReviews = localStorage.getItem(localStorageKey);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Function to handle review submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim() !== "") {
      const updatedReviews = [...reviews, reviewText];
      setReviews(updatedReviews);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedReviews)); // Save to localStorage
      setReviewText("");
    }
  };

  // Function to delete a review
  const handleDeleteReview = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedReviews)); // Update localStorage
  };

  return (
    <div className="px-[40px] py-[32px] bg-[#F6F7F9]">
      {/* Heading */}
      <h1 className="font-semibold font-[PlusJakartaSans] text-2xl text-[rgba(89,103,128,100%)] uppercase">
        Reviews
      </h1>

      {/* Reviews Section */}
      <div className="border border-gray-300 p-4 mt-4 rounded-md">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews found.</p>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="border-b py-2 flex justify-between items-center">
                <span>{review}</span>
                <button
                  onClick={() => handleDeleteReview(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Review Form */}
      <form onSubmit={handleAddReview} className="mt-4">
        <div className="flex flex-col">
          <label className="font-medium">Input Your Review</label>
          <input
            type="text"
            placeholder="Your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 w-full mt-2"
          />
        </div>
        <button
          type="submit"
          className="bg-[#3563E9] text-white rounded-md px-6 py-2 mt-3 font-bold hover:bg-[#2749b7]"
        >
          Add Review
        </button>
      </form>
    </div>
  );
}
