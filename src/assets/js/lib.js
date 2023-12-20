export function calculateNDS(row, nds) {
  // Вычисление НДС от суммы
  row.rate = parseFloat(row.rateTxt)
  row.rate = (isNaN(row.rate)) ? 0 : row.rate
  row.resultRate = (row.rate/((100+nds)/100))
  row.resultRateTxt = row.resultRate.toFixed(2)
  row.ndsTxt = (row.rate - row.resultRate).toFixed(2)
  //resultRateTxt: '', ndsTxt: ''}]
  //.toLocaleString()
  console.log(row.resultRateTxt);
  return row
}

export function sortUPbyField(fieldName){
  // Сортировка массива объектов по полю по возрастанию
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

export function sortDOWNbyField(fieldName){
  // Сортировка массива объектов по полю по возрастанию
  return (a, b) => a[fieldName] < b[fieldName] ? 1 : -1;
}

