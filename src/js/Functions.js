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

const popUpData = function (id = "") {
  DOMSelectors.popUpContent.style.display = "flex";

  // Data to attach to post request
  const data = {
    query: {
      _id: id,
    },
    options: {
      sort: {
        flight_number: "asc",
      },
      pagination: false,
      populate: ["rocket", "launchpad", "payloads"],
    },
  };

  postData("https://api.spacexdata.com/v4/launches/query", data).then(function (
    response
  ) {
    const launch = response.docs[0];
    console.log(launch);
    DOMSelectors.popUpContent.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="popUp-box">
    <div class="close"> + </div>
    <div class="popUp-content-box">
      <div class="popUp-left">
        <div class="popUp-textbox">
          <div class="popUp-text-label">Mission Name:</div>
          <div class="popUp-text">${launch.name}</div>
        </div>
        <div class="popUp-textbox">
          <div class="popUp-text-label">Launch Time (EST):</div>
          <div class="popUp-text">${dateFormatter(launch.date_utc)}</div>
          <div class="popUp-text">${timeFormatter(launch.date_utc)}</div>
        </div>
        <div class="popUp-textbox">
          <div class="popUp-text-label">Launch Location:</div>
          <div class="popUp-text">${launch.launchpad.full_name}</div>
        </div>
        <div class="popUp-icon-row">
          <a href="${launch.links.article}">
            <img class="popUp-icons" src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-office/100/office-05-512.png" alt="article">
          </a>
          <a href="${launch.links.wikipedia}">
            <img class="popUp-icons" src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Wikipedia%27s_W.svg" alt="wikipedia">
          </a>
          <a href="${launch.links.youtube}">
            <img class="popUp-icons" src="https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Almost-Black-Logo.wine.svg" alt="youtube">
          </a>
        </div>
      </div>
      <div class="popUp-right">
        <img src="${launch.rocket.flickr_images[0]}" alt="${
        launch.rocket.name
      } Rocket">
        <div class="popUp-text">${launch.rocket.name}</div>
      </div>
    </div>
  </div>`
    );
    listenForClose();
  });
};

const listenForClose = function () {
  // Cannot use DOMSelectors because I need to query select everytime this function runs
  document.querySelector(".close").addEventListener("click", function () {
    DOMSelectors.popUpContent.innerHTML = "";
    DOMSelectors.popUpContent.style.display = "none";
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

export { postData, launchData, popUpData, defaultData };
