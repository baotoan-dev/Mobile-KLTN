import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

export default function ViewProfile() {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value * 255 }],
        };
    });
    return (
        <>
            <Animated.View style={[styles.box, animatedStyles]} />
            <Button onPress={() => (offset.value = Math.random())} title="Move" />
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
})