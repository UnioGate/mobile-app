import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useNetwork } from "@/context/NetworkContext";
import { scaleFont } from "@/utils/utils";

export default function NetworkModal() {
    const {
        isOfflineModalVisible,
        hideOfflineModal,
    } = useNetwork();

    return (
        <Modal
            transparent
            visible={isOfflineModalVisible}
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        No Internet Connection
                    </Text>

                    <Text style={styles.message}>
                        Please check your internet connection and try again.
                    </Text>

                    <Pressable
                        onPress={hideOfflineModal}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Okay
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal: 24,
    },

    modal: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
    },

    title: {
        fontSize: scaleFont(20),
        fontFamily: "PlusJakartaSans_600SemiBold",
        color: "#000000",
    },

    message: {
        marginTop: 8,
        fontSize: scaleFont(14),
        lineHeight: 21,
        color: "#000000",
        fontFamily: "Sora_400Regular"
    },

    button: {
        marginTop: 24,
        borderRadius: 10,
        backgroundColor: "#253E86",
        padding: 16,
        alignItems: "center",
    },

    buttonText: {
        fontSize: scaleFont(14),
        fontFamily: "Sora_600SemiBold",
        color: "#FFFFFF",
    },
});