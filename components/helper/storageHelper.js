export const storageHelper = (callback) => {
  if (localStorage.getItem("blazingUser")) {
    const userData = JSON.parse(localStorage.getItem("blazingUser"));
    callback(userData);
  }
};
