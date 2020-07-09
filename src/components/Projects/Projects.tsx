import React, { FunctionComponent } from 'react';
import ProjectCard from '../ProjectCard';
import { Portfolio, Project } from '../../types';

interface Props {
  projects: Portfolio['projects'];
}

const Projects: FunctionComponent<Props> = ({ projects }: Props) => {
  return (
    <section id="projects">
      {projects.map((project: Project) => (
        <ProjectCard key={project.name} {...project}></ProjectCard>
      ))}
    </section>
  );
};

export default Projects;
