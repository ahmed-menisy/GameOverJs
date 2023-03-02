(function () {
   const token = localStorage.getItem("uToken");
   if (!token) {
      location.href = "./index.html";
   }
})();
