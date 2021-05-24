import { DOMSelectors } from "./DOM";
import { postData, launchData, defaultData } from "./Functions";

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (event) {
    // Stops the form from refreshing the page (default)
    event.preventDefault();
    const searchParams = DOMSelectors.submitArea.value;
    launchData({
      query: {
        $text: {
          $search: searchParams,
        },
      },
      options: {
        sort: {
          flight_number: "asc",
        },
        limit: 200,
        page: 1,
        populate: ["rocket"],
      },
    });
  });
};
listen();
