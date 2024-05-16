import { Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";

const Navbar = () => {
    const openGithubPage = () => {
        const url = "https://github.com/raqueladb/cross-platform-voice-chat";
        Platform.OS === "web" ? (
            window.open(url, "_blank")
        ) : (
            Linking.openURL(url)
        );
    };
    
    return (
        <View style={styles.container}>
            <Text>Cross Platform Voice Chat</Text>
            <Pressable onPress={openGithubPage}>
                <Text>Github</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 65,
        padding: 15,
        borderWidth: 1,
        borderColor: "#d5ccdb",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    }
});

export default Navbar;