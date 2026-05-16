
export const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};


export const setStorage = (key, value, event) => {
  localStorage.setItem(key, JSON.stringify(value));


  if (event) {
    window.dispatchEvent(new Event(event));
  }
};