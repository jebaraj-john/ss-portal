import DropDown from "react-native-paper-dropdown";
import React, { useState } from "react";
import { View } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";
import { TextInput as Input, Text } from "react-native-paper";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DatePickerModal } from "react-native-paper-dates";
import { getDateString } from "../utils/Utils";

export const SelectBox = (props) => {
    const [showDrop, setShowDrop] = useState(false);
    const [value, setValue] = useState(props.value);
    const onValueChange = (value) => {
        setValue(value);
        if (props.onValueChange) {
            // console.log(value);
            props.onValueChange(value);
        }
    };
    return (
        <View style={props && props.style}>
            <DropDown
                dropDownItemTextStyle={selectBoxStyles.textBoxItemStyle}
                inputProps={{ style: selectBoxStyles.container,ref :props.inputRef}}
                dropDownItemSelectedTextStyle={selectBoxStyles.selectedTextStyle}
                dropDownItemSelectedStyle={selectBoxStyles.itemSelectedStyle}
                dropDownStyle={selectBoxStyles.dropDownStyle}
                dropDownItemStyle={selectBoxStyles.itemStyle}
                theme={theme}
                label={props.label}
                mode={"outlined"}
                visible={showDrop}
                value={value}
                setValue={onValueChange}
                list={props.list}
                showDropDown={() => setShowDrop(true)}
                onDismiss={() => setShowDrop(false)}
                
            />
            {props.errorText ? <Text style={textInputStyles.error}>{props.errorText}</Text> : null}
        </View>
    );
};

export function Button({ mode, style, ...props }) {
    return (
        <PaperButton
            style={[buttonStyles.button, mode === "outlined" && { backgroundColor: theme.colors.surface }, style]}
            labelStyle={buttonStyles.text}
            mode={mode}
            {...props}>
            {props.btnText}
        </PaperButton>
    );
}

export function TextInput({ errorText, description, ...props }) {
    console.log(props);
    return (
        <View style={textInputStyles.container}>
            <Input
                ref={props.inputRef}
                style={textInputStyles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {description && !errorText ? <Text style={textInputStyles.description}>{description}</Text> : null}
            {errorText ? <Text style={textInputStyles.error}>{errorText}</Text> : null}
        </View>
    );
}

export function DatePicker({ errorText, description, ...props }) {
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
            console.log(date);
        },
        [setOpen, setDate],
    );

    return (
        <View style={textInputStyles.container}>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
            />
            <Input
                style={textInputStyles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                value={getDateString(date, "/")}
                keyboardType="number-pad"
                right={<Input.Icon name="eye" size={20} onPress={() => setOpen(true)} />}
                {...props}
            />
            {description && !errorText ? <Text style={textInputStyles.description}>{description}</Text> : null}
            {errorText ? <Text style={textInputStyles.error}>{errorText}</Text> : null}
        </View>
    );
}

export function BackButton({ goBack }) {
    return (
        <TouchableOpacity onPress={goBack} style={backButtonStyles.container}>
            <Image style={backButtonStyles.image} source={require("../assets/arrow_back.png")} />
        </TouchableOpacity>
    );
}

const selectBoxStyles = StyleSheet.create({
    container: {
        height: 40,
    },
    dropDownStyle: {},
    itemSelectedStyle: {},
    itemStyle: {},
    selectedTextStyle: {},
    textBoxItemStyle: {},
});

const backButtonStyles = StyleSheet.create({
    container: {
        left: 4,
        position: "absolute",
        top: 10 + getStatusBarHeight(),
    },
    image: {
        height: 24,
        width: 24,
    },
});

const buttonStyles = StyleSheet.create({
    button: {
        marginVertical: 10,
        paddingVertical: 2,
        width: "100%",
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        lineHeight: 26,
    },
});

const textInputStyles = StyleSheet.create({
    container: {
        marginVertical: 12,
        padding: 5,
        width: "100%",
    },
    description: {
        color: theme.colors.secondary,
        fontSize: 13,
        paddingTop: 8,
    },
    error: {
        color: theme.colors.error,
        fontSize: 13,
        paddingTop: 8,
    },
    input: {
        backgroundColor: theme.colors.surface,
    },
});
