export function createCvListExtraInformaion(cvExtraInformation) {
  if (cvExtraInformation && cvExtraInformation.length > 0) {
    const newCvInformation = cvExtraInformation.map((item, index) => {
      return {
        type: item.type,
        row: item.row,
        part: item.part,
        col: item.col,
        cvIndex: item.cvIndex,
        moreCvExtraInformations: item.moreCvExtraInformations.map((moreItem, moreIndex) => {
          return {
            position: moreItem.position,
            time: moreItem.time,
            company: moreItem.company,
            description: moreItem.description,
            index: moreItem.index,
            id: moreIndex,
          }
        }),
      }
    })

    return newCvInformation
  }
  else {
    return [];
  }
}
