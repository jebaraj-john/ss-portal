import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import "expo-dev-client";


import React from 'react';
import { Button } from 'react-native';

function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
  );
}

const LoginScreen = () => {
    GoogleSignin.configure({
        webClientId: '943862444859-6vor0a00ocq68cgd5p1th5kci1vfmu1q.apps.googleusercontent.com',
    });

    const onGoogleButtonPress = async() => {
    // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        // Sign-in the user with the credential
        //return auth().signInWithCredential(googleCredential);
        const user_sign_in =  auth().signInWithCredential(googleCredential); 
        user_sign_in
            .then((user) => {
            console.log(user);
        })
            .catch((error) =>{
            console.log(error);
        });
    }
    
    return(
        <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
    );
}

export {LoginScreen};

 