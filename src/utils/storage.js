export function getStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    return value !== null ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error("Error reading storage:", error);
    return fallback;
  }
}

export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error saving storage:", error);
    return false;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing storage:", error);
    return false;
  }
}

export function clearStorage() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing storage:", error);
    return false;
  }
}
