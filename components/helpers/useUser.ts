export const useUser = () => {
  const cookies = document.cookie.split('; ');
  const cookieObject: { [key: string]: string | undefined } = {};

  const cookieNames = ["currentUser", "token", "uuid"]

  cookieNames.forEach(name => {
    cookieObject[name] = undefined;
  });

  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    if (cookieNames.includes(name)) {
      cookieObject[name] = decodeURIComponent(value);
    }
  });

  return cookieObject;
};
