document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const createContextButton = document.getElementById("create-context-button");
  const contextListItems = document.getElementById("context-list-items");

  // Add event listener to the Create Context button
  createContextButton.addEventListener("click", function () {
    // Create a new list item
    const newContextItem = document.createElement("li");
    newContextItem.className = "context-item";

    // Create a text input for the context name
    const contextInput = document.createElement("input");
    contextInput.type = "text";
    contextInput.className = "context-input";
    contextInput.placeholder = "Enter context name";

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      newContextItem.remove();
    });

    // Add the input and delete button to the list item
    newContextItem.appendChild(contextInput);
    newContextItem.appendChild(deleteButton);

    // Add the new list item to the context list
    contextListItems.appendChild(newContextItem);
  });
});
