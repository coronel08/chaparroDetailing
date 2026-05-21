import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// import security from "../assets/security.png";
// import ai from "../assets/ai.png";

function ServicesBody2() {
    const services = [
        {
            title: "Certified Expertise",
            description:
                "AWS Solutions Architect & Developer certified professionals",
            icon: "🎓",
        },
        {
            title: "Agile Delivery",
            description:
                "PMP and Agile certified project management and accountability",
            icon: "⚡",
        },
        {
            title: "AI Solutions",
            description: "PhD-led intelligent automation and machine learning",
            icon: "🤖",
        },
        {
            title: "App Development",
            description: "Web, mobile, and enterprise applications",
            icon: "📱",
        },
        {
            title: "Cloud Architecture",
            description: "Expert cloud migration and optimization",
            icon: "☁️",
        },
        {
            title: "Smart Devices",
            description: "Smart Device development from hardware to firmware",
            icon: "🔒",
        },
    ];

    const clientStories = [
        {
            sector: "SECTOR: Energy & Utilites",
            img: undefined, // img: security,
            problem:
                "International energy and utilities metering company needed to meet stringent regional data residencyand compliance requirements for customers in multiple countries. Their challenge was to createisolated, cloud-based environments that ensured customer data remained within national borders whilestill allowing for seamless software integrations and secure data ingestion across systems.",
            solution:
                "Containerized proprietary simulators across isolated AWS accounts using AWS Organizations, enablingsecure, on-demand environments for each customer. This architecture allows for rapid provisioningtriggered by user registration and approval, giving clients immediate access to production-likesystems for testing and validating telemetry data. The isolated deployments ensure strictaccount-level separation, supporting customer data privacy and compliance while acceleratingonboarding and integration workflows.",
        },
        {
            sector: "SECTOR: Logistics & Manufacturing",
            img: undefined, // img: ai,
            problem:
                "Industry leading supply and distribution company sought to eliminate the manual effort required totrack pallets and their contents across large warehouse operations. Their goal was to integratecomputer vision and machine learning to automatically identify pallets, verify contents, and recordlocation data in real time — improving operational visibility and accuracy.",
            solution:
                "Developed a secure, vision-based analytics system using IoT devices and radio-connected cameras tocapture and encrypt real-time images of pallet jack operations. Images are streamed to the cloud,where AWS AI/ML services analyze pallet and site contents. The solution features end-to-end securityand role-based access, ensuring data integrity and privacy. It enhances visibility, reduces losses,improves traceability, and supports deliveries by verifying loads in transit and upon arrival. Thisscalable architecture combines edge computing with cloud AI to optimize both warehouse and fieldlogistics.",
        },
    ];

    const steps = [
        {
            num: "1",
            title: "Pre-Sales",
            desc: "Define scope, estimate effort, and align on solution goals.",
        },
        {
            num: "2",
            title: "Development",
            desc: "Build iteratively with transparent demos and client feedback.",
        },
        {
            num: "3",
            title: "Support",
            desc: "Deliver documentation and ongoing post-launch assistance.",
        },
    ];

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "white",
                    color: "darkblue",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, md: 8, xl: 14 },
                }}
            >
                {/* ----------------- Hexagon section  */}
                <p className="masked-text">STRATUS 6 Advantage</p>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", xl: "row" },
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            flex: { xs: "1", xl: "0 0 33.333%" },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ lineHeight: 2, color: "#333" }}
                        >
                            At Stratus6, we combine deep technical expertise
                            with real-world experience. Our team holds
                            industry-recognized certifications including AWS
                            Solutions Architect, AWS Security Professional, PMP,
                            and Agile credentials. More importantly, we've spent
                            years working across diverse industries through
                            consulting engagements, giving us the perspective to
                            understand your unique challenges and deliver
                            solutions that work.
                        </Typography>
                    </Box>
                    <Box sx={{ flex: { xs: "1", xl: "0 0 66.666%" } }}>
                        <div className="hexagon-grid-container">
                            <div className="hexagon-grid">
                                {services.map((service, index) => {
                                    return (
                                        <div
                                            key={index + service.title}
                                            className="hexagon-item"
                                        >
                                            <div className="hexagon-shape">
                                                <div className="hexagon-icon">
                                                    {service.icon}
                                                </div>
                                                <h3 className="hexagon-title">
                                                    {service.title}
                                                </h3>
                                                <p className="hexagon-description">
                                                    {service.description}{" "}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Box>
                </Box>
                {/* ----------------- CLient stories section */}
                <Typography variant="h3">Client Stories</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: "10px",
                        justifyContent: { md: "space-evenly" },
                    }}
                >
                    {clientStories?.map(
                        ({ sector, img, problem, solution }) => (
                            <ServicesCard
                                sector={sector}
                                img={img}
                                problem={problem}
                                solution={solution}
                            />
                        ),
                    )}
                </Box>
                {/* ------------------- 3 step solution */}
                <>
                    <p
                        className="card-title"
                        style={{
                            padding: 40,
                            textAlign: "center",
                            fontSize: "80px",
                            color: "blue",
                        }}
                    >
                        3 Step Solution
                    </p>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: "center",
                            justifyContent: "center",
                            gap: { xs: 6, md: 10 },
                            textAlign: "center",
                        }}
                    >
                        {steps?.map(({ num, title, desc }) => (
                            <Steps num={num} title={title} desc={desc} />
                        ))}
                    </Box>
                </>
            </Box>
        </>
    );
}

export default ServicesBody2;

type ServicesCardProps = {
    sector: string;
    img: any;
    problem: string;
    solution: string;
};

function ServicesCard({ sector, img, problem, solution }: ServicesCardProps) {
    return (
        <Card
            sx={{
                maxWidth: 700,
                borderRadius: 4,
                boxShadow: "0px 8px 24px rgba(0,0,0,0.15)", // custom shadow for softness
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6" fontWeight={900}>
                    {sector}
                </Typography>
                <img src={img} height="150px" />
                <Box sx={{ width: "100%", textAlign: "left", mt: 2 }}>
                    <p className="card-title">Problem:</p>
                    <Typography>{problem}</Typography>
                    <p className="card-title">Solution:</p>
                    <Typography>{solution}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

type StepsProps = {
    num: string;
    title: string;
    desc: string;
};

function Steps({ num, title, desc }: StepsProps) {
    return (
        <Box
            key={num}
            sx={{
                maxWidth: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #5a37ff, #00d4ff)",
                    color: "white",
                    fontSize: "36px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
            >
                {num}
            </Box>
            <Typography
                sx={{
                    fontWeight: 800,
                    fontSize: "20px",
                    color: "#213547",
                    mb: 1,
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{ fontSize: "16px", color: "#555", lineHeight: 1.4 }}
            >
                {desc}
            </Typography>
        </Box>
    );
}
