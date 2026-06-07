import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ResumeContext } from '../ResumeContext';

const Picture = require("./pictures/Experience.jpg");

const EducationScreen = ({ navigation }) => {
  const { resumes, currentResumeId } = useContext(ResumeContext);
  const educationList = resumes[currentResumeId]?.education || [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>
            This section is dedicated to presenting your academic career. Include your education, such as undergraduate, postgraduate, doctorate, technical education, high school, among others.
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("EditEducation")} style={styles.newEducationButton}>
            <Icon name='graduation-cap' size={20} color="#ffffff" />
            <Text style={styles.ButtonText}>New Education</Text>
          </TouchableOpacity>
        </View>

        {educationList.length > 0 ? (
          educationList.map((item, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.educationDegree}>{item.degree}</Text>
              <Text style={styles.educationInstitution}>{item.institution}</Text>
              <Text style={styles.educationDuration}>{item.duration}</Text>
              <Text style={styles.educationDescription}>{item.description}</Text>
            </View>
          ))
        ) : (
          <View style={styles.createView}>
            <Image style={styles.image} source={Picture} />
            <Text style={styles.createViewText}>No items. Create one now!</Text>
          </View>
        )}
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate("options")}
      >
        <Icon name="check" size={20} color="white" />
        <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    padding: 15,
  },
  sectionContainer: {
    marginTop: 5,
  },
  sectionText: {
    color: 'white',
  },
  fieldContainer: {
    marginTop: 15,
    marginBottom: 25,
  },
  newEducationButton: {
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#216ef2',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    height: 250,
    width: 240,
    borderRadius: 40,
  },
  createView: {
    marginTop: 100,
    alignItems: 'center',
  },
  createViewText: {
    color: 'white',
    marginTop: 10,
  },
  educationItem: {
    backgroundColor: '#262626',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  educationDegree: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  educationInstitution: {
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 3,
  },
  educationDuration: {
    color: '#aaa',
    marginTop: 2,
  },
  educationDescription: {
    color: '#ddd',
    marginTop: 5,
  },
});

export default EducationScreen;
