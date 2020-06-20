import React, { FunctionComponent } from 'react';
import { Project } from '../types';

const ProjectCard: FunctionComponent<Project> = (project: Project) => (
  <li>{project.name}</li>
)

export default ProjectCard;