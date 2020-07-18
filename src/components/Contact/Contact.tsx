import React, { FC } from 'react';
import { Owner } from '../../types';

interface Props {
  profiles: Owner['profiles'];
  email: Owner['email'];
}

const Contact: FC<Props> = ({ profiles, email }) => {
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
