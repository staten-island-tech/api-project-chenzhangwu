import { DOMSelectors } from "./DOM";

const query = async function () {
  try {
    const response = await fetch(
      "https://api.spacexdata.com/v4/launches/upcoming"
    );
    const launchData = await response.json();
    launchData.forEach((launch) => {
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="launch-item">
        <h3 class="launch-name">${launch.name}</h3>
        <h3 class="launch-time">${launch.date_utc}</h3>
      </div>`
      );
    });
  } catch (error) {
    console.log(error);
    alert("Great Error Handling :D - An error as occured!");
  }
};
query();
