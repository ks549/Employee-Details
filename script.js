let limit = 5;
let offSet = 0;
employeeHandler(offSet, limit);
function pagination(action) {
    if (action == 'next') {
        offSet += 5;
        employeeHandler(offSet, limit);
    }
    if (action == 'prev') {
        offSet -= 5;
        employeeHandler(offSet, limit);
    }

}
async function employeeHandler(offSet, limit) {
    let data = [], temp = [];
    let result = await fetch('http://dummy.restapiexample.com/api/v1/employees').then(async (response) => {
        if (response.ok) {
            return await response.json();
        }

    }).catch((err) => { console.log(err) });
    data = result.data;
    let totalRecord = data.length;
    let addrEle = document.getElementById('employee');
    let childEle = document.getElementsByClassName('employee-content');
    Object.values(childEle).forEach((ele) => { addrEle.removeChild(ele) });
    if (data) {
        data.splice(offSet, limit).forEach((addr) => {
            let employeeList = document.createElement('DIV');
            employeeList.setAttribute('class', 'employee-content');
            employeeList.innerHTML = addr.employee_name;
            let btnEle = document.createElement('BUTTON');
            btnEle.innerHTML = 'Check detail';
            btnEle.setAttribute('class', 'button');
            btnEle.addEventListener('click', (() => {
                alert("Employee Name:" + addr.employee_name);
            }));
            employeeList.appendChild(btnEle);
            addrEle.appendChild(employeeList);
        })
    }
    if (offSet == 0) {
        document.getElementById('prev').style.color = 'grey';
        document.getElementById('prev').disabled = true;
    }
    else {
        document.getElementById('prev').style.color = 'black';
        document.getElementById('prev').disabled = false;
    }

    if (totalRecord - (offSet + limit) < 0) {
        document.getElementById('next').style.color = 'grey';
        document.getElementById('next').disabled = true;
    }
    else {
        document.getElementById('next').style.color = 'black';
        document.getElementById('next').disabled = false;
    }



}