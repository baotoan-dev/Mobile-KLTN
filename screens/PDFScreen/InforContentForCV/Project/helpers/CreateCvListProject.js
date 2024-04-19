export function createCvListProject(cvProject) {
  if (cvProject && cvProject.length > 0) {
    const newProject = cvProject.map((item, index) => {
      return {
        type: item.type,
        row: item.row,
        part: item.part,
        col: item.col,
        cvIndex: item.cvIndex,
        moreCvProjects: item.moreCvProjects.map((moreItem, moreIndex) => {
          return {
            time: moreItem.time,
            link: moreItem.link,
            participant: moreItem.participant,
            position: moreItem.position,
            functionality: moreItem.functionality,
            technology: moreItem.technology,
            id: moreIndex,
          }
        }),
      }
    })

    return newProject
  }
  else {
    return [];
  }
}
