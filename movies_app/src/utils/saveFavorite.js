import { ref } from 'vue';

// Create a ref for reactive data
const x_data = ref({});

// Save to local storage
function saveToLocalStorage(key, value) {
  if (localStorage.getItem('x_' + key)) {
    localStorage.removeItem('x_' + key);
  } else {
    localStorage.setItem('x_' + key, JSON.stringify(value));
  }
  loadFromLocalStorage();
}

// Function to load all 'x_' data from local storage
function loadFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith('x_')) {
      x_data.value[key] = JSON.parse(localStorage.getItem(key));
    }
  }
}

export { saveToLocalStorage, x_data, loadFromLocalStorage };
