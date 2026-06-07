import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ResumeContext } from '../ResumeContext';

const PersonalInformation = ({ navigation }) => {
  const { resumes, currentResumeId, updateResume } = useContext(ResumeContext);
  const existingInfo = resumes[currentResumeId]?.personalInformation || {};

  const [info, setInfo] = useState({
    name: '',
    lastName: '',
    title: '',
    email: '',
    address: '',
    phone: '',
    nationality: ''
  });

  

  const handleChange = (field, value) => {
    setInfo({ ...info, [field]: value });
  };

  const handleSave = () => {
    if (!currentResumeId) {
      Alert.alert('Error', 'No resume selected');
      return;
    }

    // Remove empty fields before saving
    const dataToSave = Object.fromEntries(
      Object.entries(info).filter(([_, value]) => value.trim() !== '')
    );

    console.log('Saving personal info:', dataToSave); // Debug log

    updateResume(currentResumeId, 'personalInformation', dataToSave);
    Alert.alert('Saved', 'Personal information saved successfully');
    navigation.navigate('options');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name*</Text>
          <TextInput 
            style={styles.field} 
            value={info.name} 
            onChangeText={(text) => handleChange('name', text)} 
            placeholder="Enter your first name"
            placeholderTextColor="#666"
          />
        </View>

        {/* Last Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput 
            style={styles.field} 
            value={info.lastName} 
            onChangeText={(text) => handleChange('lastName', text)}
            placeholder="Enter your last name"
            placeholderTextColor="#666"
          />
        </View>

        {/* Title Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Professional Title</Text>
          <TextInput 
            style={styles.field} 
            value={info.title} 
            onChangeText={(text) => handleChange('title', text)}
            placeholder="E.g. Software Developer"
            placeholderTextColor="#666"
          />
          <Text style={styles.description}>
            Appears next to your name. Examples: Salesperson, Project Manager
          </Text>
        </View>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email*</Text>
          <TextInput 
            style={styles.field} 
            value={info.email} 
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            placeholder="your.email@example.com"
            placeholderTextColor="#666"
          />
        </View>

        {/* Phone Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput 
            style={styles.field} 
            value={info.phone} 
            onChangeText={(text) => handleChange('phone', text)}
            keyboardType="phone-pad"
            placeholder="+123 456 7890"
            placeholderTextColor="#666"
          />
        </View>

        {/* Address Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput 
            style={styles.field} 
            value={info.address} 
            onChangeText={(text) => handleChange('address', text)}
            placeholder="City, Country"
            placeholderTextColor="#666"
          />
          <Text style={styles.description}>Example: Islamabad, Pakistan</Text>
        </View>

        {/* Nationality Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nationality</Text>
          <TextInput 
            style={styles.field} 
            value={info.nationality} 
            onChangeText={(text) => handleChange('nationality', text)}
            placeholder="E.g. Pakistani"
            placeholderTextColor="#666"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          disabled={!info.name || !info.email} // Require at least name and email
        >
          <Text style={styles.buttonText}>Save Information</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  field: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#262626',
    color: 'white',
    fontSize: 16,
  },
  description: {
    color: '#7e7e7e',
    fontSize: 13,
    marginTop: 5,
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: '#216ef2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PersonalInformation;