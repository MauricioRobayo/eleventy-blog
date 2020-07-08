import React, { FunctionComponent } from 'react';
import { Owner } from '../../types';

const Contact: FunctionComponent<Owner> = ({ profiles, email }: Owner) => {
  if (!profiles || !email) {
    return null;
  }
  return (
    <section id="contact">
      <p>Looking forward to hearing from you!</p>
      <p>I'm open to new challenges and opportunities.</p>
      <p>Drop me a line:</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </section>
  );
};

export default Contact;
