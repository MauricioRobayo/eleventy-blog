import React, { FunctionComponent } from 'react';
import { Owner } from '../../types';

const About: FunctionComponent<Owner> = ({ headline, summary }: Owner) => {
  if (!headline || !summary) {
    return null;
  }
  return (
    <section id="about">
      {summary.split('\n').map((line: string, index: number) => (
        <p key={index}>{line}</p>
      ))}
    </section>
  );
};

export default About;
