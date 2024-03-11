// Function to mark a task as completed
function markCompleted(cell) {
  //prettier-ignore
  if (cell.innerHTML.trim() !== '') {
    // Add your styling or content changes here
    cell.style.backgroundColor = "#aaffaa"; // Change background color to light green
    cell.innerHTML = "Completed"; // You can customize the content as needed
    cell.contentEditable = false; // Disable further editing
  }
}

// Function to highlight today's date
function highlightToday() {
  let today = new Date();
  let dateString = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let cellsWithDate = document.querySelectorAll("td:first-child");

  cellsWithDate.forEach(function (cell) {
    if (cell.textContent === dateString) {
      cell.style.backgroundColor = "#ffcccc"; // Light red color for today's date
    }
  });
}

// Function to highlight Saturdays and Sundays
function highlightWeekends() {
  let tableRows = document.querySelectorAll("#plannerTable tbody tr");

  tableRows.forEach(function (row) {
    let dayCell = row.cells[1]; // Assuming the day is in the second column
    let isWeekend =
      dayCell.textContent.toLowerCase().includes("sat") ||
      dayCell.textContent.toLowerCase().includes("sun");

    if (isWeekend) {
      for (let person = 1; person <= 4; person++) {
        let personCell = row.cells[person + 1];
        personCell.style.backgroundColor = "#c8d7de"; // Light blue color for Saturdays and Sundays
      }
    }
  });
}

// Function to populate the planner table
function populatePlanner(year, month) {
  let tableBody = document
    .getElementById("plannerTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear the existing table content

  let currentDate = new Date(year, month, 1);

  while (currentDate.getMonth() === month) {
    let row = tableBody.insertRow();
    let dateCell = row.insertCell(0);
    let dayCell = row.insertCell(1);

    // Convert date to "day, month year" format
    dateCell.textContent = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    dayCell.textContent = currentDate.toLocaleDateString("en-US", {
      weekday: "short",
    });

    // Add a cell for each family member
    for (let person = 1; person <= 4; person++) {
      let personCell = row.insertCell(person + 1);
      personCell.contentEditable = true; // Allow editing
      // Attach click event to each cell
      personCell.addEventListener("click", function () {
        markCompleted(personCell); // Display alert message
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Highlight today's date and weekends after populating the table
  highlightToday();
  highlightWeekends();
}

// Function to navigate to the previous month
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  populatePlanner(currentDate.getFullYear(), currentDate.getMonth());
}

// Function to navigate to the next month
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  populatePlanner(currentDate.getFullYear(), currentDate.getMonth());
}

// Initial population for the current month
let currentDate = new Date();
populatePlanner(currentDate.getFullYear(), currentDate.getMonth());
