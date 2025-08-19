/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 5;
//this value was changed to 5 from 100, originally, so that the entire result
//is viewable in a single screen

//creates the random freelancer name, occupation, and rate
function createFreelancer() {
  //math.random selects a random number between 0 and 1
  //math.floor rounds the number down to the nearest whole number
  let name = NAMES[Math.floor(Math.random() * NAMES.length)];
  let occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  // the rate is a numeric calculation; this works out to a random number between 0 and 1
  //rounded down to the nearest whole number multiplied by the range of the prices,
  // plus one, plus the minimum of the range again
  let rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;
  //returns the randomized name, occupation, and rate
  return {
    name,
    occupation,
    rate,
  };
}

//array.from creates a new array equal to the length of the NUM_FREELANCERS array
//createfreelancer places the information from the freelancer randomizer into the array
const freelancers = Array.from({ length: NUM_FREELANCERS }, createFreelancer);

function calcAvgRate(list) {
  const total = list.reduce((sum, freelancer) => sum + freelancer.rate, 0);
  return (total / list.length).toFixed(2);
}

const avgRate = calcAvgRate(freelancers);

function renderTableRow(freelancer) {
  //creates the element table row
  let tableRow = document.createElement("tr");

  //creates the element table data
  let nameTableData = document.createElement("td");
  //makes the text content of table data the freelancer name
  nameTableData.textContent = freelancer.name;

  //creates element occupation table data
  let occupationTableData = document.createElement("td");
  //makes the text content of the table data the freelancer occupation
  occupationTableData.textContent = freelancer.occupation;

  //creates element rate table data
  let rateTableData = document.createElement("td");
  //makes the text content of the table data freelancer rate
  rateTableData.textContent = freelancer.rate;

  //adds the name table data, occupation table data, and rate table data to the table row
  tableRow.append(nameTableData, occupationTableData, rateTableData);

  //returns table row
  return tableRow;
}

function renderTable(list) {
  let table = document.createElement("table");

  //caption section
  const caption = document.createElement("caption");
  caption.textContent = "Freelancer Forum";

  //header section
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const columnHeaders = ["NAME", "OCCUPATION", "RATE"];
  //loops through the column headers
  columnHeaders.forEach((columnHeader) => {
    //create a new table header element for each column header
    let tableHeader = document.createElement("th");
    //set the table header content equal to the column header name
    tableHeader.textContent = columnHeader;
    //add the table header to the header row
    headerRow.appendChild(tableHeader);
  });
  //adds the header row to the header
  header.appendChild(headerRow);

  //table body section
  let tableBody = document.createElement("tbody");
  //loop through each freelancer and populate the randomized data into a new table row
  list.forEach((freelancer) =>
    //add the results from the randomized freelancer function to a row in the table body
    tableBody.appendChild(renderTableRow(freelancer))
  );

  //add the caption, header, and tableBody to the table
  table.append(caption, header, tableBody);
  //return the table
  return table;
  //   appContainer.appendChild(table);
}
/*
<div>
<p>The average rate is:</p>
</div>
*/

function renderAvgRate(avg) {
  //creates a <div> container in the HTML
  const divTagline = document.createElement("div");
  //creates a (paragraph or a pTag) <p>
  const pTag = document.createElement("p");
  //sets the contents of the pTag equal to "The rate is + `calculation of the avg rate'
  pTag.textContent = `The average rate is ${avg}`;
  //appends the <p> to the <div>
  divTagline.appendChild(pTag);
  //returns the entire Tagline
  return divTagline;
}

function render() {
  const appContainer = document.getElementById("app");
  const avgTaglineElement = renderAvgRate(avgRate);
  appContainer.innerHTML = "";
  //adds the tagline element with the average to the app container
  //misc line - appContainer.appendChild(renderTable(freelancers));
  appContainer.appendChild(avgTaglineElement);
  //adds the entire table with the randomized results from the freelancer function to the app container
  appContainer.appendChild(renderTable(freelancers));
}

render();
// renderTable(freelancers);

// console.log(NAMES);
// console.log(OCCUPATIONS);
// console.log(PRICE_RANGE);
// console.log(NUM_FREELANCERS);
