import React, { FunctionComponent } from 'react';
import { Basics } from '../types'

const About: FunctionComponent<Basics> = ({ summary }: Basics) => (
  <section>
    {summary?.split('\n').map(line => <p>{line}</p>)}
  </section>
)

export default About;