module.exports = function dateFormat (date = new Date()) {
  const month = setTwoDigits((date.getMonth() + 1).toString())
  const day = setTwoDigits(date.getDate())
  return `${date.getFullYear()}-${month}-${day}`
}

// To solve HTML input date issue
function setTwoDigits (num) {
  return ('0' + num).slice(-2)
}
