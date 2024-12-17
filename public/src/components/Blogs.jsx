import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Blog.css'
const Blogs = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(res2 => setData(res2))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    return (
        <div className='blog-sec'>
            <Slider {...settings}>
                {data.map((blog, index) => (
                    <div className='blog-card' key={index}>
                        <div className='blog-img'>
                            <img src={blog.image} alt={blog.topic} />
                        </div>
                        <div className='blog-detail'>
                            <h1 className='user-name'>{blog.user_name}</h1>
                            <h2 className='blog-topic'>{blog.topic}</h2>
                            <p className='blog-des'>{blog.description}</p>
                        </div>
                        <button className='read-more'>Read More</button>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Blogs;
