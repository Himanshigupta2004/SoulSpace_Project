import React, { useEffect, useState } from 'react';
import './Events.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Events = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('events.json') // Assuming your JSON file is named events.json and is in the public folder
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const short = (des,len) =>{
    if(des.length > len){
        return des.slice(0, len) + '...';
    }
    return des;
  }
  return (
    <div className='events'>
        <div className='event-section'>
        <Slider {...settings}>
      {data.map((event, index) => (
        <div className='event-card' key={index}>
          <div className='event-image'>
            <img src={event.image} alt={event.event_name} />
          </div>
          <div className='event-details'>
            <h1 className='event-name'>{event.event_name}</h1>
            <p className='event-info'><b>Time:</b> {event.time}</p>
            <p className='event-info'><b>Date:</b>{event.date}</p>
            <p className='event-info'><b>Duration:</b> {event.duration}</p>
            <p className='event-info'><b>Organizer:</b>{event.Organizer}</p>
            <p className='event-info'>{short(event.description,80)}</p>
            <button className='reg-btn'>Register</button>
          </div>
        </div>
      ))}
      </Slider>
    </div>
    </div>
  );
};

export default Events;
