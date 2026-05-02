import React, { useState } from "react";
import "./style.css";

import AboutPage from "../../assets/category-images/about.gif";
//import AboutPage2 from "../../assets/category-images/aboutPage2.gif";
import FreshDishesIcon from '../../assets/category-images/fresh-dishes-icon.jpg';
import VariousMenuIcon from '../../assets/category-images/various-menu-icon.jpg';
import WellServiceIcon from '../../assets/category-images/well-service-icon.jpg';
import FastDeliveryIcon from '../../assets/category-images/fast-delivery-icon.jpg';
import feedback1 from "../../assets/category-images/feedback1.jpg";
import feedback2 from "../../assets/category-images/feedback2.jpg";
import feedback3 from "../../assets/category-images/feedback3.jpg";
import feedback4 from "../../assets/category-images/feedback4.jpg";
import feedback5 from "../../assets/category-images/feedback5.jpg";
import feedback6 from "../../assets/category-images/feedback6.jpg";
import quoteImage from "../../assets/category-images/double-quotes_7350738.png";

const feedbackData = [
    {
        name: "Isabell",
        role: "Guest",
        stars: 5,
        review: "The ambiance at your restaurant is simply enchanting! From the warm lighting to the cozy seating, dining here feels like a delightful escape from the hustle and bustle of everyday life.",
        imgSrc: feedback1,
    },
    {
        name: "Noah",
        role: "Guest",
        stars: 5,
        review: "I must commend your chef for crafting such exquisite dishes. Each bite was a symphony of flavors, expertly balanced and beautifully presented. It's evident that great care and attention to detail go into every dish served here.",
        imgSrc: feedback2,
    },
    {
        name: "Sophia",
        role: "Guest",
        stars: 5,
        review: "The service at your restaurant is impeccable. From the moment we stepped in, we were greeted with genuine warmth and hospitality. The staff were attentive and knowledgeable, making our dining experience truly memorable.",
        imgSrc: feedback3,
    },
    {
        name: "Ava",
        role: "Guest",
        stars: 5,
        review: "I appreciate the emphasis on sourcing local, sustainable ingredients in your menu. Not only does it contribute to the community, but it also enhances the freshness and quality of the dishes. It's refreshing to see a restaurant committed to ethical and responsible practices.",
        imgSrc: feedback4,
    },
    {
        name: "Lucas",
        role: "Guest",
        stars: 5,
        review: "Kudos to your team for accommodating my dietary restrictions with such grace and creativity. Despite my allergies, I was still able to enjoy a delicious meal tailored to my needs. It's rare to find such flexibility and dedication to customer satisfaction.",
        imgSrc: feedback5,
    },
    {
        name: "Ethan",
        role: "Guest",
        stars: 5,
        review: "The attention to detail in every aspect of the dining experience is commendable. From the elegant table settings to the thoughtful little touches like complimentary bread and amuse-bouche, it's evident that your restaurant strives for perfection in every detail.",
        imgSrc: feedback6,
    },
];

const FeedbackSection = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(feedbackData[0]);

    const showFeedback = (index) => {
        setSelectedFeedback(feedbackData[index]);
    };

    return (
        <section className="feedback">
            <div className="feedback-main-div">
                <div className="Feedback-main">
                    {feedbackData.map((feedback, index) => (
                        <img
                            key={index}
                            src={feedback.imgSrc}
                            alt={feedback.name}
                            className="profile-pic"
                            onClick={() => showFeedback(index)}
                        />
                    ))}
                </div>
                <div className="feedback-container">
                    <div className="testimonial">
                        <div className="testimonial-text">
                            <p className="name">{selectedFeedback.name}</p>
                            <div className="stars">
                                {Array(selectedFeedback.stars)
                                    .fill(0)
                                    .map((_, i) => (
                                        <span key={i} className="feedback-star">
                                            &#9733;
                                        </span>
                                    ))}
                            </div>
                            <p className="role">{selectedFeedback.role}</p>
                            <p className="review-para">"{selectedFeedback.review}"</p>
                            <img src={quoteImage} alt="Quote" className="Quote-image" />
                        </div>
                    </div>
                    <div className="feedback-header">
                        <h1>Customer Feedback</h1>
                        <p>
                            "Your feedback is the compass guiding us through the journey of improvement, shaping a path paved with excellence."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <>
            {/* Parallax Section */}
            <div className="parallax"></div>

            <section className="py-3 py-md-5 py-xl-10">
                <div className="container cont-about">
                    <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                        <div className="col-12 col-lg-6 col-xl-5">
                            <img className="img-fluid rounded" loading="lazy" src={AboutPage} alt="About Foodie" />
                        </div>
                        <div className="col-12 col-lg-6 col-xl-7">
                            <div className="row justify-content-xl-center">
                                <div className="col-12 col-xl-11">
                                    <h2 className="h1 mb-3">Who Are We?</h2>
                                    <p className="lead fs-4 text-secondary mb-3">We are Foodie, dedicated to providing the best food ordering experience. Our mission is to deliver delicious meals to your doorstep.</p>
                                    <p className="mb-5">At Foodie, we believe in quality ingredients and exceptional service. Our chefs craft each dish with care, ensuring that every bite is a delight. Join us in our culinary journey and experience the joy of great food.</p>
                                    <div className="row gy-4 gy-md-0 gx-xxl-5">
                                        <div className="col-12 col-md-6">
                                            <div className="d-flex">
                                                <div className="me-4 text-primary icon-container">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="mb-3">Quality Ingredients</h4>
                                                    <p className="text-secondary mb-0">At Foodie, we source only the freshest ingredients to create mouthwatering dishes.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="d-flex">
                                                <div className="me-4 text-primary icon-container">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                                                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="mb-3">Fast Delivery</h4>
                                                    <p className="text-secondary mb-0">We pride ourselves on prompt delivery, ensuring that your food arrives hot and fresh.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amenities Section */}
                        <div className="amenities-section">
                            <div className="header">
                                <h1>Amenities</h1>
                                <div className="divider"></div>
                            </div>
                            <div className="features">
                                <div className="feature">
                                    <img src={FreshDishesIcon} alt="Fresh Dishes" />
                                    <h3>Fresh Dishes</h3>
                                    <p>
                                        Our dishes are prepared daily with the freshest ingredients to ensure the highest quality and taste. We
                                        source locally to bring you the best of what the season has to offer.
                                    </p>
                                </div>
                                <div className="feature">
                                    <img src={VariousMenuIcon} alt="Various Menu" />
                                    <h3>Various Menu</h3>
                                    <p>
                                        We offer a diverse menu that caters to all tastes and dietary needs. From vegan and gluten-free options to
                                        classic comfort foods, there's something for everyone.
                                    </p>
                                </div>
                                <div className="feature">
                                    <img src={WellServiceIcon} alt="Well Service" />
                                    <h3>Well Service</h3>
                                    <p>
                                        Our staff is dedicated to providing exceptional service to make your dining experience memorable. We pride
                                        ourselves on our friendly and attentive service.
                                    </p>
                                </div>
                                <div className="feature">
                                    <img src={FastDeliveryIcon} alt="Fast Delivery" />
                                    <h3>Fast Delivery</h3>
                                    <p>
                                        Enjoy your favorite dishes from the comfort of your home with our fast and reliable delivery service. We
                                        ensure that your food arrives hot and fresh, every time.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <FeedbackSection />

                        {/* <div className="col-12 mt-4">
                            <img src={AboutPage2} className="img-fluid rounded" alt="Responsive" />
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    );

}

export default AboutSection;
