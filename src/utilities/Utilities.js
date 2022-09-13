export const calculateStartingBalance = (prevBalance, incomesSum, share) => {
  return prevBalance + Math.round(incomesSum * share) / 100
}

export const sumArray = (array, property) => {
  return array.reduce((acc, el) => {
    return acc + (property ? el[property] : el)
  }, 0)
}

export const roundToTwoDecimals = (num) => {
  return Math.round(num * 100) / 100
}
