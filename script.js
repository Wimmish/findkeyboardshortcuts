function renderItems(searchText, selectedOS) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = ""; // Clear previous results

  const filteredItems = items.filter((item) => {
    const shortcutMatch = item.shortcut.toLowerCase().includes(searchText.toLowerCase());
    const descriptionMatch = item.description.toLowerCase().includes(searchText.toLowerCase());
    const keywordMatch = item.keyword.toLowerCase().includes(searchText.toLowerCase());
    const osMatch = item.OS === selectedOS;
    return (shortcutMatch || descriptionMatch || keywordMatch) && osMatch;
  });

  if (filteredItems.length === 0) {
    resultsContainer.textContent = "No matching items found.";
  } else {
    filteredItems.forEach((item) => {
      const itemElement = document.createElement("div");
      const shortcutContainer = document.createElement("div");
      const shortcutElement = document.createElement("span");
      shortcutElement.classList.add("shortcut");
      shortcutElement.textContent = item.shortcut;
      const descriptionElement = document.createElement("div");
      descriptionElement.classList.add("description");
      descriptionElement.textContent = item.description;
      // itemElement.appendChild(document.createTextNode("Shortcut: "));
      itemElement.appendChild(shortcutContainer);
      shortcutContainer.appendChild(shortcutElement);

      itemElement.appendChild(descriptionElement);
      // itemElement.appendChild(document.createTextNode(item.description));
      resultsContainer.appendChild(itemElement);
    });
  }
}

// Function to handle search input and validate user input
function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim();
  const selectedOS = document.querySelector(".osOption.selected").dataset.value;

  if (searchText.length > 0) {
    renderItems(searchText, selectedOS);
  } else {
    // Empty search input, clear results
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";
  }
}

// Function to handle OS option selection
function handleOSOptionClick(event) {
  const selectedOption = document.querySelector(".osOption.selected");
  selectedOption.classList.remove("selected");

  const clickedOption = event.currentTarget;
  clickedOption.classList.add("selected");

  handleSearchInput();
}

// Function to clear search box and hide results when it loses focus
function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("resultsContainer");

  searchInput.value = ""; // Clear search box
  resultsContainer.style.display = "none"; // Hide results
}

// Function to show results when the search box gains focus
function showResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.style.display = "block"; // Show results
}

// Event listener for search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearchInput);

// Event listener for search input losing focus
searchInput.addEventListener("blur", clearSearch);

function handleKeyDown(event) {
  const key = event.key;

  if (key === "/") {
    event.preventDefault(); // Prevent '/' character from being typed in the search box
    const searchInput = document.getElementById("searchInput");
    searchInput.focus();
  } else if (key === "Escape") {
    const searchInput = document.getElementById("searchInput");
    searchInput.blur(); // Remove focus from search box
  } else if (key >= "1" && key <= "3") {
    const osOptions = document.querySelectorAll(".osOption");
    const selectedOption = document.querySelector(".osOption.selected");

    const selectedIndex = parseInt(key) - 1;
    if (selectedIndex >= 0 && selectedIndex < osOptions.length) {
      selectedOption.classList.remove("selected");
      osOptions[selectedIndex].classList.add("selected");
      handleSearchInput();
    }
  }
}

// Event listener for keydown event
document.addEventListener("keydown", handleKeyDown);

// Event listener for search input gaining focus
searchInput.addEventListener("focus", showResults);

// OS selection
const osOptions = document.querySelectorAll(".osOption");
osOptions.forEach((option) => {
  option.addEventListener("click", handleOSOptionClick);
});
