import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store/store';
import ProjectCard from './ProjectCard';
import './styles/Projects.css';
import AddProjectForm from './AddProjectForm';
import { projectsInit } from './projectsSlice';
import { projectsMateInit } from './ProjectsMateSlice';
import { loadUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

function ProjectsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projects = useSelector((store: RootState) => store.projects.projects);
  const user = useSelector((store: RootState) => store.auth.user);
  const projectsMate = useSelector(
    (store: RootState) => store.projectsMate.projects
  );

  useEffect(() => {
    dispatch(projectsInit());
    dispatch(projectsMateInit());
  }, []);

  useEffect(() => {
    dispatch(loadUsers());
  }, [projects]);

  const [state, setState] = useState(false);

  const close = (): void => {
    setState((prev) => !prev);
  };

  const open = (): void => {
    setState((prev) => !prev);
  };

  if (!user) {
   navigate('/')
  }

  return (
    <div className="projectList_container">
      <h1 className="project__name">Мои проекты</h1>
      <div className="projectsList">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
        <div className="projectCard__in">
          <button type="button" className="button__modal_in" onClick={open}>
            <p className="add__text_in">Добавить проект</p>
          </button>
          {state && <AddProjectForm close={close} />}
        </div>
      </div>
      <h1 className="project__name">Участник проектов</h1>
      <div className="projectsList">
        {projectsMate.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;
