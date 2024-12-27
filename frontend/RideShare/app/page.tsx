import Header from "../app/components/Header";
import Hero from "../app/components/Hero";
import Banner from "./components/Banner";
import DownloadAppSection from "./components/DownloadAppSection";
import DriverSection from "./components/DriverSection";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Banner />
      <DownloadAppSection />
      <DriverSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
