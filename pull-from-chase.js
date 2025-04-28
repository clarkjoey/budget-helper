// Select the table containing the transaction data
let table = document.querySelector('#ACTIVITY-dataTableId-mds-diy-data-table');

// Initialize an array to store the data
let data = [["Merchant", "Amount"]]; // Include headers for the CSV

// Loop through each row in the table's body
table.querySelectorAll('tbody tr').forEach(row => {
    // Get the first instance of merchant name text
    let merchant = row.querySelector('td[id*="column1"] .accessible-text').innerText.trim();
    merchant = merchant.replace(/,/g, '-'); // Replace commas with dashes in the merchant name
    
    // Get the dollar amount and remove any commas
    let amount = row.querySelector('td[id*="column3"] .mds-activity-table__row-value--text').innerText.trim();
    amount = amount.replace(/,/g, ''); // Remove commas from the amount

    // Push the merchant name and amount as a single row in the array
    data.push([merchant, amount]);
});

// Convert the data array to a CSV format
let csvContent = data.map(e => e.join(",")).join("\n");

// Create a downloadable CSV file
let blob = new Blob([csvContent], { type: 'text/csv' });
let url = URL.createObjectURL(blob);
let alink = document.createElement('a');
alink.href = url;
alink.download = 'transactions.csv';
document.body.appendChild(alink);
alink.click();
document.body.removeChild(alink);
URL.revokeObjectURL(url);

console.log("CSV file 'transactions.csv' generated and downloaded successfully.");
