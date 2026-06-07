import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ResumeContext } from '../ResumeContext';

const EditExperience = ({ navigation }) => {
  const { currentResumeId, resumes, updateResume } = useContext(ResumeContext);

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title || !company || !startDate || !endDate) {
      Alert.alert('Missing Fields', 'Please fill in required fields.');
      return;
    }

    const newEntry = {
      title,
      company,
      location,
      duration: `${startDate} - ${endDate}`,
      description,
    };

    const previous = resumes[currentResumeId]?.experience || [];
    const updated = [...previous, newEntry];

    updateResume(currentResumeId, 'experience', updated);
    Alert.alert('Saved', 'Experience saved successfully.');
    navigation.goBack(); // go back to ProfessionalExperience screen
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.field} value={title} onChangeText={setTitle} />
        <Text style={styles.description}>Examples: Salesperson, Software Developer, Project Manager</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Company or Institution Name</Text>
        <TextInput style={styles.field} value={company} onChangeText={setCompany} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Workplace Location</Text>
        <TextInput style={styles.field} value={location} onChangeText={setLocation} />
        <Text style={styles.description}>Examples: Islamabad-Isb, Online</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Start Date</Text>
        <TextInput style={styles.field} value={startDate} onChangeText={setStartDate} />
        <Text style={styles.description}>Example: Jan 2017</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>End Date</Text>
        <TextInput style={styles.field} value={endDate} onChangeText={setEndDate} />
        <Text style={styles.description}>Example: Dec 2020</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          multiline
          numberOfLines={10}
          style={styles.descriptionfield}
          placeholder="Managed a team of 10 people, ensured quality and safety..."
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

export default EditExperience;
