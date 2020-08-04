# 20 / 07 / 31 React Homework 3

## project name is My-books application.

### schedules

1. Implementing signin page.
   - If the login request is successed, the server will send a <i>Token</i>. 
   - The received <i>Token</i> is stored in th browser's localStorage.
   - If there is a token in local storage, it will not go to the homepage(by using <i>Redirect</i> component, in react-router-dom API), but will go directly to the login page.

2. implementing Home page
   - If  there is a <i>Token</i> in the localStorage, the login status keep continue.
   - In the Home page, books are given by HTTP request and displayed in the browser. 
   - If you want to sign out, you can push the sign out button.



## Preview

### Sign in

![image](https://user-images.githubusercontent.com/62285872/89169875-cd678100-d5b9-11ea-88fe-b6d229b335be.png)

### Home

![image](https://user-images.githubusercontent.com/62285872/89169590-64800900-d5b9-11ea-9f96-6f1c87e02650.png)