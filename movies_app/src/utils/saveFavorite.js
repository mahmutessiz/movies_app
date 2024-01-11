// Save to local storage
function saveToLocalStorage(key, value) {
  if (localStorage.getItem('x_' + key)) {
    localStorage.removeItem('x_' + key);
  } else {
    localStorage.setItem('x_' + key, JSON.stringify(value));
  }
}

// Load from local storage
function loadFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export { saveToLocalStorage, loadFromLocalStorage };
