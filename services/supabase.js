import { supabase } from "../lib/supabase.js";

const getAllCenters = () => {
    return ["NLAG", "NLCC", "PORUR", "Kundrathur", "Korukpet"];
};

const getAllServices = () => {
    return ["1st Service", "2nd Service", "3rd Service", "4th Service", "5th Service", "Evening Service"];
};

const getAllDepartments = () => {
    return ["Beginner", "Primary", "Junior", "Inter", "Senior", "LG"];
};

export async function GetUserInfo(user_email) {
    let { data, error } = await supabase.rpc("get_user_info", { user_email });
    if (error) {
        throw new Error(error);
    }

    console.log(data);
    return {
        name: data.name,
        email: data.email,
        role: data.role,
        centers: data.center === "all" ? getAllCenters() : [data.center],
        services: data.service === "all" ? getAllServices() : [data.service],
        departments: data.service === "all" ? getAllDepartments() : [data.service],
        teachers: data.teachers ? data.teachers : [],
    };
}

const findAttendanceDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysAgo = (dayOfWeek + 7) % 7; // Days to subtract to get last Sunday

    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - daysAgo);

    return `${lastSunday.getFullYear()}-${lastSunday.getMonth()}-${lastSunday.getDate()}`;
};

export async function GetStudents(email, center, attendanceDate = null) {
    console.log(center);
    if (!attendanceDate) {
        attendanceDate = findAttendanceDate();
    }

    let { data, error } = await supabase.rpc("get_students_attendance", { attendanceDate, email });
    console.log(data);
    if (error) {
        throw new Error(error);
    }

    return data;
}
