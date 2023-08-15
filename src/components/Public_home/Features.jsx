import React, { useEffect } from "react";
import "../../scss/Features.scss";
import useAppTheme from "../../hooks/useAppTheme";
import cardImg1 from "../../assets/features_card/card_img1.webp"
import cardImg2 from "../../assets/features_card/card_img2.webp"
import cardImg3 from "../../assets/features_card/card_img3.webp"
import cardImg4 from "../../assets/features_card/card_img4.webp"
import cardImg5 from "../../assets/features_card/card_img5.webp"
import cardImg6 from "../../assets/features_card/card_img6.webp"

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    offset: 150,
});

const featuresDesc = {
    "Article Creation":
        "Easily craft and share your ideas using our user-friendly article editor.",
    "Vibrant Community":
        "Join a thriving community where you can read, comment on, and discuss articles from diverse authors.",
    "Personalized Profiles":
        "Create a unique profile, showcase your articles, and connect with other like-minded individuals.",
    "Secure":
        "Rest assured knowing that your data and interactions are protected with state-of-the-art security measures, ensuring a safe and trustworthy environment for all users.",
    "Engagement Insights":
        "Gain insights into your articles' impact with view counts, likes, and comments metrics for better audience engagement.",
    "Advanced Search":
        "Discover articles quickly and precisely using our advanced search feature, enabling you to find content based on keywords, authors, and more.",
};


const headings = Array.from(Object.keys(featuresDesc));
const cardImg = [cardImg1, cardImg2, cardImg3, cardImg6, cardImg5, cardImg4]

const Features = () => {
    useEffect(() => {
        document.getElementById("cards").onmousemove = (e) => {
            for (const card of document.getElementsByClassName("card")) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };
    }, []);

    const { dark } = useAppTheme();

    return (
        <div className="features-container lg:mt-[170px] sm:mt-[150px] mt-[120px]">
            <header className="pub_heading" data-aos="fade up">
                <h2 className='text-center font-semibold'>Key Features</h2>
                <p className="text-center text-xs mt-1" style={{ color: 'red !important' }}>A perfect platform to show your writing creativity</p>
            </header>
            <div className="features-cards dflex wrap">
                <div id="cards" data-aos="fade up">
                    {
                        headings.map((heading, ind) => {
                            return (
                                <div className="card" key={ind}>
                                    <div className={`card-content ${dark ? "dark" : "light"}`}>
                                        <div className="card-info-wrapper">
                                            <img src={cardImg[ind]} alt={'card image'} className={`max-w-full block ${ind === 0 ? 'translate-y-[25%]' : ''} ${ind === 3 ? 'translate-y-[20px]' : ''}`} />
                                            <div className="card-info md:px-5 ">
                                                <div className="card-info-title">
                                                    <h3 className="text-center lg:text-2xl text-xl font-semibold" style={{ color: 'var(--text-200)' }}>{heading}</h3>
                                                    <p className="text-center text-xs" style={{ color: 'var(--text-400)' }}>{featuresDesc[heading]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Features;