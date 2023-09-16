import React from "react";
import { View } from "react-native";

import Background from "../components/Background";
import Header from "../components/Header";
import { Button, TextInput, BackButton, DatePicker } from "../components/Form";


const StudentForm = ({ navigation }) => {
    console.log(navigation);
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

    const onSubmit = async () => {};

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
                // value={studentData.dob.value}
                onChangeText={(text) => dispatch({ dob: { value: text, error: "" } })}
                error={!!studentData.fatherName.error}
                errorText={studentData.fatherName.error}
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
                textContentType="name"
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
