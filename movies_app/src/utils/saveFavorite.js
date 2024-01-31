import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
// Create a ref for reactive data
const x_data = ref({});
const $toast = useToast({
  position: 'top-left',
  duration: 3000,
  dismissible: true
});

function toastSuccess() {
  $toast.success('Saved to favorites');
}

function toastRemoved() {
  $toast.warning('Removed from favorites');
}

// Save to local storage
function saveToLocalStorage(key, value) {
  if (localStorage.getItem('x_' + key)) {
    localStorage.removeItem('x_' + key);
    toastRemoved();
  } else {
    localStorage.setItem('x_' + key, JSON.stringify(value));
    toastSuccess();
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
