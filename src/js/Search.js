import { DOMSelectors } from "./DOM";
import { postData, launchData, defaultData } from "./Functions";

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (event) {
    // Stops the form from refreshing the page (default)
    event.preventDefault();
    const searchParams = DOMSelectors.submitArea.value;
    if (searchParams === "") {
      // If the search area is blank, then alert user
      alert("Did you forget to type in words to search for?");
      return;
    }
    launchData({
      query: {
        $or: [
            {
                flight_number: parseInt(searchParams)
            },
            {
                $text: {
                    $search: searchParams
                }
            }
        ],
      },
      options: {
        sort: {
          flight_number: "asc",
        },
        pagination: false,
        populate: ["rocket"],
      },
    });
  });
};
listen();
