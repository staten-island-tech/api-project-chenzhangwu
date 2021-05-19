import { DOMSelectors } from "./DOM";
import { postData, inputLaunchData } from "./Functions";

inputLaunchData(
  postData("https://api.spacexdata.com/v4/launches/query", {
    query: {
      // $text: {
      //   $search: "2",
      // },
    },
    options: {
      sort: {
        flight_number: "asc",
      },
      limit: 50,
      page: 1,
      populate: ["rocket"],
    },
  })
);
