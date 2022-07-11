import React from 'react';
import { LogoShowcase } from '@teambit/community.ui.logo-showcase';
import himan from '../images/himan.jpeg';
import leibman from '../images/leibman.jpeg';
import eli from '../images/eli.jpeg';
import tomi from '../images/tomi.jpeg';
import noam from '../images/noam.jpeg';
import roei from '../images/roei.jpeg';
import hagai from '../images/hagai.jpeg';
import yoni from '../images/yoni.jpeg';

const Logo = () => {
  return (
    <div style={{ overflow: 'hidden', paddingBottom: '25px' }}>
      <LogoShowcase
        images={[
          {
            src: himan, //Heymann
            alt: 'himan',
          },
          {
            src: leibman,
            alt: 'leibman',
          },
          {
            src: eli,
            alt: 'eli',
          },
          {
            src: tomi,
            alt: 'tomi',
          },
          {
            src: noam,
            alt: 'noam',
          },
          {
            src: roei,
            alt: 'roei',
          },
          {
            src: hagai,
            alt: 'hagai',
          },
          {
            src: yoni,
            alt: 'yoni',
          },
          {
            src: himan,
            alt: 'himan',
          },
          {
            src: leibman,
            alt: 'leibman',
          },
          {
            src: eli,
            alt: 'eli',
          },
          {
            src: tomi,
            alt: 'tomi',
          },
          {
            src: noam,
            alt: 'noam',
          },
          {
            src: roei,
            alt: 'roei',
          },
          {
            src: hagai,
            alt: 'hagai',
          },
          {
            src: yoni,
            alt: 'yoni',
          },
        ]}
      />
    </div>
  );
};

export default Logo;
