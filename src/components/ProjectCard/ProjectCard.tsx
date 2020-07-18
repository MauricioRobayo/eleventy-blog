import React, { FC } from 'react';
import { Project } from '../../types';
import styles from './ProjectCard.module.css';

const ProjectCard: FC<Project> = ({ name, summary, githubUrl }) => (
  <article className={styles.projectCard}>
    <h2>
      <a href={githubUrl}>{name.replace(/-/g, ' ')}</a>
    </h2>
    <p>{summary}</p>
  </article>
);

export default ProjectCard;
