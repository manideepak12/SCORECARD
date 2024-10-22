let csvData = [];

document.addEventListener('DOMContentLoaded', loadCSV);
document.getElementById('filterButton').addEventListener('click', filterData);

function loadCSV() {
    // Use PapaParse to load and parse the CSV file from the server
    Papa.parse('data.csv', {
        download: true, // Indicate that the CSV file should be downloaded
        header: true,   // Use the first row as headers
        dynamicTyping: true, // Automatically typecast values (e.g. numbers)
        complete: function(results) {
            csvData = results.data;
            console.log(csvData); // Check data in the console for debugging
        },
        error: function(error) {
            console.error('Error loading the CSV file:', error);
        }
    });
}

function filterData() {
    const playerInput = document.getElementById('playerInput').value.toLowerCase();
    const filteredData = csvData.filter(row => row['PLAYER NAME'] && row['PLAYER NAME'].toLowerCase().includes(playerInput));
    
    displayData(filteredData);
}

function displayData(data) {
    const csvDataDiv = document.getElementById('csvData');
    csvDataDiv.innerHTML = '';

    if (data.length === 0) {
        csvDataDiv.innerHTML = '<p>No data available for the selected player</p>';
        return;
    }

    // Create table and populate it
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Generate table headers
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Generate table rows
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            // Check if the header is IMAGE_PATH, display the image instead of text
            if (header === 'IMAGE' && row[header]) {
                const img = document.createElement('img');
                img.src = row[header]; // Use the image path from the CSV
                img.alt = row['PLAYER NAME'];
                img.style.width = '200px'; // Set the image width to 100px
                td.appendChild(img);
            } else {
                td.textContent = row[header];
            }
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    csvDataDiv.appendChild(table);
}
