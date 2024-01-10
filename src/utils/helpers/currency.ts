export const getCurrencySymbol = (value: string | null) => {
  if (value === 'uah') {
    return `UAH`
  } else if (value === 'byn') {
    return `Br`
  }else if (value === 'usd') {
    return '$'
  }else if (value === 'eur') {
    return `€`
  } else {
    return '$'
  }
}