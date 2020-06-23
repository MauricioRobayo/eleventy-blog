import React, { FunctionComponent } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "../types";

interface Props {
  projects: Project[] | undefined;
}

const Projects: FunctionComponent<Props> = ({ projects }: Props) => {
  if (!projects) {
    return null;
  }
  return (
    <section id="projects">
      {projects.map((project: Project) => (
        <ProjectCard key={project.name} {...project}></ProjectCard>
      ))}
    </section>
  );
};

export default Projects;
