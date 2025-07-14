import React from 'react';
import Hero from '../components/Hero';
import Initiatives from '../components/Initiatives.tsx';

import Membership from '../components/Membership';
import Resources from '../components/Resources';
import CTA from '../components/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Initiatives />
     
      <Membership />
      <Resources />
      <CTA />
    </>
  );
};

export default HomePage;