// ? =============> Global ===============>
const inputs = document.querySelectorAll("input"),
   formLogin = document.getElementById("login"),
   btnLogin = document.getElementById("btnLogin"),
   modeBtn = document.getElementById("mode");

let isValid = false;

// ! =============> When Start ===============>
if (localStorage.getItem("theme")) {
   const theme = localStorage.getItem("theme");
   console.log(theme);
   document.documentElement.dataset.theme = localStorage.getItem("theme");
   if (theme === "light") {
      modeBtn.classList.replace("fa-sun", "fa-moon");
   } else {
      modeBtn.classList.replace("fa-moon", "fa-sun");
   }
}
// * =============> Events ===============>
formLogin.addEventListener("submit", function (e) {
   e.preventDefault();
   if (isValid) {
      setForm();
   }
});

formLogin.addEventListener("input", function () {
   if (validationEmail() && validationPassword()) {
      btnLogin.removeAttribute("disabled");
      isValid = true;
   } else {
      btnLogin.setAttribute("disabled", true);
      isValid = false;
   }
});

modeBtn.addEventListener("click", function (e) {
   theme(e.target);
});

// ! =============> Functions ===============>
async function setForm() {
   const newUser = {
      email: inputs[0].value,
      password: inputs[1].value,
   };

   const response = await loginApi(newUser);

   const msgElement = document.getElementById("msg");
   if (response.message === "success") {
      localStorage.setItem("uToken", response.token);
      location.href = "./home.html";
   } else {
      console.log(response);
      msgElement.innerText = response?.message;
   }
}

async function loginApi(user) {
   btnLogin.setAttribute("disabled", true);

   try {
      const api = await fetch(`https://sticky-note-fe.vercel.app/signin`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      });

      const response = await api.json();
      btnLogin.removeAttribute("disabled");

      return response;
   } catch (error) {
      btnLogin.removeAttribute("disabled");
      console.log("error", error);
   }
}

function theme(element) {
   const rootElement = document.documentElement;
   if (element.classList.contains("fa-sun")) {
      element.classList.replace("fa-sun", "fa-moon");
      rootElement.dataset.theme = "light";
      localStorage.setItem("theme", "light");
   } else {
      element.classList?.replace("fa-moon", "fa-sun");
      rootElement.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
   }
}

//  =============> Validation ===============>

function validationEmail() {
   const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

   if (emailRegex.test(inputs[0].value)) {
      inputs[0].classList.remove("is-invalid");
      inputs[0].classList.add("is-valid");
      return true;
   } else {
      inputs[0].classList.add("is-invalid");
      inputs[0].classList.remove("is-valid");
      return false;
   }
}

function validationPassword() {
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

   if (passwordRegex.test(inputs[1].value)) {
      inputs[1].classList.remove("is-invalid");
      inputs[1].classList.add("is-valid");
      return true;
   } else {
      inputs[1].classList.add("is-invalid");
      inputs[1].classList.remove("is-valid");
      return false;
   }
}
