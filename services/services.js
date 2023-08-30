import { urls } from "../config";

export function filterEvent(eventLabel, allEventDetails) {
    console.log(allEventDetails)
    const filteredEvent = allEventDetails.filter((type) => type.EventType === eventLabel);
    return filteredEvent;
}

export async function GetStudents(email, center) {
    const get_attendance_url = `${urls.attendance_url}?type=get_attendance&email=${email}&center=${center}`;
    const response = await fetch(get_attendance_url);

    return await response.json();
}

export async function GetUserInfo(email) {
    const get_attendance_url = `${urls.attendance_url}?type=get_user_info&email=${email}`;
    console.log(get_attendance_url);
    const response = await fetch(get_attendance_url);

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

export async function getEvent() {
    const event_url = `${urls.attendance_url}?type=get_events`;
    const response = await fetch(event_url);
    const res = await response.json();
    return res;

}