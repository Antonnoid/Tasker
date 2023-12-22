import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store/store';
import ProjectCard from './ProjectCard';
import './styles/Projects.css';
import { projectsMateInit } from './ProjectsMateSlice';

function ProjectsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const projectsMate = useSelector((store: RootState) => store.projectsMate.projects);
  
  useEffect(() => {
    dispatch(projectsMateInit());
  }, [dispatch]);

  return (
    <div className="projectList_container">
      <h1 className="project__name">Ваши проекты</h1>
      <div className="projectsList">
        {projectsMate.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
        <div className="projectCard__in">
        </div>
      </div>
    </div>
  );
}

export default ProjectsList;
