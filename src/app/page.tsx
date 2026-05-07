import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ecosystem from '@/components/Ecosystem';
import CTA from '@/components/CTA';
import Team from '@/components/Team';
import Trust from '@/components/Trust';
import Connect from '@/components/Connect';

export default function Home() {
  return (
    <main>
      <Hero imageSrc="/hero-bg.png" />
      <Ecosystem />
      <CTA imageSrc="/abdallah-pro.png" />
      <Team />
      <Trust />
      <Connect mapSrc="/map.png" />
    </main>
  );
}
