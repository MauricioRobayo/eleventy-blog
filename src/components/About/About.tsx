import React, { FunctionComponent } from 'react';
import { Owner } from '../../types';

interface Props {
  headline: Owner['headline'];
  summary: Owner['summary'];
}

const About: FunctionComponent<Props> = ({ headline, summary }) => {
  return (
    <section id="about">
      {summary.split('\n').map((line: string, index: number) => (
        <p key={index}>{line}</p>
      ))}
    </section>
  );
};

export default About;
