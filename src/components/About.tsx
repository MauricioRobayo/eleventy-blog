import React, { FunctionComponent } from 'react';
import { Basics } from '../types'

const About: FunctionComponent<Basics> = ({ summary }: Basics) => (
  <div>{summary?.split('\n').map(line => <p>{line}</p>)}</div>
)

export default About;