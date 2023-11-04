import React, { useRef } from "react";
import { View } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button, TextInput, BackButton, DatePicker, SelectBox } from "../components/Form";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentForm = ({ navigation }) => {
    console.log(navigation);
    let prevDate = React.useRef("");
    const [studentData, dispatch] = React.useReducer(
        (prevState, action) => {
            // console.log(prevState);
            return {
                ...prevState,
                ...action,
            };
        },
        {
            name: {
                value: "",
                error: "",
            },
            medium: {
                value: "",
                error: "",
            },
            gender: {
                value: "",
                error: "",
            },
            fatherName: {
                value: "",
                error: "",
            },
            fatherPhone: {
                value: "",
                error: "",
            },
            motherName: {
                value: "",
                error: "",
            },
            motherPhone: {
                value: "",
                error: "",
            },
            std: {
                value: "",
                error: "",
            },
            dob: {
                value: "",
                error: "",
            },
        },
    );

    const errMsg = {
        name: { text: "Enter your name", ref: useRef(null) },
        medium: { text: "Enter your class medium", ref: useRef(null) },
        gender: { text: "select a Gender", ref: useRef(null) },
        std: { text: "Enter your Standard", ref: useRef(null) },
        fatherName: { text: "Enter your Father's Name", ref: useRef(null) },
        fatherPhone: { text: "Enter your Father's Phone", ref: useRef(null) },
        motherName: { text: "Enter your Mother's Name", ref: useRef(null) },
        motherPhone: { text: "Enter your Mother's Phone", ref: useRef(null) },
        dob: { text: "Enter your Date of Birth", ref: useRef(null) },
    };
    const dataValidator = async (data) => {
        for (let [key, value] of Object.entries(data)) {
            if (value.value === "") {
                data = {};
                data[key] = { value: "", error: errMsg[key]["text"] };
                dispatch(data);
                errMsg[key]["ref"].current.focus();
                return false;
            }
        }
        if (data.fatherPhone == "" && data.motherPhone == "") {
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        if (dataValidator(studentData)) {
            console.log("api called");
        }
    };

    const addSeparator = (text) => {
        let newData = "";
        for (let i = 0; i < text.length; i++) {
            newData += text[i];
            if ([1, 4].includes(i) && text[i + 1] != "/") {
                newData += "/";
            }
        }

        return newData;
    };

    return (
        <View style={{ width: "100%", height: Dimensions.get("window").height - 150 }}>
            <SafeAreaView>
                <ScrollView>
                    <TextInput
                        label="Name*"
                        returnKeyType="next"
                        value={studentData.name.value}
                        onChangeText={(text) => dispatch({ name: { value: text, error: "" } })}
                        error={!!studentData.name.error}
                        errorText={studentData.name.error}
                        autoCapitalize="none"
                        textContentType="name"
                        inputRef={errMsg.name.ref}
                    />
                    <TextInput
                        label="Std"
                        returnKeyType="next"
                        value={studentData.std.value}
                        onChangeText={(text) => dispatch({ std: { value: text, error: "" } })}
                        error={!!studentData.std.error}
                        errorText={studentData.std.error}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        inputRef={errMsg.std.ref}
                    />
                    <SelectBox
                        label="Medium"
                        list={[
                            {
                                label: "Tamil",
                                value: "Tamil",
                            },
                            {
                                label: "English",
                                value: "English",
                            },
                        ]}
                        value={studentData.medium.value}
                        onValueChange={(text) => dispatch({ medium: { value: text, error: "" } })}
                        errorText={studentData.medium.error}
                        inputRef={errMsg.medium.ref}
                    />
                    <SelectBox
                        label="Gender"
                        style={{ marginTop: 30, width: "100%" }}
                        list={[
                            {
                                label: "Male",
                                value: "Male",
                            },
                            {
                                label: "Female",
                                value: "Female",
                            },
                        ]}
                        value={studentData.gender.value}
                        onValueChange={(text) => dispatch({ gender: { value: text, error: "select a gender" } })}
                        errorText={studentData.gender.error}
                        inputRef={errMsg.gender.ref}
                    />

                    <DatePicker
                        label="DOB (DD/MM/YYYY)"
                        returnKeyType="next"
                        value={studentData.dob.value}
                        onChangeText={(text) => {
                            if (text.length > 10) text = text.slice(0, 10);
                            let newData;
                            if (prevDate.current.length < text.length) {
                                newData = addSeparator(text);
                            } else {
                                newData = text;
                            }
                            prevDate.current = newData;
                            let dateParts = newData.split("/");
                            let newMonth = parseInt(dateParts[1]) - 1;
                            let newYear = parseInt(dateParts[2]);
                            console.log(newData);
                            if (text.length >= 10) {
                                let date = new Date(dateParts[2], newMonth, dateParts[0]);
                                if (
                                    parseInt(dateParts[0]) !== date.getDate() ||
                                    newMonth !== date.getMonth() ||
                                    !(newYear < 3000 && newYear > 1900)
                                ) {
                                    console.log(dateParts[0] !== date.getDate());
                                    console.log(newMonth !== date.getMonth());
                                    console.log(!(newYear < 3000 && newYear > 1900));
                                    dispatch({ dob: { value: newData, error: "Please Enter valid date" } });
                                    return;
                                }
                            }
                            dispatch({ dob: { value: newData, error: "" } });
                        }}
                        error={!!studentData.dob.error}
                        errorText={studentData.dob.error}
                    />
                    <TextInput
                        label="Father Name"
                        returnKeyType="next"
                        value={studentData.fatherName.value}
                        onChangeText={(text) => dispatch({ fatherName: { value: text, error: "" } })}
                        error={!!studentData.fatherName.error}
                        errorText={studentData.fatherName.error}
                        autoCapitalize="none"
                        textContentType="name"
                        inputRef={errMsg.fatherName.ref}
                    />
                    <TextInput
                        label="Father Mobile No**"
                        returnKeyType="next"
                        value={studentData.fatherPhone.value}
                        onChangeText={(text) => dispatch({ fatherPhone: { value: text, error: "" } })}
                        error={!!studentData.fatherPhone.error}
                        errorText={studentData.fatherPhone.error}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        inputRef={errMsg.fatherPhone.ref}
                    />
                    <TextInput
                        label="Mother Name"
                        returnKeyType="next"
                        value={studentData.motherName.value}
                        onChangeText={(text) => dispatch({ motherName: { value: text, error: "" } })}
                        error={!!studentData.motherName.error}
                        errorText={studentData.motherName.error}
                        autoCapitalize="none"
                        textContentType="name"
                        inputRef={errMsg.motherName.ref}
                    />
                    <TextInput
                        label="Mother Mobile No**"
                        returnKeyType="next"
                        value={studentData.motherPhone.value}
                        onChangeText={(text) => dispatch({ motherPhone: { value: text, error: "" } })}
                        error={!!studentData.motherPhone.error}
                        errorText={studentData.motherPhone.error}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        inputRef={errMsg.motherPhone.ref}
                    />
                    <Button mode="contained" onPress={onSubmit} btnText="Add Student" />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default function AddStudent(props) {
    return (
        <Background>
            <BackButton
                goBack={() => {
                    props.navigation.navigate("Dashboard");
                }}
            />
            <Header headerText={"Add Student Page"}></Header>
            <StudentForm navigation={props.navigation} />
        </Background>
    );
}
