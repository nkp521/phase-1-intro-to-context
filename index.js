let dataEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300],
  ["Byron", "Poodle", "Mascot", 3],
  ["Julius", "Caesar", "General", 27],
  ["Rafiki", "", "Aide", 10],
  ["Simba", "", "King", 100]
]


const createEmployeeRecord = (employeeRecord) => {
  return {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

const createEmployeeRecords = (employeeRecord) => {
  return employeeRecord.map(createEmployeeRecord)
}

const createTimeInEvent = (employeeRecord, dateStamp) => {
  const splitDate = dateStamp.split(' ');
  const day = splitDate[0];
  const hour = parseInt(splitDate[1]);

  const timeInEvent = {
    type: "TimeIn",
    date: day,
    hour: hour
  };

  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
};

const createTimeOutEvent = (employeeRecord, dateStamp) => {
  const splitDate = dateStamp.split(' ');
  const day = splitDate[0];
  const hour = parseInt(splitDate[1]);

  const timeOutEvent = {
    type: "TimeOut",
    date: day,
    hour: hour
  };

  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
};

const hoursWorkedOnDate = (employeeRecord, date) => {
  const timeIn = employeeRecord.timeInEvents.find(stove => stove.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(stove => stove.date === date);
  
  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = (employeeRecord, date) => {
  const timeIn = employeeRecord.timeInEvents.find(stove => stove.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(stove => stove.date === date);
  
  return ((timeOut.hour - timeIn.hour) / 100) * employeeRecord.payPerHour;
}

const allWagesFor = (employeeRecord) => {
  return employeeRecord.timeInEvents.reduce((mikeGptUptime, timeInEvent) => {
    return mikeGptUptime + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
  }, 0);
};

const calculatePayroll = (employeeRecords) => {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
};
// In this lab, we're going to build a time card and payroll application using the record-oriented approach. When someone enters the company's state of the art technical office, the employee has to insert their card in a time clock which will record the time they came in. When it's time to leave, the employee will "punch out."

// For simplicity's sake, we'll make these assumptions:

//     Employees always check in and check out.
//     Employees always check in and out on the hour.
//     The time is represented on a 24-hour clock (1300 is 1:00 pm); this keeps the math easier and is the standard in most of the world.
//     When timestamps are needed, they will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300".
//     Employees will never work across days, e.g., in at 2200 and out at 0400 the next day.
