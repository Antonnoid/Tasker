import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from './type';
import { RootState, useAppDispatch } from '../../../store/store';
import { projectsDel } from './projectsSlice';
import { useSelector } from 'react-redux';

function ProjectCard({ project }: { project: Project }): JSX.Element {
  const dispatch = useAppDispatch();
  const delTask = (): void => {
    dispatch(projectsDel(project.id));
  };
 
  const user = useSelector((store: RootState) => store.auth.user);

  return (
    <div className="projectCard_conteiner">
      {project.admin_id === user?.id && (
        <div className="projectCard__delBut">
          <button className="delBut" type="button" onClick={delTask}>
            X
          </button>
        </div>
      )}
      <Link className="projectCard_link" to={`/tasks/${project.id}`}>
        <div className="projectCard">
          <p>{project.name_project}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
