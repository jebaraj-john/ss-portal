import { events } from "../data/events_data";
import {urls} from "../config";

export function getEvent() {
  const eventList = events;
  return eventList;
}

export function filterEvent(eventLabel) {
  let filteredEvent = getEvent().filter(type => type.label === eventLabel);
  return filteredEvent;
}

export async function GetStudents(email, center) {
  const get_attendance_url = `${urls.attendance_url}?type=get_attendance&email=${email}&center=${center}`
  try {
      let response = await fetch(get_attendance_url)
      return await response.json();

  }
  catch(error) {
      console.log(error);
  }
}


export async function PostAttendance(attRecords) {
    const update_attendance_url = `${urls.attendance_url}`
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attRecords)
    };
    let response = await fetch(update_attendance_url, requestOptions);
    return await response.json();

}