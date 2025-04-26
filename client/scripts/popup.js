import { ContextController } from "../../local-server/dist/controllers/context.controller.js";

document.addEventListener("DOMContentLoaded", function () {
  const contextController = ContextController.getInstance();

  // Get references to DOM elements
  const createContextButton = document.getElementById("create-context-button");
  const contextListItems = document.getElementById("context-list-items");

  // Load all contexts when popup opens
  async function loadAllContexts() {
    try {
      const contexts = await contextController.getAll();
      contexts.forEach((context) => {
        const contextItem = document.createElement("li");
        contextItem.className = "context-item";

        const contextName = document.createElement("span");
        contextName.textContent = context.name;
        contextName.className = "context-name";

        contextItem.appendChild(contextName);
        contextListItems.appendChild(contextItem);
      });
    } catch (error) {
      console.error("Error loading contexts:", error);
    }
  }

  // Call loadAllContexts when popup opens
  loadAllContexts();

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

    // Create a save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "save-button";
    saveButton.addEventListener("click", function () {
      const newContext = { name: contextInput.value };
      contextController.add(newContext);
    });

    // Add the input and delete button to the list item
    newContextItem.appendChild(contextInput);
    newContextItem.appendChild(saveButton);

    // Add the new list item to the context list
    contextListItems.appendChild(newContextItem);
  });
});
