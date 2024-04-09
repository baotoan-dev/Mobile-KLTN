export function CreateCvExtraInformation(type, row, col, cvIndex, part, moreCvExtraInformations) {
    return {
        type: type,
        row: row,
        col: col,
        cvIndex: cvIndex,
        part: part,
        moreCvExtraInformations: moreCvExtraInformations,
    }
}


export function CreateMoreCvExtraInformation(position, time, company, description, index) {
    return {
        position: position,
        time: time,
        company: company,
        description: description,
        index: index,
    }
}