import React, { FunctionComponent } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface Props {
  projects: Project[] | undefined;
}

const Projects: FunctionComponent<Props> = ({ projects }: Props) => {
  if (!projects) {
    return null
  }
  return (
    <section>
      <h2>Projects</h2>
      <ul>
        {projects.map((project: Project) => <ProjectCard key={project.name} {...project}></ProjectCard>)}
      </ul>
    </section>
  );
}

export default Projects;