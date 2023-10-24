export const generateUniqueId = () => {
  const timestamp = Date.now();
  return timestamp.toString() + Math.floor(Math.random() * 1000);
}