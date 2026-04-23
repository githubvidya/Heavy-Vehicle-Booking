import React from "react";
import "./AboutHighlights.css";

const AboutHighlights = () => {
  const points = [
    "Fast and reliable heavy vehicle booking anytime, anywhere.",
    "Verified trucks, trailers, and transport partners for safe delivery.",
    "Real-time tracking for complete shipment transparency.",
    "Affordable pricing with no hidden charges or delays.",
    "24/7 customer support for smooth transportation experience.",
  ];

  return (
    <>
       <section className="about-section">

      <div className="about-list">
        {points.map((text, index) => (
          <p key={index} className="about-item">
            {text}
          </p>
        ))}
      </div>
    </section>
    </>
  );
};

export default AboutHighlights;