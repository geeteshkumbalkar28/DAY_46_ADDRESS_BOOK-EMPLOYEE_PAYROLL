let addrPayrollList
window.addEventListener('DOMContentLoaded', (event) => {
    addrPayrollList =   getEmployeePayrollDataFromStorage();
    document.querySelector(".per-count").textContent = addrPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editAddr');
});

getEmployeePayrollDataFromStorage= () => {
    return localStorage.getItem('AddressBookList') ? 
                    JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

const createInnerHtml = () => {
    if (addrPayrollList.length == 0) return;
    const headerHtml = "<tr><th>Full Name</th><th>Address</th><th>City</th><th>State</th>" +
        "<th>Phone No</th><th>Zip Code</th><th>Options</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (const addrPayrollData of addrPayrollList) {
        innerHtml = `${innerHtml}
            <tr>
                <td>${addrPayrollData.name}</td>
                <td>${addrPayrollData.address}</td>
                <td>${addrPayrollData.city}</td>
                <td>${addrPayrollData.state}</td>
                <td>${addrPayrollData.phone}</td>
                <td>${addrPayrollData.zipcode}</td>
                <td>
                <img id="${addrPayrollData._id}" onclick="remove(this)" alt="delete" src="/Assets/delete.jpeg">
                <img id="${addrPayrollData._id}" alt="edit" onclick="update(this)" src="/Assets/modifided.jpeg">
                </td>
            </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const remove = (node) => {
    let addrPayrollData = addrPayrollList.find(addData => addData._id == node.id);
   if(!addrPayrollData) return;
    const index = addrPayrollList 
                    .map(addData => addData._id)
                    .indexOf(addrPayrollData._id);
                    addrPayrollList.splice(index, 1);
    localStorage.setItem('AddressBookList', JSON.stringify(addrPayrollList));
    document.querySelector('.per-count').textContent = addrPayrollList.length;
    createInnerHtml();
}

const update = (node) => {
    let addrPayrollData = addrPayrollList.find(addData => addData._id == node.id)
    if(!addrPayrollData) return;
    localStorage.setItem('editAddr', JSON.stringify(addrPayrollData))
    window.location.replace(site_properties.add_emp_Payroll_page);
    
}