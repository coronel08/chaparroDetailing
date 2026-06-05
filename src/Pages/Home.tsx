import { Helmet } from "react-helmet-async";
import ProcessSection from "../Components/ProcessSection";

function Home() {
    return (
        <>
            <Helmet>
                <title>Hertz Key Library</title>
                <meta
                    name="description"
                    content="Premium automotive detailing, paint correction, and ceramic coating in Los Angeles."
                />
                <meta property="og:title" content="Hertz Key Library" />
                <meta
                    property="og:description"
                    content="Meticulous detailing, paint correction, and ceramic coating for those who demand perfection."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://Hertzkeylibrary.com/" />
            </Helmet>

            {/* ── Hero ─────────────────────────────────────────────────── */}
            {/* <HeroSection /> */}

            {/* ── How it works ─────────────────────────────────────────── */}
            <ProcessSection />

            {/* ── Gallery ──────────────────────────────────────────────── */}
            {/* <GallerySection /> */}

            {/* ── Book Now CTA ─────────────────────────────────────────── */}
            {/* <BookingCTA /> */}

            {/* ── Testimonials ─────────────────────────────────────────── */}
            {/* <TestimonialsSection /> */}
        </>
    );
}

export default Home;
