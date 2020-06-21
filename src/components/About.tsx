import React, { FunctionComponent } from 'react';
import { Basics } from '../types';

const About: FunctionComponent<Basics> = ({ headline, summary }: Basics) => {
  if (!headline || !summary) {
    return null;
  }
  return (
    <section>
      {summary?.split('\n').map((line: string, index: number) => <p key={index}>{line}</p>)}
    </section>
  );
}

export default About;