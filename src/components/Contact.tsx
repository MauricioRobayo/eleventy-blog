import React, { FunctionComponent } from 'react';
import Profiles from './Profiles';
import {Basics} from '../types';

const Contact: FunctionComponent<Basics> = ({profiles, email}: Basics) => {
  if (!profiles || !email) {
    return null; 
  }
  return (
    <section id="contact">
      <p>Looking forward to hearing from you!</p>
      <p>I'm open to new challenges and opportunities.</p>
      <p>Drop me a line:</p>
      <p><a href={`mailto:${email}`}>{email}</a></p>
      <Profiles profiles={profiles}></Profiles>
    </section>
  );
}

export default Contact;