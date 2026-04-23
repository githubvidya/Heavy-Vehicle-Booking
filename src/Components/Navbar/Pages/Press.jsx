import React from 'react'

const Press = () => {
   const cards = [
  {
    img: "https://media.istockphoto.com/id/164852595/photo/worker-climbing-machinery-on-site.webp?a=1&b=1&s=612x612&w=0&k=20&c=wRh3HqgdfL8c6USTijqMiGM14ll9FsArKVh-tybY94k=",
    text: "Vehicle is transforming heavy vehicle booking with a reliable platform that ensures fast access and efficient logistics solutions."
  },
  {
    img: "https://media.istockphoto.com/id/465151144/photo/colorful-truck-on-the-mountain-road.webp?a=1&b=1&s=612x612&w=0&k=20&c=P5u0ZhStFLSi8gp32rJx17ByIk5POc0nPIeVPallZn0=",
    text: "Our platform connects businesses with trusted drivers, making transportation smoother, safer, and more dependable across regions."
  },
  {
    img: "https://images.unsplash.com/photo-1686945127946-e6e9627c66ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYXZ5JTIwdmVoaWNsZXxlbnwwfHwwfHx8MA%3D%3D",
    text: "Vehicle continues to expand its network, offering scalable transport solutions for companies of all sizes and industries."
  },
  {
    img: "https://media.istockphoto.com/id/1098283506/photo/truck-driver-stock-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=dFfQaXLN2n51THAUiOc1jQz8z4QHiy0-3LSUfNJkc6o=",
    text: "With a focus on technology, Vehicle simplifies truck booking and improves delivery timelines for modern logistics needs."
  },
    {
    img: "https://images.unsplash.com/photo-1670509295484-df0c2512fec4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRydWNraW5nfGVufDB8fDB8fHww",
    text: "Our commitment to transparency ensures fair pricing and a seamless booking experience for every customer."
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661935334659-a4f95e515c3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRydWNrZXJ8ZW58MHx8MHx8fDA%3D",
    text: "Our commitment to transparency ensures fair pricing and a seamless booking experience for every customer."
  },
  {
    img: "https://media.istockphoto.com/id/1222998418/photo/truck-driver-stock-image-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=9yluloi0xKX5RtHh41aUKEZElWYGlvGFpux3DNkOeG0=",
    text: "Vehicle empowers businesses with reliable logistics support, helping them move goods efficiently and without delays."
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1664547606209-fb31ec979c85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9hZHxlbnwwfHwwfHx8MA%3D%3D",
    text: "From local deliveries to long-distance transport, Vehicle provides dependable heavy vehicle solutions you can trust."
  }
];
  return (
     <div className="pressSection">
       <div className="boxInChoose headindS ">
         <h1>Press & Media</h1>
         <span className='borderLine' ></span>
     </div>
      <div className="pressContainer">
        {cards.map((card, index) => (
          <div className="pressCard" key={index}>
            <img src={card.img} alt="press" />
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Press