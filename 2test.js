let originalData;

fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {

        originalData = data;


        renderTable(data);


        document.getElementById('searchInput').addEventListener('input', handleSearch);
    })
    .catch(error => console.error('Error fetching data:', error));


    function renderTable(data, tableElement = document.getElementById('studentTable')) {

        tableElement.innerHTML = '';


        const headerRow = tableElement.insertRow(0);
    const headers = ['ID', 'Name', 'Email', 'Marks', 'Passing', 'Class', 'Gender'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });






    data.forEach(student => {
        const row = tableElement.insertRow();


        const idCell = row.insertCell();
        idCell.textContent = student.id;


        const nameCell = row.insertCell();
        nameCell.style.display = 'flex';

        const image = document.createElement('img');
        image.src = student.img_src;
        image.alt = `${student.first_name} ${student.last_name}`;
        image.style.width = '50px'; 
        
        nameCell.appendChild(image);
        nameCell.innerHTML += `<br>${student.first_name} ${student.last_name}`;


        const columns = ['email', 'marks', 'passing', 'class', 'gender'];
        columns.forEach(column => {
            const cell = row.insertCell();


            if (column === 'passing') {
                cell.textContent = student[column] ? 'Passing' : 'Failed';
            } else {
                cell.textContent = student[column];
            }
        });
    });
}




function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    const filteredData = originalData.filter(student =>
        student.first_name.toLowerCase().includes(searchTerm) ||
        student.last_name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredData);
}





function sortAZ() {
    originalData.sort((a, b) => (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name));
    renderTable(originalData);
}

function sortZA() {
    originalData.sort((a, b) => (b.first_name + ' ' + b.last_name).localeCompare(a.first_name + ' ' + a.last_name));
    renderTable(originalData);
}

function sortByMarks() {
    originalData.sort((a, b) => a.marks - b.marks);
    renderTable(originalData);
}

function sortByPassing() {
    const passingData = originalData.filter(student => student.passing);
    renderTable(passingData);
}

function sortByClass() {
    originalData.sort((a, b) => a.class - b.class);
    renderTable(originalData);
}

function sortGender() {
    const femaleData = originalData.filter(student => student.gender.toLowerCase() === 'female');
    const maleData = originalData.filter(student => student.gender.toLowerCase() === 'male');


    const table = document.getElementById('studentTable');
    table.innerHTML = '';


    const femaleTable = document.createElement('table');
    femaleTable.innerHTML = '<caption>Female Students</caption>';
    renderTable(femaleData, femaleTable);
    table.appendChild(femaleTable);


    const maleTable = document.createElement('table');
    maleTable.innerHTML = '<caption>Male Students</caption>';
    renderTable(maleData, maleTable);
    table.appendChild(maleTable);
}
