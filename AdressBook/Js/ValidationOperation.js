let isUpdate = false;
let AdderessObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    Phonenumber();
    Address();
    Zipcode();
    checkForUpdate();
});
function validateName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).Name = name.value;
            textError.textContent = "";
        } catch (e) {
            console.error(e);
            textError.textContent = e;
        }
    });
}
function Phonenumber() {
    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function () {
        if (phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).PhoneNo = phone.value;
            phoneError.textContent = "";
        } catch (e) {
            console.error(e);
            phoneError.textContent = e;
        }
    });
}
function Address() {
    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return; // alert("Added Sucedssfully");
        }
        try {
            (new AddressBook()).Address = address.value;
            addressError.textContent = "";
        } catch (e) {
            console.error(e);
            addressError.textContent = e;
        }
    });
}
function Zipcode() {
    const zipcode = document.querySelector('#zipcode');
    const zipcodeError = document.querySelector('.zip-error');
    zipcode.addEventListener('input', function () {
        if (zipcode.value.length == 0) {
            zipcodeError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).Zipcode = zipcode.value;
            zipcodeError.textContent = "";
        } catch (e) {
            console.error(e);
            zipcodeError.textContent = e;
        }
    });
}

const save = () => {
    try {
        let addressBookData = createAddressBook();
        alert("In Save Method ");
        alert(addressBookData.toString());
        createAndUpdateStorage(addressBookData);
    } catch (e) {
        return;
    }
}

function createAndUpdateStorage(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList != undefined) {
        addressBookList.push(addressBookData);
    } else {
        addressBookList = [addressBookData]
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
}

const createAddressBook = () => {
    let addressBookData = new AddressBook();
    addressBookData.id = createNewAddId();
    try {
        addressBookData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    addressBookData.phone = getInputValueById('#phone');
    addressBookData.address = getInputValueById('#address');
    addressBookData.city = getInputValueById('#city');
    addressBookData.state = getInputValueById('#state');
    addressBookData.zipcode = getInputValueById('#zipcode');
    return addressBookData;
}
// const getSelectedValues = (propertyValue) => {
//     let allItems = document.querySelectorAll(propertyValue);
//     let selItems = [];
//     allItems.forEach(item => {
//         if (item.checked) selItems.push(item.value);
//     });
//     return selItems;
// }

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const createNewAddId = () => {
    let addrId = localStorage.getItem('AddressBookID');
    addrId = !addrId ? 1 : (parseInt(addrId) + 1);
    localStorage.setItem('AddressBookID', addrId);
    return addrId;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#phone', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zipcode', '');
}

const checkForUpdate = () => {
    const employeePayrollJSON = localStorage.getItem('editAddr');
    isUpdate = employeePayrollJSON ? true : false;
    if(!isUpdate) return;
    AdderessObj = JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm = () => {
    setValue('#name',AdderessObj.name);
    setValue('#address',AdderessObj.address);
    setValue('#city',AdderessObj.city);
    setValue('#state',AdderessObj.state);
    setValue('#phone',AdderessObj.phone);
    setValue('#zipcode',AdderessObj.zipcode);
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id); element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;  
}