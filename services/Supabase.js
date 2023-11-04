import { supabase } from "../lib/supabase.js";
import { findAttendanceDate } from "../utils/Utils.js";

const getAllCenters = () => {
    return ["NLAG", "NLCC", "Porur", "Kundrathur", "Korukpet"];
};

const getAllServices = () => {
    return ["1st Service", "2nd Service", "3rd Service", "4th Service", "5th Service", "Evening Service"];
};

const getAllDepartments = () => {
    return ["Beginner", "Primary", "Junior", "Inter", "Senior", "LG"];
};

export async function CheckStudExits(studInfo) {
    let { data, error } = await supabase.rpc('is_student_details_present', {
        p_dob: studInfo.dob,
        p_father_mobile_no: studInfo.father_mobile_no,
        p_gender: studInfo.gender,
        p_mother_mobile_no: studInfo.mother_mobile_no
    });

    if (error) {
        throw new Error(error);
    }

   return data;
}


export async function GetUserInfo(user_email) {
    let { data, error } = await supabase.rpc("get_user_info", { user_email });
    if (error) {
        throw new Error(error);
    }

    if (!data) {
        return {
            name: "Guest",
            email: user_email,
            role: "guest",
            centers: [],
            services: [],
            departments: [],
            teachers: [],
        };
    }

    console.log("user_info", data);
    return {
        name: data.name,
        email: data.email,
        role: data.role,
        centers: data.center === "all" ? getAllCenters() : [data.center],
        services: data.service === "all" ? getAllServices() : [data.service],
        departments: data.department === "all" ? getAllDepartments() : [data.department],
        teachers: data.teachers ? data.teachers : [],
    };
}

const formatReportDate = (date) => {
    let dateParts = date.split("-");

    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};

export async function getReports(teacher_email, center, quarter_name) {
    let { data, error } = await supabase.rpc("get_quarterly_stud_attendance_report", { quarter_name, teacher_email });
    let reportHeaders = ["student_id", "StudName"];
    let report = [reportHeaders];
    let reportData = data.reduce((accumulator, attDet) => {
        let attDate = formatReportDate(attDet.attendance_date);

        if (!(attDet.student_id in accumulator)) {
            accumulator[attDet.student_id] = { student_id: attDet.student_id };
        }

        if (!reportHeaders.includes(attDate)) {
            reportHeaders.push(attDate);
        }

        accumulator[attDet.student_id]["StudName"] = attDet.student_name;
        accumulator[attDet.student_id]["StudId"] = attDet.student_id;
        accumulator[attDet.student_id]["teacher_id"] = attDet.teacher_id;
        accumulator[attDet.student_id][attDate] = attDet.attendance_status;

        return accumulator;
    }, {});

    for (let reportRow of Object.values(reportData)) {
        let studRow = reportHeaders.map((headerKey) => reportRow[headerKey]);

        report.push(studRow);
    }

    console.log(report);
    if (error) {
        throw new Error(error);
    }

    return report;
}

export async function GetStudents(email_param, center, attendance_date = null) {
    if (!attendance_date) {
        attendance_date = findAttendanceDate();
    }
    console.log(attendance_date);

    let { data, error } = await supabase.rpc("get_students_attendance", { attendance_date, email_param });
    const studAttList = data.map((studAtt) => {
        return {
            name: studAtt.student_name,
            id: studAtt.student_id,
            att: studAtt.attendance_status,
        };
    });

    if (error) {
        throw new Error(error);
    }

    return studAttList;
}

export async function PostAttendance(attRecords) {
    console.log("I am at post at");
    console.log("supa post", attRecords);
    let attDate;
    if (attRecords.date) {
        console.log("att page date", attRecords.date);
        let dateParts = attRecords.date.split("/");
        attDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    } else {
        attDate = findAttendanceDate();
        console.log("att find date", attDate);
    }

    let attData = attRecords.att_data.map((studData) => {
        return {
            stud_id: studData.id,
            date: attDate,
            att_status: studData.att,
        };
    });
    let records = attData;
    console.log(records);
    let response = await supabase.rpc("update_or_insert_attendance_batch", {
        records,
    });
    console.log(response);

    if (response.error) {
        throw new Error(JSON.stringify(response.error));
    }

    return response.data;
}
