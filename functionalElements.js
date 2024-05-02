/*

Adds functionality to certain classes in HTML

CURRENT FUNCTIONALITY:
- Collapsible class: Add an element with the "collapsible" class, then the next child will be collapsible

TODO: 
- Popup buttons

Karl Henriksson
*/

// Run this function when all elements are in place
function initiateFunctionalElements() {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Creates collapsible menus
  //  https://www.w3schools.com/howto/howto_js_collapsible.asp
  for (const el of document.getElementsByClassName("collapsible")) {
    createCollapsible(el);
  }
  // Collapsible menus only when the screen width is small
  for (const el of document.getElementsByClassName("collapsibleMobile")) {
    if (window.innerWidth < 800) {
      createCollapsible(el);
    } else {
      el.remove();
    }
  }

  function createCollapsible(el) {
    // Hide content by default
    el.nextElementSibling.style.display = "none";
    // Add listener to change the content visibility
    el.addEventListener("click", function () {
      this.classList.toggle("collapsibleActive");
      const content = this.nextElementSibling;
      if (content.style.display === "none") {
        content.style.display = "block"; // Can be changed to flex as needed.Possible to make it differentiate?
      } else {
        content.style.display = "none";
      }
    });
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Remove texts marked with removeIfJS
  for (const el of document.getElementsByClassName("removeIfJS")) el.remove();

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Add a little icon to external links
  for (const el of document.getElementsByTagName("a")) {
    if (new URL(el.href).origin !== location.origin) el.innerText += " ☍";
  }
}
