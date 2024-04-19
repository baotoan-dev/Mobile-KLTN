export function createCvProject(type, row, col, cvIndex, part , moreCvProjects) {
    return {
        type: type,
        row: row,
        col: col,
        cvIndex: cvIndex,
        part: part,
        moreCvProjects: moreCvProjects,
    }
}

export function createMoreCvProject(time, link, participant, position, functionality, technology, index) {
    return {
        time: time,
        link: link,
        participant: participant,
        position: position,
        functionality: functionality,
        technology: technology,
        index: index,
    }
}