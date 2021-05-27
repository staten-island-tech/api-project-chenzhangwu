import { DOMSelectors } from "./DOM";
import { postData, launchData, popUpData, defaultData } from "./Functions";

const tableEventListener = function () {
  DOMSelectors.tableBody.addEventListener("click", function (e) {
    const target = e.target;
    let launchID;
    if (target.nodeName === "IMG") {
      launchID =
        target.parentNode.parentNode.lastChild.previousSibling.innerHTML;
    } else {
      launchID = target.parentNode.lastChild.previousSibling.innerHTML;
    }
    popUpData(launchID);
  });
};

tableEventListener();
