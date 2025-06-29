let table = document.querySelector('#ACTIVITY-dataTableId-mds-diy-data-table');

let data = [["Merchant", "Amount"]];

table.querySelectorAll('tbody tr').forEach(row => {
    let merchant = row.querySelector('td[id*="column1"] .accessible-text').innerText.trim();
    if (merchant.startsWith("Payment Thank You")) return;

    merchant = merchant.replace(/,/g, '-');

    let amount = row.querySelector('td[id*="column3"] .mds-activity-table__row-value--text').innerText.trim();
    amount = amount.replace(/,/g, '');

    data.push([merchant, amount]);
});

let csvContent = data.map(e => e.join(",")).join("\n");

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
