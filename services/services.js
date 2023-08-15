import { events } from "../data/events_data";

export function getEvent() {
  const eventList = events;
  return eventList;
}

export function filterEvent(eventLabel) {
  let filtredEvent = getEvent().filter(type => type.label === eventLabel);
  return filtredEvent;
}

async function getReports(email,center,quarter){
 let response = await fetch(`https://script.google.com/macros/s/AKfycbxqxjovO6w1POE8xxmM1gaYc4ZP4S88cGrAFtwDFuiUTX7PpFS4wiogCeBUIkoRyB4IKA/exec?type=get_reports&email=${email}&center=${center}&quarter_name=${quarter}`)
 let json_data = await response.json()
 return json_data
}

export default getReports;