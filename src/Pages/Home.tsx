import { Helmet } from "react-helmet-async";
import HeroSection from "../Components/HeroSection";
import ProcessSection from "../Components/ProcessSection";
import GallerySection from "../Components/GallerySection";
import BookingCTA from "../Components/BookingCTA";
import TestimonialsSection from "../Components/TestimonialsSection";

function Home() {
    return (
        <>
            <Helmet>
                <title>Chaparro Detailing</title>
                <meta
                    name="description"
                    content="Premium automotive detailing, paint correction, and ceramic coating in Los Angeles."
                />
                <meta property="og:title" content="Chaparro Detailing" />
                <meta
                    property="og:description"
                    content="Meticulous detailing, paint correction, and ceramic coating for those who demand perfection."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://chaparrodetailing.com/" />
            </Helmet>

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <HeroSection />

            {/* ── How it works ─────────────────────────────────────────── */}
            <ProcessSection />

            {/* ── Gallery ──────────────────────────────────────────────── */}
            <GallerySection />

            {/* ── Book Now CTA ─────────────────────────────────────────── */}
            <BookingCTA />

            {/* ── Testimonials ─────────────────────────────────────────── */}
            <TestimonialsSection />
        </>
    );
}

export default Home;
