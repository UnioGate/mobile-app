import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";

export default function LogoReveal() {
    const revealAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animate = () => {
            revealAnim.setValue(1);

            Animated.timing(revealAnim, {
                toValue: 0,
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start(() => {
                animate();
            });
        };

        animate();
    }, []);

    const overlayWidth = revealAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/onboarding/logo-blue.png")}
                style={styles.image}
            />

            <Animated.View
                style={[
                    styles.overlay,
                    { width: overlayWidth }
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 27,
        height: 27,
        position: "relative",
        overflow: "hidden",
        transform: [{ rotate: "-35deg" }],
    },

    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },

    overlay: {
        backgroundColor: "#ffffff",
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
    },
});