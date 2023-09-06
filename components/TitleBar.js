import React from "react";
import { Alert } from "react-native";
import { Button,Divider,Appbar, Menu,View,IconButton } from "react-native-paper";
import { supabase } from "../lib/supabase";
import { useState } from "react";
// import { Icon } from "react-native-elements";
// Icon

const TitleBar = (props) => {
    const [ShowMenu, setShowMenu] = useState(false)
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);
    return (
        
        <Appbar.Header>
            <Appbar.Content title={props.title} />
            <Menu
                style={{left:230}}
                visible={visible}
                onDismiss={closeMenu}
                anchorPosition="bottom"
                anchor={<IconButton icon= "account-circle-outline" size={25} onPress={openMenu}></IconButton>}>
                <Menu.Item title="Change Password" onPress={()=>{
                    props.navigation.navigate("ChangePasswordScreen")
                }} />
                <Menu.Item onPress={() =>{
                    Alert.alert("Logout","Are you sure want to Logout?",[{
                        text:"Cancel",
                        style:"cancel"
                    },{
                        text:"Logout",
                        onPress:async()=>{
                            await supabase.auth.signOut();
                            props.navigation.navigate("LoginScreen")
                        }
                    }])
                }} title="LogOut" />
            </Menu>
        </Appbar.Header>


    );
};

export default TitleBar;
