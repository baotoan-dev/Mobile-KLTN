export function createCvProject(type, row, col, cvIndex, part , moreCvProjects, padIndex) {
    return {
        type: type,
        row: row,
        col: col,
        cvIndex: cvIndex,
        part: part,
        moreCvProjects: moreCvProjects,
        padIndex: padIndex,
    }
}

export function createMoreCvProject(time, link, participant, position, functionality, technology, index, padIndex, name) {
    return {
        name: name,
        time: time,
        link: link,
        participant: participant,
        position: position,
        functionality: functionality,
        technology: technology,
        index: index,
        padIndex: padIndex,
    }
}