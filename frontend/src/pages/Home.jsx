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
        <div >
            <Navbar />
            <main>
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