import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={
            book.cover_image ||
            "https://placehold.co/600x400?text=No+Cover"
          }
          alt={book.title}
          className="h-64 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {book.title}
        </h2>

        <p className="text-sm text-gray-500">
          By {book.author}
        </p>

        <p>
          {book.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="badge badge-primary">
            {book.category}
          </span>

          <span className="font-bold text-lg">
            ৳{book.price}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span>
            Available: {book.available_copies}
          </span>

          <button className="btn btn-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
