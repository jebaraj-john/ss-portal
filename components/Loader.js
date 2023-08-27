import React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, ActivityIndicator } from "react-native-paper";

const Loader = (props) => {
    console.log(props);
    const containerStyle = { backgroundColor: "lightgrey", padding: 20, height: "30%", borderRadius: 30 };
    return (
        <Portal>
            <Modal
                visible={props.length == 0 ? false : props.show}
                contentContainerStyle={containerStyle}
                dismissable={false}>
                <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#e1b0ff" />
                    <Text variant="titleLarge" style={{ marginTop: 10 }}>
                        Loading
                    </Text>
                </View>
            </Modal>
        </Portal>
    );
};

export default Loader;
