// src/WorksGrid.jsx
import React, { useState, useEffect } from "react";
import GridItem from "./GridItem";
import { Link } from "react-router-dom";

const STRAPI_URL = "http://localhost:1337";

const WorksGrid = () => {
    const [fests, setFests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomepageFests = async () => {
            try {
                // Fetch all fests and populate their related event years to get images.
                // This assumes the first/most recent event year has the images we want for the homepage.
                const response = await fetch(`${STRAPI_URL}/api/fests?populate[event_years][populate][0]=bgImage&populate[event_years][populate][1]=textBgImage`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                const festData = data.data.map(fest => {
                    const latestYear = fest.attributes.event_years.data[0]?.attributes;
                    return {
                        id: fest.id,
                        key: fest.attributes.slug,
                        label: fest.attributes.name.toUpperCase(),
                        bg: latestYear?.bgImage?.data ? `${STRAPI_URL}${latestYear.bgImage.data.attributes.url}` : '',
                        textBg: latestYear?.textBgImage?.data ? `${STRAPI_URL}${latestYear.textBgImage.data.attributes.url}` : '',
                    };
                });
                setFests(festData);
            } catch (error) {
                console.error("Failed to fetch homepage fests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomepageFests();
    }, []);

    if (loading) {
        return <section className="works-grid"><h2 style={{textAlign: 'center', padding: '40px'}}>Loading Works...</h2></section>;
    }

    return (
        <section className="works-grid">
            {fests.map((fest) => (
                <Link key={fest.key} to={`/fest/${fest.key}`} className="grid-item-link">
                    <GridItem
                        label={fest.label}
                        bgImage={fest.bg}
                        textBgImage={fest.textBg}
                    />
                </Link>
            ))}
        </section>
    );
};

export default WorksGrid;