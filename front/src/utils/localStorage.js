const houers5 = 18000000;

export const getObj = (name) => {
  const user = JSON.parse(localStorage.getItem(name));

  if (!user || new Date(user.time) < new Date(new Date().getTime() - houers5)) {
    localStorage.removeItem(name);
  }

  return user;
};

export const setObj = (name, obj) => {
  return localStorage.setItem(
    name,
    JSON.stringify({ ...obj, time: new Date() })
  );
};

export const clear = () => {
  localStorage.clear();
}
