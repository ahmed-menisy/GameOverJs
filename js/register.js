// ? =============> Global ===============>
const inputs = document.querySelectorAll("input"),
   formRegister = document.getElementById("register"),
   btnRegister = document.getElementById("btnRegister"),
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
formRegister.addEventListener("submit", function (e) {
   e.preventDefault();
   if (isValid) {
      setForm();
   }
});

formRegister.addEventListener("input", function () {
   if (validationName(inputs[0]) && validationName(inputs[1]) && validationEmail() && validationPassword() && validationAge()) {
      btnRegister.removeAttribute("disabled");
      isValid = true;
   } else {
      btnRegister.setAttribute("disabled", true);
      isValid = false;
   }
});

modeBtn.addEventListener("click", function (e) {
   theme(e.target);
});

// ! =============> Functions ===============>
async function setForm() {
   const newUser = {
      first_name: inputs[0].value,
      last_name: inputs[1].value,
      email: inputs[2].value,
      password: inputs[3].value,
      age: inputs[4].value,
   };

   const response = await registerApi(newUser);

   const msgElement = document.getElementById("msg");

   if (response.message === "success") {
      location.href = "./index.html";
   } else {
      msgElement.innerText = response.errors?.email?.message;
   }
}

async function registerApi(user) {
   btnRegister.setAttribute("disabled", true);

   try {
      const api = await fetch(`https://sticky-note-fe.vercel.app/signup`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      });

      const response = await api.json();
      btnRegister.removeAttribute("disabled");

      return response;
   } catch (error) {
      btnRegister.removeAttribute("disabled");
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

function validationName(input) {
   const nameRegex =
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

   if (nameRegex.test(input.value)) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      return true;
   } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      return false;
   }
}

function validationEmail() {
   const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

   if (emailRegex.test(inputs[2].value)) {
      inputs[2].classList.remove("is-invalid");
      inputs[2].classList.add("is-valid");
      return true;
   } else {
      inputs[2].classList.add("is-invalid");
      inputs[2].classList.remove("is-valid");
      return false;
   }
}

function validationPassword() {
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

   if (passwordRegex.test(inputs[3].value)) {
      inputs[3].classList.remove("is-invalid");
      inputs[3].classList.add("is-valid");
      return true;
   } else {
      inputs[3].classList.add("is-invalid");
      inputs[3].classList.remove("is-valid");
      return false;
   }
}

function validationAge() {
   const age = /^([1-7][0-9]|80)$/;

   if (age.test(inputs[4].value)) {
      inputs[4].classList.remove("is-invalid");
      inputs[4].classList.add("is-valid");
      return true;
   } else {
      inputs[4].classList.add("is-invalid");
      inputs[4].classList.remove("is-valid");
      return false;
   }
}
