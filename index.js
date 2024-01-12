let createEmployeeRecord = function(line){
    return {
        firstName: line[0],
        familyName: line[1],
        title: line[2],
        payPerHour: line[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeLineData) {
    return employeeLineData.map(function(line){
        return createEmployeeRecord(line)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(checkingDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === checkingDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === checkingDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateLooking){
    let grossWage = hoursWorkedOnDate.call(this, dateLooking)
        * this.payPerHour
    return parseFloat(grossWage.toString())
}

let allWagesFor = function(){
    let allowableDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = allowableDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
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