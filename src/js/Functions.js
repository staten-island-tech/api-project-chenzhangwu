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
    const DataJSON = await response.json();
    return DataJSON;
  } catch (error) {
    console.log(error);
    // alert("Great Error Handling :D - An error as occured!");
  }
};

const launchData = function (data = {}) {
  // clears the table body inner html
  DOMSelectors.tableBody.innerHTML = "";
  // .then resolves the promise and then runs a forEach loop on the object "docs"
  postData("https://api.spacexdata.com/v4/launches/query", data).then(function (
    response
  ) {
    if (response.totalDocs === 0) {
      alert("No Launches Came Up!");
      defaultData();
      return;
    }
    response.docs.forEach(function (launch) {
      // inserts more rows on the table for each launch
      let patchImage;
      if (launch.links.patch.small === null) {
        patchImage = "Not Available";
      } else {
        patchImage = `<img src="${launch.links.patch.small}" alt="Patch">`;
      }
      DOMSelectors.tableBody.insertAdjacentHTML(
        "beforeend",
        `<tr>
          <td>${patchImage}</td>
          <td>${launch.flight_number}</td>
          <td>${launch.name}</td>
          <td>${dateFormatter(launch.date_utc)}</td>
          <td>${timeFormatter(launch.date_utc)}</td>
          <td>${launch.rocket.name}</td>
          <td class="launchID">${launch.id}</td>
          </tr>`
      );
    });
  });
};

// Formats the ISO-8601 date -> Month Day, Year
const dateFormatter = function (ISO_8601_date) {
  return new Date(ISO_8601_date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Formats the date -> HH:MM
const timeFormatter = function (ISO_8601_date) {
  return new Date(ISO_8601_date).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });
};

const defaultData = function () {
  launchData({
    options: {
      sort: {
        flight_number: "asc",
      },
      pagination: false,
      populate: ["rocket"],
    },
  });
};

export { postData, launchData, defaultData };
