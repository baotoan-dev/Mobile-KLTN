export function createCvListProject(cvProject) {
    if (cvProject && cvProject.length > 0) { 
      const newProjectList = cvProject.map((item, index) => ({
        id: index,
        type: item.type,
        time: item.moreCvProjects[0].time,
        link: item.moreCvProjects[0].link,
        participant: item.moreCvProjects[0].participant,
        position: item.moreCvProjects[0].position,
        functionality: item.moreCvProjects[0].functionality,
        technology: item.moreCvProjects[0].technology,
      }));
      return newProjectList;
    }
    else {
      return [];
    }
  }
  