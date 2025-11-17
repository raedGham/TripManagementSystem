// src/components/StarRating.jsx
import React from "react";
import ReactStars from "react-stars";

const StarRating = ({ rating = 0, onRate }) => {
  return (
    <div className="flex">
      <ReactStars
        count={5} // total number of stars
        value={rating} // current rating value
        onChange={onRate} // function to call when user rates
        size={30} // star size in pixels
        color1="#d1d5db" // empty star color (Tailwind gray-300)
        color2="#facc15" // filled star color (Tailwind yellow-400)
      />
    </div>
  );
};

export default StarRating;
