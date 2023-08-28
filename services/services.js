import { urls } from "../config";
import * as GoogleApp from "./GoogleApp.js";
import * as Supabase from "./Supabase.js";

export function filterEvent(eventLabel, allEventDetails) {
    console.log(allEventDetails);
    const filteredEvent = allEventDetails.filter((type) => type.EventType === eventLabel);
    return filteredEvent;
}

export async function getReports(email, center, quarter) {
    const apiProviders = {
        googleApp: GoogleApp.getReports,
        supabase: Supabase.getReports,
    };

    return await apiProviders["supabase"](email, center, quarter);
}

export async function GetStudents(email, center) {
    const apiProviders = {
        googleApp: GoogleApp.GetStudents,
        supabase: Supabase.GetStudents,
    };

    return await apiProviders["supabase"](email, center);
}

export async function GetUserInfo(email) {
    const apiProviders = {
        googleApp: GoogleApp.GetUserInfo,
        supabase: Supabase.GetUserInfo,
    };

    return await apiProviders["supabase"](email);
}

export async function PostAttendance(attRecords) {
    const apiProviders = {
        googleApp: GoogleApp.PostAttendance,
        supabase: Supabase.PostAttendance,
    };

    return await apiProviders["supabase"](attRecords);
}

export async function getEvent() {
    const event_url = `${urls.attendance_url}?type=get_events`;
    const response = await fetch(event_url);
    const res = await response.json();
    return res;
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
