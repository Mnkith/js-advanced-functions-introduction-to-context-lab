function createEmployeeRecord(ary){
  return {
    firstName: ary[0],
    familyName: ary[1],
    title: ary[2],
    payPerHour: ary[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(aryOfAry){
  const employeeRecords = []
  aryOfAry.forEach(e => employeeRecords.push(createEmployeeRecord(e)))
  return employeeRecords
}



function createTimeInEvent(rec, timeIn){
  rec.timeInEvents.push({
    type: 'TimeIn',
    date: timeIn.split(' ')[0],
    hour: parseInt(timeIn.split(' ')[1])
  })
  return rec
}

function createTimeOutEvent(rec, timeOut){
  rec.timeOutEvents.push({
    type: 'TimeOut',
    date: timeOut.split(' ')[0],
    hour: parseInt(timeOut.split(' ')[1])
  })
  return rec
}

function hoursWorkedOnDate(rec, date){
  const hIn = rec.timeInEvents.find(e => e.date === date).hour / 100
  const hOut = rec.timeOutEvents.find(e => e.date === date).hour / 100
  return hOut - hIn
}

function wagesEarnedOnDate(rec, date){
  return hoursWorkedOnDate(rec, date) * rec.payPerHour
}

function allWagesFor(rec){
  return rec.timeInEvents.reduce((acc, t) => acc + wagesEarnedOnDate(rec, t.date), 0)
}

function calculatePayroll(ary){
  return ary.reduce((acc, rec) => acc + allWagesFor(rec), 0)
}

function findEmployeeByFirstName(recs, firstName){
  return recs.find(rec => rec.firstName = firstName)
}