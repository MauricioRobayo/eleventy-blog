import React, { FunctionComponent } from 'react';
import { Basics } from '../types'

interface Props {
  isLoading: Boolean;
  basics: Basics;
}

const About: FunctionComponent<Props> = ({basics: { summary }, isLoading }: Props) => (
  <div>{summary?.split('\n').map(line => <p>{line}</p>)}</div>
)

export default About;