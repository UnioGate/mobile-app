import DateOfBirthInput from '@/components/ui/DOBInput';
import CustomInput from '@/components/ui/ReusableInput';
import StepTracker from '@/components/ui/StepTracker';
import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COUNTRY_OPTIONS = [
  'Nigeria',
  'United States',
  'United Kingdom',
  'Canada',
  'Ghana',
  'South Africa',
  'Kenya',
  'Germany',
  'France',
  'India',
  'Australia',
];

export default function PersonalInformation() {
  const [countryName, setCountryName] = useState('Nigeria');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const [formValues] = useState({
    firstname: '',
    lastname: '',
    emailAddress: '',
    phone: '',
    date: new Date(),
    country: '',
  });

  const sortedCountries = useMemo(() => [...COUNTRY_OPTIONS].sort((a, b) => a.localeCompare(b)), []);

  const handleCountrySelect = (selectedCountry: string) => {
    setCountryName(selectedCountry);
    setIsCountryDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Personal Information</Text>
        <StepTracker currentStep={2} totalSteps={6} />
      </View>

      <View style={styles.profilePicWrapper}>
        <Image source={require('../assets/icon.png')} />
        <Image source={require('../assets/favicon.png')} style={styles.camera} />
      </View>

      <View style={styles.formContent}>
        <View style={styles.inputsWrapper}>
          <View style={{ flexBasis: '50%' }}>
            <CustomInput label="First name" keyboardType="default" value={formValues.firstname} />
          </View>

          <View style={{ flexBasis: '50%' }}>
            <CustomInput label="Last name" keyboardType="default" value={formValues.lastname} />
          </View>
        </View>

        <CustomInput label="Email Address" keyboardType="email-address" value={formValues.emailAddress} />

        <View style={styles.inputsWrapper}>
          <View style={{ flexBasis: '50%' }}>
            <DateOfBirthInput />
          </View>

          <View style={{ flexBasis: '50%' }}>
            <Text style={styles.dropdownLabel}>Country</Text>
            <Pressable style={styles.dropdownInput} onPress={() => setIsCountryDropdownOpen(true)}>
              <Text style={styles.dropdownValue}>{countryName}</Text>
              <Text style={styles.dropdownArrow}>▾</Text>
            </Pressable>

            <Modal
              visible={isCountryDropdownOpen}
              transparent
              animationType="fade"
              onRequestClose={() => setIsCountryDropdownOpen(false)}>
              <Pressable style={styles.modalOverlay} onPress={() => setIsCountryDropdownOpen(false)}>
                <View style={styles.dropdownMenu}>
                  <ScrollView contentContainerStyle={styles.dropdownListContent}>
                    {sortedCountries.map((country) => (
                      <Pressable key={country} style={styles.dropdownOption} onPress={() => handleCountrySelect(country)}>
                        <Text style={styles.dropdownOptionText}>{country}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </Pressable>
            </Modal>
          </View>
        </View>

        <CustomInput label="Phone number" keyboardType="phone-pad" value={formValues.phone} />
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}> Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 28,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
  },

  heading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  headingText: {
    color: '#10182A',
    fontSize: 27,
  },

  profilePicWrapper: {
    width: 169,
    height: 169,
    borderRadius: 999,
    position: 'relative',
  },

  camera: {
    position: 'absolute',
    bottom: 10,
    right: -6,
  },

  formContent: {
    height: 'auto',
    marginVertical: 30,
    width: '100%',
    gap: 10,
  },

  inputsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  dropdownLabel: {
    color: '#10182A',
    marginBottom: 6,
    fontSize: 14,
  },

  dropdownInput: {
    borderWidth: 1,
    borderColor: '#D7DCE5',
    borderRadius: 10,
    minHeight: 48,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },

  dropdownValue: {
    color: '#10182A',
    fontSize: 14,
  },

  dropdownArrow: {
    color: '#7B8794',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  dropdownMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    maxHeight: 320,
    paddingVertical: 8,
  },

  dropdownListContent: {
    paddingVertical: 4,
  },

  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  dropdownOptionText: {
    color: '#10182A',
    fontSize: 15,
  },

  button: {
    width: '100%',
    backgroundColor: '#253E86',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 11,
    marginTop: 'auto',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
