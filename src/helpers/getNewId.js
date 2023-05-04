exports.getNewId = (usersList) => {
  const lastIndex = usersList.map((elem, index) => elem.id).reduce((a,b) => Math.max(a,b))
  return lastIndex + 1
}
