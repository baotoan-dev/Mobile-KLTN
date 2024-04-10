export function createCvListExtraInformaion(cvExtraInformation) {
  if (cvExtraInformation && cvExtraInformation.length > 0) {
    const newExtraInformationList = cvExtraInformation.map((item, index) => ({
      id: index,
      type: item.type,
      time: item.moreCvExtraInformations[0].time,
      position: item.moreCvExtraInformations[0].position,
      company: item.moreCvExtraInformations[0].company,
      description: item.moreCvExtraInformations[0].description,
    }));
    return newExtraInformationList
  }
  else {
    return [];
  }
}
