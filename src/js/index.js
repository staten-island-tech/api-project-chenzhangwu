import { DOMSelectors } from "./DOM";

const query = async function () {
  try {
    const response = await fetch(
      "https://api.spacexdata.com/v4/launches/query",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: {
          query: {
            $text: {
              $search: "2",
            },
          },
          options: {
            sort: {
              flight_number: "asc",
            },
            limit: 50,
            populate: ["rocket"],
          },
        },
      }
    );
    const launchData = await response.json();
    console.log(launchData.docs);
    launchData.docs.forEach((launch) => {
      DOMSelectors.table.insertAdjacentHTML(
        "beforeend",
        `<tr>
        <td><img src="${launch.links.patch.small}" alt="Patch"></td>
        <td>${launch.flight_number}</td>
        <td>${launch.name}</td>
        <td>${launch.date_utc}</td>
        <td>${launch.rocket}</td>
      </tr>`
      );
      console.log(launch.data_utc);
    });
  } catch (error) {
    console.log(error);
    // alert("Great Error Handling :D - An error as occured!");
  }
};
query();
