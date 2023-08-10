//Functions

export function getAttendees(membersArray, date){
    const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
    const attRecords = relevantMembers.map(m => {
      return {...m, attendanceRecords: m.attendanceRecords.filter(record => record.date === date) }
      
    })
    //console.log(attRecords);
    return attRecords.sort((e1, e2) => e1.attendanceRecords[0].time - e2.attendanceRecords[0].time);
  }
  
export function getFirstTimers(membersArray, date){
    const dateArray = date.split(".")
    const day = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1])-1;
    const year = parseInt(dateArray[2]);

    const startTime = new Date(year,month,day).getTime()/1000;
    const endTime = startTime + 86400
    if(membersArray.length > 0){
      const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0 )
      if(relevantMembers.length > 0){
        
        relevantMembers.forEach(mem => mem.attendanceRecords.sort((e1, e2) => e1.time - e2.time));
        const attRecords = relevantMembers.filter(m => m.attendanceRecords[0].time > startTime && m.attendanceRecords[0].time < endTime)
        return attRecords
      }else {
        return []
      }
    } else {
      return []
    }
  }

export function getAbsentees(membersArray, date){
  const dateArray = date.split(".")
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1])-1;
  const year = parseInt(dateArray[2]);

  const startTime = new Date(year,month,day).getTime()/1000;
  if(membersArray.length > 0){
    const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date !== date ).length > 0 )
    if(relevantMembers.length > 0){
      // console.log(relevantMembers)
      relevantMembers.forEach(mem => mem.attendanceRecords.sort((e1, e2) => e1.time - e2.time))
      const attRecords = relevantMembers.filter(m => m.attendanceRecords[0].time < startTime )
      // console.log(attRecords);
      // console.log(date)
      return attRecords
      
    }else {
      return []
    }
  } else {
    return []
  }
}

export function getAttendanceRecords(membersArray, email){
  
  const relevantMember = membersArray.find(m => m.email === email)
  if(relevantMember){
    return relevantMember.attendanceRecords.sort((e1, e2) => e2.time - e1.time);
  }else {
    return []
  }
}

function getParentUrl() {
  var parentUrl = (window.location !== window.parent.location)
  ? document.referrer
  : document.location.origin;
  parentUrl = parentUrl.replace(/http:\/\/|https:\/\//, "");

  parentUrl = parentUrl.includes("loveworldnation.herokuapp.com") ? "christembassybarking.org" : parentUrl

  return parentUrl;
}

export function getOrgDetails(){
  const url = getParentUrl();
  const orgDetails = {url}
  switch(url){
    case "christembassy-eastham.org":
      orgDetails.name = "Christ Embassy East Ham"
    break;
    case "ceilford.org/":
      orgDetails.name = "Christ Embassy Ilford"
    break;
    case "christembassybarking.org":
      orgDetails.name = "Christ Embassy Barking"
    break;
    case "christembassystratford.org":
      orgDetails.name = "Christ Embassy Stratford"
    break;
    case "localhost:3000":
      orgDetails.name = "Christ Embassy Barking"
    break;
    default:
      console.log("Website unidentified")
      orgDetails.name = "Christ Embassy Barking"
  }
  return orgDetails
}

export function getTotalAttendance(membersArray, date){
  if(membersArray.length > 0){
    //Get members with attendance records for the day
    // const relevantMembers = membersArray.filter(member => member.attendanceRecords.filter(record => record.date === date ).length > 0);
    // const relevantAttendance = membersArray.map(e => e.attendanceRecords).flat().filter(e => e.date === date);
    // console.log(relevantAttendance)
    const relevantTotalAttendance = membersArray.map(e => e.attendanceRecords).flat().filter(e => e.date === date).map(e => e.attendance).reduce((a,b) =>a+b, 0);
    return relevantTotalAttendance;

  } else {
    return 0
  }
}

export function getServiceDates(){
  return []
}

export function getTotalGiven(){
  return 0
}

export function getGivingsList(){
  return []
}

export function getListOfMembers(){
  return []
}

function epochConvertDate(date){
  const dateArray = date.split(".")
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1])-1;
  const year = parseInt(dateArray[2]);

  const fullDate = new Date(year,month,day)
  
  let weekBeforeTimeStamp = fullDate.getTime() - 604800000;
  let weekBeforeDate = `${new Date(weekBeforeTimeStamp).getDate()}.${new Date(weekBeforeTimeStamp).getMonth()+1}.${new Date(weekBeforeTimeStamp).getFullYear()}`

  return {fullDate, weekBeforeDate};

}

export function convertDateToDateStringObj(date){

  const fullDateString = epochConvertDate(date).fullDate.toDateString()

  const weekBeforeDate = epochConvertDate(date).weekBeforeDate
  
  return {fullDateString, date, weekBeforeDate}

}
// For the admin line chart
export function getAverageMonthlyAttendance(membersArray = [], weekDayNumber = 0){
  if(!membersArray.length) return
  const attendanceRecords = membersArray.map((member) => member.attendanceRecords).flat();
  const d = new Date();
  const thisYear = d.getFullYear();
  const thisMonth = d.getMonth();  
  const thisYearsAttendanceRecords = attendanceRecords.filter((record) => new Date(record.time*1000).getFullYear() === thisYear);

  // const dailyTotals = thisYearsAttendanceRecords.map(rec => )

  const attendanceByMonth = Array.apply(null, Array(thisMonth+1)).map(function (x, i) { return []; })

  thisYearsAttendanceRecords.forEach((record) => {
    const month = new Date(record.time*1000).getMonth();
    attendanceByMonth[month].push(record);
  } )

  const recordsByMonth = attendanceByMonth.map(month => month.filter(record =>{
    return new Date(record.time*1000).getDay() === weekDayNumber
  }))

  const weeklyAttendanceByMonth = recordsByMonth.map(month => {
    const relevantDays = []

    month.forEach(record => {
      if(!relevantDays.includes(record.date)){
        relevantDays.push(record.date)
      }
    } )
    const emptyRelevantDaysArrays = Array.apply(null, Array(relevantDays.length)).map(function (x, i) { return []; })
    month.forEach(record => emptyRelevantDaysArrays[relevantDays.indexOf(record.date)].push(record.attendance))

    return emptyRelevantDaysArrays.map(relevantDay => relevantDay.reduce((a,b) => a+b,0))
  })
  
  const attendanceAveragesByMonth = weeklyAttendanceByMonth.map(record => {
    return Math.ceil(record.reduce((prevVal, nextVal) => (prevVal + nextVal), 0)/record.length)
  })



  return attendanceAveragesByMonth
}

export function getMonthsForChartLabel(numberOfMonths){
  let chartLabels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'August', 'September', 'October', 'November', 'December'];

  return chartLabels.slice(0,numberOfMonths)
}

export function getDateValues(d){
  //get day of week "eg Sunday"
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const day = weekDays[d.getDay()]

  //get timestamp "eg 1639816377"
  const time = Math.floor(d.getTime()/1000)

  //get date "eg 21.11.2021"
  const date = [ d.getDate(), d.getMonth()+1, d.getFullYear() ].join(".")

  return {
      day,
      date,
      time,
  }
}