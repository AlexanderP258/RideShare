import Header from "../app/components/Header";
import Hero from "../app/components/Hero";
import Banner from "./components/Banner";
import DownloadAppSection from "./components/DownloadAppSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Banner />
      <DownloadAppSection />
      <Footer />
    </div>
  );
}
