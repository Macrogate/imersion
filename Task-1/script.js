const addBtn = document.getElementById("addBtn");
const progressContainer = document.getElementById("progressContainer");

let currentBar = null;
let currentText = null;
let progress = 0;

addBtn.addEventListener("click", () => {
  // If no bar exists or it's already full, create a new one
  if (!currentBar || progress >= 100) {
    const wrapper = document.createElement("div");
    wrapper.className = "progress-bar-wrapper";

    // Create the progress bar
    currentBar = document.createElement("div");
    currentBar.className = "progress-bar";

    // Create the % text
    currentText = document.createElement("div");
    currentText.className = "progress-text";
    currentText.innerText = "0%";

    // Append elements
    wrapper.appendChild(currentBar);
    wrapper.appendChild(currentText);
    progressContainer.appendChild(wrapper);

    progress = 0;
  }

  // Increase progress by 10%
  progress = Math.min(progress + 30, 100);
  currentBar.style.width = `${progress}%`;
  currentText.innerText = `${progress}%`;
});
