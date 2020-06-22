import React, { FunctionComponent } from 'react';
import { Project } from '../types';

const ProjectCard: FunctionComponent<Project> = ({displayName, summary, languages, githubUrl, website}: Project) => (
  <article>
    <h2>
      {displayName.toUpperCase()}
    </h2>
    <p>
      {summary}
    </p>
    <aside>
      <ul>
        {languages.map((language) => <li key={language}>{language}</li> )}
      </ul>
      <a href={githubUrl}>
        <svg>
          <use href="#logo-github"></use>
        </svg>
      </a>
      {website && <a href={website}>
        <svg>
          <use href="#logo-www"></use>
        </svg>
        </a>}
    </aside>
  </article>
)

export default ProjectCard;