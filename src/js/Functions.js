import { DOMSelectors } from "./DOM";

// uses the POST method of fetch API. This attaches a json to our request which allows us to query the resulting object.
const postData = async function (url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const launchData = await response.json();
    return launchData;
  } catch (error) {
    console.log(error);
    // alert("Great Error Handling :D - An error as occured!");
  }
};

const inputLaunchData = function (promise) {
  // clears the table body inner html
  DOMSelectors.tableBody.innerHTML = "";
  // .then resolves the promise and then runs a forEach loop on the object "docs"
  promise.then((response) =>
    response.docs.forEach(function (launch) {
      // inserts more rows on the table for each launch
      DOMSelectors.tableBody.insertAdjacentHTML(
        "beforeend",
        `<tr>
    <td><img src="${launch.links.patch.small}" alt="Patch"></td>
    <td>${launch.flight_number}</td>
    <td>${launch.name}</td>
    <td>${dateFormatter(launch.date_utc)}</td>
    <td>${timeFormatter(launch.date_utc)}</td>
    <td>${launch.rocket.name}</td>
  </tr>`
      );
    })
  );
};

// trying some alternatives but getting error about promise not resolved?
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

const dateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const timeFormat = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "numeric",
});

// Formats the ISO-8601 date -> Month Day, Year
const dateFormatter = function (ISO_8601_date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(ISO_8601_date).toLocaleDateString(undefined, options);
};

// DOESN'T WORK YET - Formats the date -> HH:MM
const timeFormatter = function (ISO_8601_date) {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(ISO_8601_date).toLocaleDateString(undefined, options);
};

export { postData, inputLaunchData };
