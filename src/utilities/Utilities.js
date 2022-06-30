export const calculateStartingBalance = (prevBalance, incomesSum, share) => {
  return prevBalance + Math.round(incomesSum * share) / 100
}

