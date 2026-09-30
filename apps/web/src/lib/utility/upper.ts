export const upperCaseFirstLetter = (word: string): string => {
  return word[0].toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
}
