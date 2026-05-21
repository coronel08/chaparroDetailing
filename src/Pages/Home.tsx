import { Helmet } from "react-helmet-async";
import {
    Box,
    Container,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "@mui/icons-material/Map";
import Marquee from "react-fast-marquee";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Backup } from "@mui/icons-material";

import "leaflet/dist/leaflet.css";
// import bg1 from "../assets/bg1.png";
// import mobiLogo from "../assets/Mobi,_Inc._logo.png";
// import rainbirdLogo from "../assets/rain-bird-logo-png-transparent.png";
// import hondaLogo from "../assets/Honda_Logo.svg.png";
// import usaMap from "../assets/USAMAP.jpg";
import AccordionCard from "../Components/AccordionCard";
import GridCard from "../Components/Card";
import StarBG from "../Components/StarBG";
import ServicesBody2 from "../Components/ServicesBody2";

function Home() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    console.log("is small screen?", isSmallScreen);

    return (
        <>
            <Helmet>
                <title>Stratus6</title>
                <meta
                    name="description"
                    content="Tech consulting agency focused on IT Solutions, app development, cloud development and more"
                />
                <meta property="og:title" content="Stratus6" />
                <meta
                    property="og:description"
                    content="Tech consulting agency focused on IT Solutions, app development, cloud development and more"
                />
                {/* <meta property="og:image" content="https://yourdomain.com/banner.png" /> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://stratus6.com" />
                <link rel="canonical" href="https://stratus6.com/" />
            </Helmet>
            <Box id="home" component="main">
                <Container
                    maxWidth={false}
                    className="header-content"
                    sx={{ height: { xs: "500px", md: "100vh" } }}
                >
                    {/* Image section with overlay */}
                    <>
                        {/* <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${bg1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
              }}
            /> */}
                        <StarBG
                            starCount={300}
                            starColor="#99ccff"
                            speed={0.2}
                        />
                        {/* Dark Overlay */}
                        <Box
                            className="main-body-overlay"
                            sx={{
                                backgroundColor: {
                                    xs: "rgba(0, 0, 0, 0.4)",
                                    md: "rgba(0, 0, 0, 0.7)",
                                },
                            }}
                        />
                    </>

                    {/* Header section content */}
                    <Box className="header-container">
                        <Box className="header-text-container">
                            <Typography
                                variant="h1"
                                sx={{ fontFamily: "orbitron" }}
                            >
                                Stratus<span style={{ color: "blue" }}>6</span>
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ pt: 4 }}>
                            Building innovative software solutions and
                            delivering expert consulting to help businesses
                            scale and succeed.
                        </Typography>
                        <PublicIcon
                            className="icon-rock"
                            sx={{ fontSize: 60 }}
                        />
                    </Box>
                </Container>

                {/* Body section */}
                <Box
                    component="section"
                    sx={{
                        background: "white",
                        px: { xs: 3, sm: 2, lg: 20 },
                        py: 5,
                    }}
                >
                    <Grid container spacing={4}>
                        {/* -------- */}
                        <GridCard
                            title="Security"
                            icon={<SecurityIcon sx={{ mr: 1 }} />}
                        >
                            <Typography variant="body2">
                                Our engineers deliver secure, scalable, and
                                high-performing applications. From web and
                                mobile to enterprise systems, we build
                                technology that drives real business value.
                            </Typography>
                        </GridCard>
                        {/* ---------- */}
                        <GridCard
                            title="Consulting:"
                            icon={<CalendarIcon sx={{ mr: 1 }} />}
                        >
                            <Typography variant="body2">
                                We partner with clients to align technology
                                strategy with business goals. Our consulting
                                engagements focus on clarity, measurable
                                outcomes, and long-term impact.
                            </Typography>
                        </GridCard>
                        {/* --------- */}
                        <GridCard
                            title="Cloud/On-Prem"
                            icon={<Backup sx={{ mr: 1 }} />}
                        >
                            <Typography variant="body2">
                                Whether it’s cloud, on-premise, or hybrid — we
                                design and implement environments that are
                                reliable, cost-efficient, and future-ready.
                            </Typography>
                        </GridCard>
                    </Grid>
                </Box>

                {/* Body Section 2 */}
                <Container className="body2-container">
                    <>
                        <AccordionCard defaultExpanded={true} title="About Us:">
                            <Box
                                sx={{
                                    display: "flex",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: "30px",
                                }}
                            >
                                <Typography>
                                    Stratus6 was founded in 2025 with a vision
                                    to bridge the gap between technology and
                                    business outcomes. Our team of experienced
                                    engineers and consultants brings years of
                                    hands-on expertise across multiple
                                    industries.
                                </Typography>
                                <Typography>
                                    We believe great technology starts with
                                    understanding people and processes. By
                                    combining technical depth with business
                                    insight, we deliver solutions that are
                                    practical, scalable, and sustainable.
                                </Typography>
                                <Typography>
                                    From custom software to digital
                                    transformation consulting, Stratus6 is
                                    committed to helping organizations innovate
                                    with confidence.
                                </Typography>
                            </Box>
                        </AccordionCard>
                        <AccordionCard
                            defaultExpanded={false}
                            title="Services Offered:"
                        >
                            <Box
                                sx={{
                                    display: { md: "flex" },
                                    justifyContent: "center",
                                    gap: 10,
                                }}
                            >
                                <ul>
                                    <li>Custom Software Development</li>
                                    <li>Cloud Architecture & Migration</li>
                                    <li>Data & Analytics Solutions</li>
                                    <li>Technology Strategy Consulting</li>
                                </ul>
                                <ul>
                                    <li>Enterprise Systems Integration</li>
                                    <li>Mobile & Web Applications</li>
                                    <li>Security & Compliance Reviews</li>
                                    <li>Managed IT & Support Services</li>
                                </ul>
                            </Box>
                        </AccordionCard>
                        <AccordionCard
                            defaultExpanded={false}
                            title="Industries We Serve:"
                        >
                            <Box
                                sx={{
                                    display: { md: "flex" },
                                    gap: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {/* <Box
                                    component="img"
                                    className="usa-map-image"
                                    src={""}
                                    alt="usaMap"
                                    sx={{
                                        maxWidth: { xs: "100%", md: "500px" },
                                    }}
                                /> */}
                                <div>
                                    <Typography variant="h5">
                                        Experts in:
                                    </Typography>
                                    <ul>
                                        <li>
                                            IOT (Internet of Things)
                                            Connectivity
                                        </li>
                                        <li>Manufcaturing</li>
                                        <li>Sutainability</li>
                                        <li>Mobile App Development</li>
                                        <li>Software Development</li>
                                    </ul>
                                </div>
                            </Box>
                        </AccordionCard>
                    </>
                </Container>
                <Box sx={{ paddingY: 10 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: "center",
                            pb: 8,
                            px: 1,
                            fontWeight: "800",
                        }}
                    >
                        {/* {isSmallScreen ? "Trusted By:" : "Clients Serviced:"} */}
                        Trusted By:
                    </Typography>
                </Box>
            </Box>

            <ServicesBody2 />

            {/* Contact Us */}
            <Box
                id="contact"
                component="section"
                sx={{
                    background: "white",
                    color: "darkblue",
                    px: { xs: 0, sm: 2, lg: 20 },
                    py: 5,
                }}
            >
                <Divider />
                <Container>
                    <Box
                        sx={{
                            display: { md: "flex" },
                            flexDirection: { xs: "column", lg: "row" },
                            padding: 2,
                            // gap: 10,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="h4">
                                <PhoneIcon sx={{ mr: 1 }} /> Contact Us
                            </Typography>
                            <Box sx={{ maxWidth: "350px", height: "auto" }}>
                                {/* <p>
                  <span style={{ fontWeight: "bold" }}>Address: </span>
                  <a
                    // href="https://www.google.com/maps?q=336+N+Gaffey+St+Floor+2,+San+Pedro,+CA+90731"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}>
                    TBD
                  </a>
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Phone Number: </span>
                  <a href="tel:+1TBD" style={{ color: "inherit", textDecoration: "none" }}>
                    TBD
                  </a>
                </p> */}
                                <p>
                                    <span style={{ fontWeight: "bold" }}>
                                        Email:{" "}
                                    </span>
                                    <a
                                        href="mailto:business@stratus6.com"
                                        style={{
                                            color: "inherit",
                                            textDecoration: "none",
                                        }}
                                    >
                                        business@stratus6.com
                                    </a>
                                </p>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="h4">
                                <MapIcon sx={{ mr: 1 }} /> Map
                            </Typography>
                            <Box
                                sx={{
                                    width: { xs: "330px", md: "600px" },
                                    height: "300px",
                                    border: "2px solid black",
                                }}
                            >
                                <MapContainer
                                    style={{ height: "100%", width: "100%" }}
                                    center={[33.743, -118.2926]}
                                    zoom={16}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        // attribution="&copy; OpenStreetMap contributors"
                                    />
                                    <Marker position={[33.743, -118.2926]}>
                                        <Popup>
                                            <h5>Stratus6</h5>
                                            {/* <p>336 N Gaffey St Floor 2, San Pedro, CA 90731</p> */}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        </Box>
                    </Box>
                </Container>
                <Divider />
            </Box>
        </>
    );
}

export default Home;
