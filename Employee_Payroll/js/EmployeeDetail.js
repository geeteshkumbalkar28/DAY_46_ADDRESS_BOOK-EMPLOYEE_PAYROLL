let isUpdate = false;
let employeePayrollObject = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input',function(){
        if(name.value.length == 0){
            setTextValue('.text-error',"");
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error',"");
        }catch(e){
            setTextValue('.text-error',e);
        }
    });

    const date = document.querySelector('#date');
    date.addEventListener('input',function() {
       const startDate = new Date(Date.parse(getInputValueById('#day')+" "+
                                             getInputValueById('#month')+" "+
                                             getInputValueById('#year')));
        try{
            (new EmployeePayrollData()).startDate = startDate;
            setTextValue('.date-error',"");
        }catch(e){
            setTextValue('.date-error',e);
        }
    });

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input',function(){
    output.textContent = salary.value;
});
    checkForUpdate();
});

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson? true : false;
    if(!isUpdate) return;
    employeePayrollObject = JSON.parse(employeePayrollJson)
    setForm();
}

const setForm = () => {
    setValue('#name',employeePayrollObject._name);
    setSelectedValues('[name=profile]',employeePayrollObject._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObject._gender);
    setSelectedValues('[name=department]',employeePayrollObject._department);
    setValue('#salary',employeePayrollObject._salary);
    setTextValue('.salary-output',employeePayrollObject._salary);
    setValue('#notes',employeePayrollObject._note);
    let date = stringifyDate(employeePayrollObject._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
 let allItems = document.querySelectorAll(propertyValue);
 allItems.forEach(item => {
    if(Array.isArray(value)){
        if(value.includes(item.value))
        item.checked = true;
    }
    else if (item.value === value)
        item.checked = true;   
 });
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObject._name = getInputValueById('#name');
    employeePayrollObject._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObject._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObject._department = getSelectedValues('[name=department]');
    employeePayrollObject._salary = getInputValueById('#salary');
    employeePayrollObject._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObject._startDate = date;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try{
        employeePayrollData.name = employeePayrollObject._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObject._profilePic;
    employeePayrollData.gender = employeePayrollObject._gender;
    employeePayrollData.department = employeePayrollObject._department;
    employeePayrollData.salary = employeePayrollObject._salary;
    employeePayrollData.note = employeePayrollObject._note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObject._startDate));
    } catch(e) {
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}


const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const createEmployeePayrollData = (id)  => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObject._id);
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id))
        }        
    }
    else{
        employeePayrollList = [createEmployeePayrollData()];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue =(id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue =(id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}