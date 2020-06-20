import React, { FunctionComponent } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface Props {
  projects: Project[];
}

const Projects: FunctionComponent<Props> = ({projects }: Props) => (
  <section>
  <h2>Projects</h2>
  <ul>
    {projects.map((project) => <ProjectCard {...project}></ProjectCard>)}
  </ul>
  </section>
)

export default Projects;