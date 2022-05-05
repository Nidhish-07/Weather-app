// console.log("Client side JS file is loaded");

const weatherForm = document.querySelector("form");
const error = document.querySelector("#errorMsg");
const forecast = document.querySelector("#forecast");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.querySelector("input").value;
  //   console.log(location);

  (async function () {
    const res = await fetch(
      `http://localhost:3000/weather?address=${location}`
    );

    const data = await res.json();
    if (data.error) {
      console.log(data.error);

      error.textContent = `${data.error}`;
    } else {
      //   console.log(data);
      // console.log(data.forecast);
      // console.log(data.address);
      forecast.textContent = `${data.forecast}\n${data.address.toUpperCase()}`;
    }
  })();
});
