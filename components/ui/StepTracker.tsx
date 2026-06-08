import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";


interface StepTrackerProps {
    currentStep: number,
    totalSteps: number,
    size?: number,
    strokeWidth?: number,
    activeColor?: string,
    trackColor?: string,
    textColor?: string
}


export default function StepTracker({
    currentStep,
    totalSteps,
    size = 56,
    strokeWidth = 4,
    activeColor = "#009A49",
    trackColor = '#E4E1E5',
    textColor = '#10182A',
}: StepTrackerProps) {


    const safeTotal = Math.max(totalSteps, 1)
    const clampedStep = Math.min(Math.max(currentStep, 0), safeTotal)
    const progress = clampedStep / safeTotal;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;


    const animatedProgress = useRef(new Animated.Value(0)).current;
    const [offset, setOffset] = React.useState(circumference);


    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animatedValue.addListener(({ value }) => {
            setOffset(circumference * (1 - value));
        });

        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();

        return () => animatedValue.removeAllListeners();
    }, [progress]);


    const strokeDashoffset = animatedProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0],
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                {/* full track */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* progress arc (starts at top, clockwise) */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={activeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </Svg>

            <View style={styles.labelContainer}>
                <Text style={[styles.label, { color: textColor, fontSize: 14 }]}>
                    {clampedStep} of {safeTotal}
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
    },
});