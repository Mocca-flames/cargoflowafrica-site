import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import Hero from "@/components/home_page/Hero/Hero";
import About from "@/components/home_page/About/About";
import Services from "@/components/home_page/Services/Services";
import Industries from "@/components/home_page/Industries/Industries";
import Process from "@/components/home_page/Process/Process";
import Network from "@/components/home_page/Network/Network";
import Contact from "@/components/home_page/Contact/Contact";

export default function HomePage() {
  return (
    <>
      <Header immersive />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Industries />
        <Process />
        <Network />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
