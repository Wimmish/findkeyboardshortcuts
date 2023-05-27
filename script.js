// JSON data representing the items
const items = [
  {
    shortcut: "CMD + C",
    description: "Copy",
    keyword: "kopieer",
    OS: "macOS",
  },
  {
    shortcut: "Ctrl+V",
    description: "Paste item",
    keyword: "test",
    OS: "Windows",
  },
  {
    shortcut: "Ctrl+Z",
    description: "Undo",
    keyword: "correct ugh",
    OS: "Windows",
  },
  {
    shortcut: "CMD + Option + ]",
    description: "Find items in a document or open a Find window",
    keyword: "search",
    OS: "macOS",
  },
];

// Function to render the items based on search input
/* function renderItems(searchText) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = ""; // Clear previous results

  const filteredItems = items.filter((item) => {
    const shortcutMatch = item.shortcut
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const descriptionMatch = item.description
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const keywordMatch = item.keyword
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return shortcutMatch || descriptionMatch || keywordMatch;
  }); */

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
      const shortcutElement = document.createElement("span");
      shortcutElement.classList.add("shortcut");
      shortcutElement.textContent = item.shortcut;
      const descriptionElement = document.createElement("span");
      descriptionElement.classList.add("description");
      descriptionElement.textContent = item.description;
      // itemElement.appendChild(document.createTextNode("Shortcut: "));
      itemElement.appendChild(shortcutElement);
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
  if (event.key === "/") {
    event.preventDefault(); // Prevent '/' character from being typed in the search box
    const searchInput = document.getElementById("searchInput");
    searchInput.focus();
  } else if (event.key === "Escape") {
    const searchInput = document.getElementById("searchInput");
    searchInput.blur();
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

/* const osSelect = document.getElementById("osSelect");
osSelect.value = "macOS"; */

// Render items initially with default values
// renderItems("", "macOS");
