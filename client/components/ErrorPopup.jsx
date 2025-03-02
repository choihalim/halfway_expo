import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const ErrorPopup = ({ errorMessage, isVisible, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-slate-700 p-6 rounded-lg w-4/5">
                    <Text className="text-white text-lg text-center mb-5">{errorMessage}</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-secondary py-2 px-4 rounded-lg"
                    >
                        <Text className="text-white font-semibold text-center">Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ErrorPopup;
