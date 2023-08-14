import React, { useContext, useEffect } from "react";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import "../../scss/Features.scss";
import useAppTheme from "../../hooks/useAppTheme";

const featuresDesc = {
    "Article Creation":
        "Easily craft and share your ideas using our user-friendly article editor.",
    "Vibrant Community":
        "Join a thriving community where you can read, comment on, and discuss articles from diverse authors.",
    "Personalized Profiles":
        " Create a unique profile, showcase your articles, and connect with other like-minded individuals.",
    "Simplified Discovery":
        "Effortlessly find articles of interest through smart categorization and efficient search functionality.",
    "Engagement Insights":
        "Gain insights into your articles' impact with view counts, likes, and comments metrics for better audience engagement.",
};

const headings = Array.from(Object.keys(featuresDesc));
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
        <div className="features-container dflex dflex-column dflex-wrap lg:mt-[170px] sm:mt-[150px] mt-[120px]">
            <header className="heading">
                <h2 className='text-center font-semibold'>Key Features</h2>
                <p className="text-center text-xs mt-1">A perfect platform to show your writing creativity</p>
            </header>
            <div className="features-cards dflex wrap">
                <div id="cards">
                    {
                        headings.map((heading, ind) => {
                            return (
                                <div className="card border" style={{borderColor: 'var(--line-color) !important'}}>
                                    <div className={`card-content ${dark ? "dark" : "light"}`}>
                                        <div className="card-info-wrapper">
                                            <div className="card-info">
                                                <div className="card-info-title">
                                                    <h3 className="text-center lg:text-2xl text-xl font-semibold" style={{ color: 'var(--text-200)' }}>{heading}</h3>
                                                    <p className="text-center" style={{ color: 'var(--text-400)' }}>{featuresDesc[heading]}</p>
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