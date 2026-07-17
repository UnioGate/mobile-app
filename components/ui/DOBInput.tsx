
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";
import { TextInputProps } from "react-native-paper";
import CustomInput from "./ReusableInput";


interface DateOfBirthInputProps extends TextInputProps {
  date: Date;
  onDateChange: (date: Date) => void;
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DateOfBirthInput({
  date,
  setShowPicker,
  showPicker,
  onDateChange
}: DateOfBirthInputProps) {

  const handleChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View>
      <CustomInput
        label="Date of Birth"
        placeholder="MM/DD/YYYY"
        value={date ? `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}` : ""}
        onFocus={() => setShowPicker(true)}
        leftElement={<Ionicons name="calendar-outline" size={20} color="#000" />}
      />

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}