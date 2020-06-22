import React, { FunctionComponent } from 'react';
import { Project } from '../types';
import styles from './ProjectCard.module.css';

const ProjectCard: FunctionComponent<Project> = ({name, summary, githubUrl}: Project) => (
  <article className={styles.projectCard}>
    <h3>
      <a href={githubUrl}>{name.replace(/-/g, ' ')}</a>
    </h3>
    <p>
      {summary}
    </p>
    </article>
)

export default ProjectCard;