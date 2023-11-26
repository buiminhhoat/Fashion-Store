export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu từ chuỗi
}

export function isSubstringIgnoreCaseAndAccents(keyword, str) {
  const lowerCaseA = removeAccents(keyword.toLowerCase());
  const lowerCaseB = removeAccents(str.toLowerCase());
  return lowerCaseB.includes(lowerCaseA);
}

export function isStartWithLetter(str) {
  const newStr = removeAccents(str);
  const firstChar = newStr.charAt(0);
  return /^[a-zA-Z]/.test(firstChar);
}

export const generateUniqueId = () => {
  const timestamp = Date.now();
  return timestamp.toString() + Math.floor(Math.random() * 1000);
}