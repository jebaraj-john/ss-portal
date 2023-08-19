import { urls } from "../config";
import { events } from "../data/events_data";

export function getEvent() {
    const eventList = events;
    return eventList;
}

export function filterEvent(eventLabel) {
    const filteredEvent = getEvent().filter((type) => type.label === eventLabel);
    return filteredEvent;
}

export async function GetStudents(email, center) {
    const get_attendance_url = `${urls.attendance_url}?type=get_attendance&email=${email}&center=${center}`;
    const response = await fetch(get_attendance_url);

    return await response.json();
}

export async function GetUserInfo(email) {
    const get_user_info_url = `${urls.attendance_url}?type=get_user_info&email=${email}`;
    console.log(get_user_info_url);
    const response = await fetch(get_user_info_url);

    return await response.json();
}

export async function PostAttendance(attRecords) {
    const update_attendance_url = `${urls.attendance_url}`;
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attRecords),
    };
    const response = await fetch(update_attendance_url, requestOptions);
    return await response.json();
}
