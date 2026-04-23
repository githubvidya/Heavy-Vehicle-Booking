import React, { useState, useEffect } from "react";
import "./testimonial.css";
import  a from "../../photo/a.jpeg"
import  a1 from "../../photo/a1.jpeg"
import  rj from "../../photo/Rajat.jpeg"
import  vt from "../../photo/vt.jpeg"
// import  vtt from "../../photo/pic1.jpeg"

const testimonials = [
  {
    name: "Cantika",
    image:a,
    review: "Amazing service! Totally satisfied."
  },
  {
    name: "Salsabila",
    image: a1,
    review: "Very professional and quick support."
  },
  {
    name: "Rajat Shroff",
    image: rj,
    review: "Loved the quality. Highly recommended!"
  },
  {
    name: "Vidya Tiwari",
    image: vt,
    review: "Great experience overall!"
  }
];

// 👇 triple data for smooth infinite loop
const loopData = [...testimonials, ...testimonials, ...testimonials];

const Testimonial = () => {
  const total = testimonials.length;

  // 👇 start from middle
  const [index, setIndex] = useState(total);
  const [transition, setTransition] = useState(true);

  // ✅ AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ HANDLE RESET (no jump)
  const handleTransitionEnd = () => {
    if (index >= total * 2) {
      setTransition(false);
      setIndex(total);
    }
  };

  // ✅ re-enable transition after reset
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  }, [transition]);

  return (
    <div className="testimonial">

      <div className="allThingInTest">
        <div className="textInTestimonial">
          <h1 className="textIntext">
            Explore real experiences shared by our valued customers and see how we’ve made a difference through our dedicated service.
          </h1>
          <h1 className="textInText2" >Sincerely, The Vehicle Team</h1>
        </div>

        <div className="slider">
          <div
            className="cards"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: transition ? "transform 0.5s ease" : "none"
            }}
          >
            {loopData.map((item, i) => (
              <div className="card" key={i}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>"{item.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;