import React from "react";

const CarouselCard = ({ image, caption, handleDelete }) => {
  return (
    <div className="flex flex-col mb-4">
      <img
        src={`${image}`}
        alt={caption}
        className="h-40 w-60 object-cover"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <p
        dangerouslySetInnerHTML={{ __html: caption }}
        className="mt-2 text-gray-600"
      ></p>
      <div className="flex mt-2">
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-md shadow-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarouselCard;
