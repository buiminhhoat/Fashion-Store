import {useLocation} from "react-router-dom";
import {useEffect} from "react";

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

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector('body').scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const ScrollToTopSmooth = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const bodyElement = document.querySelector('body');
    bodyElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};