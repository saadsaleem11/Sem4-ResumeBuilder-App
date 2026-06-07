import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ResumeContext } from '../ResumeContext';

const EditEducation = ({ navigation }) => {
  const { currentResumeId, resumes, updateResume } = useContext(ResumeContext);

  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!degree || !institution || !startDate || !endDate) {
      Alert.alert('Missing Fields', 'Please fill in required fields.');
      return;
    }

    const newEntry = {
      degree,
      institution,
      location,
      duration: `${startDate} - ${endDate}`,
      description,
    };

    const previous = resumes[currentResumeId]?.education || [];
    const updated = [...previous, newEntry];

    updateResume(currentResumeId, 'education', updated);
    Alert.alert('Saved', 'Education saved successfully.');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Degree or Qualification</Text>
        <TextInput style={styles.field} value={degree} onChangeText={setDegree} />
        <Text style={styles.description}>Examples: BSc Computer Science, MBA</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Institution Name</Text>
        <TextInput style={styles.field} value={institution} onChangeText={setInstitution} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.field} value={location} onChangeText={setLocation} />
        <Text style={styles.description}>Examples: Lahore, Online</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Start Date</Text>
        <TextInput style={styles.field} value={startDate} onChangeText={setStartDate} />
        <Text style={styles.description}>Example: Sep 2018</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>End Date</Text>
        <TextInput style={styles.field} value={endDate} onChangeText={setEndDate} />
        <Text style={styles.description}>Example: Jun 2022</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          multiline
          numberOfLines={10}
          style={styles.descriptionfield}
          placeholder="Course highlights, achievements..."
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.ButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    padding: 15,
  },
  fieldContainer: {
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
  field: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgb(93, 93, 93)',
    borderRadius: 5,
    padding: 10,
    height: 50,
    backgroundColor: '#262626',
    color: 'white',
    elevation: 5,
  },
  description: {
    marginTop: 3,
    color: '#7e7e7e',
  },
  descriptionfield: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgb(93, 93, 93)',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#262626',
    color: 'white',
    elevation: 5,
    height: 300,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    backgroundColor: '#216ef2',
    borderRadius: 20,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditEducation;
