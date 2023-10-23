import React from "react";
import { View } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import { Button, TextInput, BackButton, DatePicker } from "../components/Form";

const StudentForm = ({ navigation }) => {
    console.log(navigation);
    let prevDate = React.useRef("");
    const [studentData, dispatch] = React.useReducer(
        (prevState, action) => {
            console.log(prevState);
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
            fatherName: {
                value: "",
                error: "",
            },
            fatherPhone: {
                value: "",
                error: "",
            },
            std: {
                value: null,
                error: "",
            },
            dob: {
                value: "",
                error: "",
            },
        },
    );

    const onSubmit = async () => {
        console.log(studentData);
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
        <View style={{ width: "100%" }}>
            <TextInput
                label="Name*"
                returnKeyType="next"
                value={studentData.name.value}
                onChangeText={(text) => dispatch({ name: { value: text, error: "" } })}
                error={!!studentData.name.error}
                errorText={studentData.name.error}
                autoCapitalize="none"
                textContentType="name"
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
                        console.log(date.toString());
                        if (
                            dateParts[0] !== date.getUTCDate() ||
                            newMonth !== date.getMonth() ||
                            (newYear < 3000 && newYear > 1900)
                        ) {
                            dispatch({ dob: { value: newData, error: "Please insert valid date" } });
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
            />
            <TextInput
                label="Father Mobile No"
                returnKeyType="next"
                value={studentData.fatherPhone.value}
                onChangeText={(text) => dispatch({ fatherPhone: { value: text, error: "" } })}
                error={!!studentData.fatherPhone.error}
                errorText={studentData.fatherPhone.error}
                autoCapitalize="none"
                keyboardType="number-pad"
            />
            <Button mode="contained" onPress={onSubmit} btnText="Add Student" />
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
