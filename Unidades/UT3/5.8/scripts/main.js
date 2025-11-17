const contacts = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@javascripthandbuch.de'
  },
  {
    firstName: 'James',
    lastName: 'Doe',
    email: 'james.doe@javascripthandbuch.de'
  },
  {
    firstName: 'Peter',
    lastName: 'Doe',
    email: 'peter.doe@javascripthandbuch.de'
  }
];

function createTable() {
  const tableBody = document.querySelector('#contact-table tbody');
  for(let i=0; i<contacts.length; i++) {
    // For the current contact ...
    const contact = contacts[i];
    // ... creo una nueva fila
    // (1)
    const tableRow = document.createElement('tr');
    // creo una nueva celda
    // (2)
    const tableCellFirstName = document.createElement('td');
    // ... creo el texto de la celda a partir del array
    // (3)
    const firstName = document.createTextNode(contact.firstName);
    // (4) ... añado el texto a la celda
    tableCellFirstName.appendChild(firstName);
    // (5)
    const tableCellLastName = document.createElement('td');
    // (6)
    const lastName = document.createTextNode(contact.lastName);
    // (7)
    tableCellLastName.appendChild(lastName);
    // (8)
    const tableCellEmail = document.createElement('td');
    // (9)
    const email = document.createTextNode(contact.email);
    // (10)
    tableCellEmail.appendChild(email);
    // (11) añado la celda del nombre a la fila
    tableRow.appendChild(tableCellFirstName);
    // (12)
    tableRow.appendChild(tableCellLastName);
    // (13)
    tableRow.appendChild(tableCellEmail);
    // (14)
    tableBody.appendChild(tableRow);
  }
}
