export default function getToken() {
    
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      console.log(userToken);
      return userToken;
      }