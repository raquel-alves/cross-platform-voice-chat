import React from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.children} children={props.children} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    children: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Layout;