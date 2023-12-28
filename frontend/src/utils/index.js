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

export function convertDateTimeFormat(dateTimeString) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour12: false, // Đặt giờ theo định dạng 24 giờ
  };

  const dateTime = new Date(dateTimeString);
  const formattedDateTime = dateTime.toLocaleDateString('vi-VN', options);

  // Tách giờ và phút từ chuỗi định dạng
  const [time, date] = formattedDateTime.split(' ');

  // Chia giờ và phút
  const [hour, minute] = time.split(':');

  // Định dạng lại giờ với số 0 phía trước khi cần thiết
  const formattedHour = hour.padStart(2, '0');

  // Kết hợp lại và trả về kết quả cuối cùng
  return `${formattedHour}:${minute} ${date}`;
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