import React, { FunctionComponent } from 'react';

interface Props {
  pages: Page[];
}

interface Page {
  name: string;
  url?: string;
}


const Menu: FunctionComponent<Props> = ({ pages }: Props) => (
  <nav>
    {pages.map(({name, url = ''}) => {
      if (url) {
        return <a href={url}>{name}</a>;
      }
      return <a href={`#${name.toLowerCase()}`}>{name}</a>;
    } )}
  </nav>
);

export default Menu;