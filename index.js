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

//
