import React, { useState, useEffect } from "react";
import "../Home/Home.css";

const slides = [
  {
    image: "https://images.pexels.com/photos/12494349/pexels-photo-12494349.jpeg",
    heading: "Dump Truck",
    para: "A dump truck is used for transporting loose materials like sand, gravel, or demolition waste. It unloads materials by lifting its bed."
  },
  {
    image: "https://images.pexels.com/photos/7910058/pexels-photo-7910058.jpeg",
    heading: "Excavator",
    para: "An excavator is used for digging and construction work. It has a long arm and rotating cab for heavy-duty tasks."
  },
  {
    image: "https://images.pexels.com/photos/10300254/pexels-photo-10300254.jpeg",
    heading: "Bulldozer",
    para: "A bulldozer is a strong machine with a front blade used to push soil, sand, and debris in construction sites."
  },
  {
    image: "https://images.pexels.com/photos/29502220/pexels-photo-29502220.jpeg",
    heading: "Crane Truck",
    para: "A crane truck is used to lift and move heavy materials using a mounted crane."
  },
  {
    image: "https://images.pexels.com/photos/29470165/pexels-photo-29470165.jpeg",
    heading: "Road Roller",
    para: "A road roller compacts soil and asphalt to make roads smooth and durable."
  },
  {
    image: "https://images.pexels.com/photos/30156066/pexels-photo-30156066.jpeg",
    heading: "Concrete Mixer Truck",
    para: "This truck mixes and transports concrete to construction sites while keeping it from hardening."
  }
];

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 600);

    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`slider ${fade ? "fade-in" : "fade-out"} , "sliderFull" `}>
      <img src={slides[index].image} alt="slide" />
    <div className="sliderDitels">
          <h2 className="bg " >{slides[index].heading}</h2>
      <p className="bg" >{slides[index].para}</p>
    </div>
    </div>
  );
};

export default Slider;