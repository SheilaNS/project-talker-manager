const getToken = (size) => {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i += 1) {
  token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
  };

  module.exports = {
    getToken,
  };  
