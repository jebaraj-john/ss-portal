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

export async function getReports(email, center, quarter) {
    let response = await fetch(
        `https://script.google.com/macros/s/AKfycbxqxjovO6w1POE8xxmM1gaYc4ZP4S88cGrAFtwDFuiUTX7PpFS4wiogCeBUIkoRyB4IKA/exec?type=get_reports&email=${email}&center=${center}&quarter_name=${quarter}`,
    );
    let json_data = await response.json();
    return json_data;
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
export function formatReportData(reportData) {
    let dataKeys = reportData[0];
    let rData = reportData.slice(1);
    const data = rData.map((row) => {
        return row.reduce(
            (result, value, index) => {
                if (["P", "A", ""].includes(value)) {
                    let att = {};

                    att[dataKeys[index]] = value;
                    result["att_list"].push(att);
                    value === "P"
                        ? (result["present_days"] += 1)
                        : value === "A"
                            ? (result["absent_days"] += 1)
                            : result;
                }

                result[dataKeys[index].replace(" ", "")] = value;
                return result;
            },
            { att_list: [], present_days: 0, absent_days: 0 },
        );
    });

    return data;
}
