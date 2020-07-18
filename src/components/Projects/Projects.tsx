import React, { FC } from 'react';
import ProjectCard from '../ProjectCard';
import { Portfolio, Project } from '../../types';

interface Props {
  projects: Portfolio['projects'];
}

const Projects: FC<Props> = ({ projects }) => {
  return (
    <section id="projects">
      {projects.map((project: Project) => (
        <ProjectCard key={project.name} {...project}></ProjectCard>
      ))}
    </section>
  );
};

export default Projects;
