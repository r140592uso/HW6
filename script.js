// Homework



// xml http request
// function getUser() {
//   function renderPage() {
//     let response = this.responseText;
//     let responseData = JSON.parse(response);
//     console.log(responseData);
//     responseData.data.forEach((element) => {
//       let li = document.createElement("li");
//       let p = document.createElement("p");
//       p.textContent = `${element.name} ${element.year} ${element.color} ${element.pantone_value}`;
//       li.appendChild(p);
//       document.getElementById("list").appendChild(li);
//     });
//   }
//   function errorRander() {
//     let p = document.createElement("p");
//     p.textContent = "Server Error";
//     p.style.color = "red";
//     document.getElementById("list").appendChild(p);
//   }
//   let request = new XMLHttpRequest();
//   request.addEventListener("load", renderPage);
//   request.addEventListener("error", errorRander);
//   request.open("GET", "https://reqres.in/api/unknown");
//   request.send();
// }
// getUser();



// fetch
let currentPage = 1;
let totalPages;
function getinfo(page) {
  fetch("https://reqres.in/api/unknown", {
    method: "GET",
  })
    .then(function (response) {
      if (response.status !== 200) {
        throw response.status;
      }
      return response.json();
    })
    .then(function (responseData) {
      const fragment = document.createDocumentFragment();
      responseData.data.forEach((element) => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.textContent = `${element.name} ${element.year} ${element.color} ${element.pantone_value}`;
        li.appendChild(p);
        fragment.appendChild(li);
      });
      document.getElementById("list").innerHTML = " ";
      document.getElementById("list").appendChild(fragment);
      totalPages = responseData.total_pages;
    })
    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not Found";
        p.style.color = "red";
        document.getElementById("api").appendChild(p);
      } else if (error == 500) {
        let p = document.createElement("p");
        p.textContent = "Server Error";
        p.style.color = "red";
        document.getElementById("api").appendChild(p);
      }
    });
}

document.getElementById("loadprev").addEventListener("click", function () {
  if (currentPage == 1) {
    return;
  }
  currentPage -= 1;
  getinfo(currentPage);
});
document.getElementById("loadnext").addEventListener("click", function () {
  if (currentPage == totalPages) {
    return;
  }
  currentPage += 1;
  getinfo(currentPage);
});
getinfo(currentPage);





