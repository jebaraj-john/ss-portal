import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
    getItem: (key) => {
        console.log(key);
        return SecureStore.getItemAsync(key);
    },
    setItem: (key, value) => {
        console.log("setter", key);
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key) => {
        SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = "https://wftcvwrxdkzaykipvsxt.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmdGN2d3J4ZGt6YXlraXB2c3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2MDMyNzUsImV4cCI6MjAwODE3OTI3NX0.OAH_xH0KBiXbxZrCUyvH1hgNMdNJ4a0BTWB1_ydXeR0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
