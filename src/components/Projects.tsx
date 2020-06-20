import React, { FunctionComponent } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface Props {
  projects: Project[];
}

const Projects: FunctionComponent<Props> = ({projects }: Props) => (
  <ul>
    {projects.map((project) => <ProjectCard {...project}></ProjectCard>)}
  </ul>
)

export default Projects;