// ? =============> Global ===============>
const searchParams = location.search;
const modeBtn = document.getElementById("mode");

// ! =============> When Start ===============>

const params = new URLSearchParams(searchParams);
const id = params.get("id");
getDetails(id);

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

// ? =============> Event ===============>
modeBtn.addEventListener("click", function (e) {
   theme(e.target);
});

// ! =============> Functions ===============>

async function getDetails(id) {
   const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
         "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   };
   const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
   const response = await api.json();
   displayData(response);
   console.log(response);
}

function displayData(data) {
   let detailsBox = `
   
   <div class="col-md-4">
   <figure>
      <img src="${data.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
         </ol>
      </nav>

      <h1>${data.title}</h1>

      <h3>About ${data.title}</h3>
      <p>${data.description}</p>

      
   </div>
</div>

   `;

   document.getElementById("detailsData").innerHTML = detailsBox;
   document.body.style.cssText = `background:url('${data.thumbnail.replace("thumbnail", "background")}') center / cover no-repeat`;
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
