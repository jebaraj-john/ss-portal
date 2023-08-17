import React from "react";
import { Text, View } from "react-native";

const User = () => {
    const greenColor = "#006600";

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: greenColor, fontSize: 40 }}>User Screen!</Text>
        </View>
    );
};

export default User;
