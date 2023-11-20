export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu từ chuỗi
}

export function isSubstringIgnoreCaseAndAccents(keyword, str) {
  const lowerCaseA = removeAccents(keyword.toLowerCase());
  const lowerCaseB = removeAccents(str.toLowerCase());
  return lowerCaseB.includes(lowerCaseA);
}

export function startsWithLetter(inputCategoryValue) {
  const firstChar = inputCategoryValue.charAt(0);
  return /^[a-zA-Z]/.test(firstChar);
}