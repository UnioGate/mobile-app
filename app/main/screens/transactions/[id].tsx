import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";
import { MainStackParamList } from "../../type";


type TransactionRouteProp = RouteProp<
    MainStackParamList,
    "transaction_details"
>



export default function TransactionDetails() {
    const route = useRoute<TransactionRouteProp>()
    const { id } = route.params


    return (
        <View style={styles.container} >

            <Text style={{ color: "white" }} >
                Transaction ID: {id}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E9ECF3",
        paddingHorizontal: 13,
        paddingTop: 20,
        width: "100%"
    },



})