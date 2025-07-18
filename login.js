  let form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let username = document.getElementById("reg-username").value.trim();
      let password = document.getElementById("reg-password").value;

      let lowerCaseLetter = /[a-z]/g;
      let upperCaseLetter = /[A-Z]/g;
      let numbers = /[0-9]/g;

      if (username.length < 6) {
        alert("Username must be at least 6 characters");
      } else {
        
        if (username === "Admin1" && password === "12345678") {
          alert("Login successful!");
          
          
          if (localStorage.getItem("users")) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
          } else {
            localStorage.setItem("users", JSON.stringify([{ username, password }]));
          }
           
           window.location.href = "signup.html";

  
        } else {
          alert("Invalid username or password.");
        }
      }
    });