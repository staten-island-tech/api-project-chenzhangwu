import { DOMSelectors } from "./DOM";

const query = async function () {
  try {
    const response = await fetch(
      "https://api.spacexdata.com/v4/launches/upcoming"
    );
    const launchData = await response.json();
    console.log(launchData);
  } catch (error) {
    console.log(error);
    alert("Great Error Handling :D - An error as occured!");
  }
};
query();
