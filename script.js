function loadJSON(callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "data.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
}

function renderItems(searchText, selectedOS) {
  loadJSON(function (data) {
    const items = data;

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
  });
}

function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim();
  const selectedOS = document.querySelector(".osOption.selected").dataset.value;

  if (searchText.length > 0) {
    renderItems(searchText, selectedOS);
  } else {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";
  }
}

function handleOSOptionClick(event) {
  const selectedOption = document.querySelector(".osOption.selected");
  selectedOption.classList.remove("selected");

  const clickedOption = event.currentTarget;
  clickedOption.classList.add("selected");

  handleSearchInput();
}

function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("resultsContainer");

 /*
  searchInput.value = "";
  resultsContainer.style.display = "none";
  */
}

function showResults() {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.style.display = "block";
}
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearchInput);
searchInput.addEventListener("blur", clearSearch);

function handleKeyDown(event) {
  const key = event.key;
  const target = event.target;

  if  ((key === 'k' && (event.metaKey))) {
    if (target !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
  } else if (key === "Escape") {
    if (target === searchInput) {
      // Additional logic to handle Escape key when focus is on search input
      const searchInput = document.getElementById("searchInput");
      searchInput.blur(); // Remove focus from search box
    } else {
      const searchInput = document.getElementById("searchInput");
      searchInput.blur();
    }
    handleSearchInput();
  }
}

document.addEventListener("keydown", handleKeyDown);

searchInput.addEventListener("focus", showResults);

const osOptions = document.querySelectorAll(".osOption");
osOptions.forEach((option) => {
  option.addEventListener("click", handleOSOptionClick);
});
