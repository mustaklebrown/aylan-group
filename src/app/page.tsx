import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ecosystem from '@/components/Ecosystem';
import CTA from '@/components/CTA';
import Trust from '@/components/Trust';
import Connect from '@/components/Connect';

export default function Home() {
  return (
    <main>
      <Hero imageSrc="/hero-bg.png" />
      <Ecosystem />
      <CTA imageSrc="/cta-image.png" />
      <Trust />
      <Connect mapSrc="/map.png" />
    </main>
  );
}
