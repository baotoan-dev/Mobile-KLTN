let dataMoney = [
    {
        id: 0,
        slaryMin: 0,
        slaryMax: 0,
    },
    {
      id: 1,
      slaryMin: 0,
      slaryMax: 1000000,
    },
    {
      id: 2,
      slaryMin: 1000000,
      slaryMax: 3000000,
    },
    {
      id: 3,
      slaryMin: 3000000,
      slaryMax: 5000000,
    },
    {
      id: 4,
      slaryMin: 5000000,
      slaryMax: 7000000,
    }
  ];
  
  dataMoney.forEach(item => {
    if (item.slaryMin === 0 && item.slaryMax === 0) {
      item.text = 'Tất cả';
      return;
    }
    item.text = `${item.slaryMin / 1000000} - ${item.slaryMax / 1000000} triệu VNĐ`;
  });
  
  export const updatedDataMoney = dataMoney;
  