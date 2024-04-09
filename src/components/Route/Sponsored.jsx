import React from "react";
import Marquee from "react-fast-marquee";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} sm:block bg-white py-0 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="marquee-inner-wrapper card-wrapper">
        <Marquee className="flex">
          <div className="mx-4 mt-8 lg:w-32  w-20 lg:h-24 h-16">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
              alt=""
            />
          </div>
          <div className="mx-4 mt-8 lg:w-32 w-20 lg:h-24 h-16">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8RlRYmUNXb5cX1L57Bho5NmLkC2R-W6yVQ&usqp=CAU"
              alt=""
            />
          </div>
          <div className="mx-4 mt-8 lg:w-32 w-20 lg:h-24 h-16">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="mx-4 mt-8 lg:w-32 w-20 lg:h-24 h-16">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="mx-4 mt-8 lg:w-32 w-20 lg:h-24 h-16">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="mx-4 mt-8 lg:w-32 w-20 lg:h-24 h-16">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="mx-4 mt-8 lg:w-32 w-20 lg:h-24 h-16">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="mx-4 mt-8 lg:w-32 w-20 lg:h-24 h-16">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Sponsored;
