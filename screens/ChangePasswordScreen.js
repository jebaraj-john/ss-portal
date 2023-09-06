import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import { BackButton, Button, TextInput } from "../components/Form";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";


const ChangePasswordScreen = () => {
  const [newPassword, setnewPassword] = useState({ value: "", error: "" });
  const [confirmNewpassword, setconfirmNewpassword] = useState({ value: "", error: "" });

  const onChangePwdPressed = async () => {
	const passwordError = passwordValidator(newPassword.value);
	if (passwordError) {
		setnewPassword({ ...password, error: passwordError });
		return;
	}
      if(newPassword.value!==confirmNewpassword.value){
        Alert.alert("Password Mismatch")
        return;
      }

      const {error} = await supabase.auth.update({ password:  newPassword.value});

      if (error) {
          Alert.alert(error.message);
          return;
      }

      navigation.navigate("Login");
	  //ToDo : Toast to Indicate whether the password is updated or not
  };
  return (
    <Background>
      <BackButton
        goBack={() => {
            navigation.navigate("Dashboard");
        	}}
      	/>
            <Logo />
            <Header headerText={"Welcome back."}></Header>

            <TextInput
                label="New Password"
                returnKeyType="done"
                value={newPassword.value}
                onChangeText={(text) => setnewPassword({ value: text, error: "" })}
                error={!!newPassword.error}
                errorText={newPassword.error}
                secureTextEntry
            />
            <TextInput
                label="Confirm Password"
                returnKeyType="done"
                value={confirmNewpassword.value}
                onChangeText={(text) => setconfirmNewpassword({ value: text, error: "" })}
                error={!!confirmNewpassword.error}
                errorText={confirmNewpassword.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={onChangePwdPressed} btnText="Change Password" />
        </Background>
  )
}
const styles = StyleSheet.create({
  forgot: {
      color: theme.colors.secondary,
      fontSize: 13,
  },
  forgotPassword: {
      alignItems: "flex-end",
      marginBottom: 24,
      width: "100%",
  },
  link: {
      color: theme.colors.primary,
      fontWeight: "bold",
  },
  row: {
      flexDirection: "row",
      marginTop: 4,
  },
});
export default ChangePasswordScreen;