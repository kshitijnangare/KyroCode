import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Companies from '../components/home/Companies';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

const Home = () => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-black text-white selection:bg-white/20">
            <Navbar />
            <main className="w-full flex-1 flex flex-col">
                <Hero />
                <Companies />
                <Features />
                <Testimonials />
                <Pricing />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;