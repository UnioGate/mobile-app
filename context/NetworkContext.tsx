import { NetworkContextType } from "@/app/main/type";
import NetInfo from "@react-native-community/netinfo";
import React, { createContext, useContext, useEffect, useState } from "react";




const NetworkContext = createContext<NetworkContextType | undefined>(
    undefined
)


export function NetworkProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isOnline, setIsOnline] = useState(true)
    const [isCheckingNetwork, setIsCheckingNetwork] = useState(true)
    const [isOfflineModalVisible, setIsOfflineModalVisible] = useState(false)



    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const online =
                state.isConnected === true &&
                state.isInternetReachable !== false;


            setIsOnline(online)
            setIsCheckingNetwork(false)


            // if connection comes back, close the modal

            if (online) {
                setIsOfflineModalVisible(false)
            }
        });


        return unsubscribe
    }, []);



    const checkNetwork = async () => {
        const state = await NetInfo.fetch();

        const online =
            state.isConnected === true &&
            state.isInternetReachable !== false;

        setIsOnline(online);

        if (!online) {
            setIsOfflineModalVisible(true);
        }

        return online;
    };



    const showOfflineModal = () => {
        setIsOfflineModalVisible(true)
    }

    const hideOfflineModal = () => {
        setIsOfflineModalVisible(false)
    }


    return (
        <NetworkContext.Provider
            value={{
                isOnline,
                isCheckingNetwork,
                checkNetwork,
                showOfflineModal,
                hideOfflineModal,
                isOfflineModalVisible
            }}
        >
            {children}
        </NetworkContext.Provider>
    );
}



export function useNetwork() {
    const context = useContext(NetworkContext);


    if (!context) {
        throw new Error(
            "useNetwork must be used inside NetworkProvider"
        )
    }

    return context
}