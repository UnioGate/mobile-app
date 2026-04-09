
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View } from "react-native";
import CustomInput from "./ReusableInput";


export default function DateOfBirthInput() {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
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