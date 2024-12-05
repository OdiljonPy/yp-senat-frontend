import Applications from "@/sections/common/Applications";
import Links from "@/sections/common/Links";
import About from "@/sections/common/About";
import Comissions from "@/sections/home/Commissions";
import Hero from "@/sections/home/Hero";
import News from "@/sections/home/News";
import Projects from "@/sections/home/Projects";
import Regional from "@/sections/home/Regional";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Comissions />
      <Regional />
      <News />
      <Projects />
      <Applications />
      <Links />
    </main>
  );
}
