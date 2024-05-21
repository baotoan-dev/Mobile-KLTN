export function CreateCvExtraInformation(type, row, col, cvIndex, part, moreCvExtraInformations, padIndex) {
    return {
        type: type,
        row: row,
        col: col,
        cvIndex: cvIndex,
        part: part,
        padIndex: padIndex,
        moreCvExtraInformations: moreCvExtraInformations,
    }
}


export function CreateMoreCvExtraInformation(position, time, company, description, index, padIndex) {
    return {
        position: position,
        time: time,
        company: company,
        description: description,
        index: index,
        padIndex: padIndex,
    }
}