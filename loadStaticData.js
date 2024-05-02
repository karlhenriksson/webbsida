"use strict";
/*

Loads data that should be static between different subpages, e.g. navigation options.

*/

// Keeps track on how many things are supposed to load, and how many things are done loading
let [numLoading, numLoaded] = [0, 0];
let staticLoadingComplete = false;

numLoading++;
fetch("StaticData/navigationOptions.json")
  .then((response) => response.json())
  .then((data) => {
    parseNavOptions(document.getElementById("navigationParent"), data);
    numLoaded++;
  });

function parseNavOptions(parent, data) {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object") {
      // If the value is another object, create a new collapsible and use that for the sub-pages
      const text = document.createElement("p");
      text.href = value;
      text.innerText = "▶ " + key;
      text.classList.add("sidebarOption");
      text.classList.add("collapsible");
      parent.appendChild(text);
      const content = document.createElement("div");
      content.classList.add("tabbedSidebar");
      parent.appendChild(content);
      parseNavOptions(content, value);
    } else {
      // If the value is a string, add it as a link to the page that the string points to
      const anchor = document.createElement("a");
      anchor.href = value;
      // Add an extra character if it's an HTTPS link
      anchor.innerText = key;
      anchor.classList.add("sidebarOption");
      parent.appendChild(anchor);
    }
  }
}

// Wait until the loading is done
function waitForStaticLoad() {
  if ((staticLoadingComplete = numLoading === numLoaded)) {
    console.log("Loading of static data complete");
    // Load functional elements
    initiateFunctionalElements();
  } else requestAnimationFrame(waitForStaticLoad);
}
waitForStaticLoad();
