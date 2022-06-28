function createEmployeeRecord(worker) {
    let employeeRec = {
        firstName: worker[0],
        familyName: worker[1],
        title: worker[2],
        payPerHour: worker[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRec;
}

function createEmployeeRecords(employees) {
    let arrEmployees = [];
    for (let employee of employees) {
        arrEmployees.push(createEmployeeRecord(employee));
    }
    return arrEmployees;
}

function createTimeInEvent(date) {
    let duration = {
        type: "TimeIn",
        hour: parseInt(date.substring(11)),
        date: date.substring(0, 10),
    }
    this.timeInEvents.push(duration);
    return this;
}

function createTimeOutEvent(date) {
    let durationOne = {
        type: "TimeOut",
        hour: parseInt(date.substring(11)),
        date: date.substring(0, 10),
    }
    this.timeOutEvents.push(durationOne);
    return this;
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let newPay = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(newPay.toString())
}


let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}
