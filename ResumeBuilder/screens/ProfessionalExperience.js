import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ResumeContext } from '../ResumeContext';

const Picture = require("./pictures/Experience.jpg");

const ProfessionalExperience = ({ navigation }) => {
  const { resumes, currentResumeId } = useContext(ResumeContext);
  const experiences = resumes[currentResumeId]?.experience || [];

  const renderItem = ({ item }) => (
    <View style={styles.experienceItem}>
      <Text style={styles.experienceTitle}>{item.title}</Text>
      <Text style={styles.experienceCompany}>{item.company}</Text>
      <Text style={styles.experienceDuration}>{item.duration}</Text>
      <Text style={styles.experienceDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>
            This section summarizes your professional background including past roles,
            responsibilities, and achievements. It provides employers with insight into your career history and relevant skills.
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("EditExperience")} style={styles.newExperienceButton}>
            <Icon name='user' size={20} color={'white'} />
            <Text style={styles.ButtonText}>New Experience</Text>
          </TouchableOpacity>
        </View>

        {experiences.length > 0 ? (
          experiences.map((item, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experienceTitle}>{item.title}</Text>
              <Text style={styles.experienceCompany}>{item.company}</Text>
              <Text style={styles.experienceDuration}>{item.duration}</Text>
              <Text style={styles.experienceDescription}>{item.description}</Text>
            </View>
          ))
        ) : (
          <View style={styles.createView}>
            <Image style={styles.image} source={Picture} />
            <Text style={styles.createViewText}>No items. Create one now!</Text>
          </View>
        )}
      </ScrollView>

      {/* Save Button at Bottom */}
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
  newExperienceButton: {
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
  experienceItem: {
    backgroundColor: '#262626',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  experienceTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  experienceCompany: {
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 3,
  },
  experienceDuration: {
    color: '#aaa',
    marginTop: 2,
  },
  experienceDescription: {
    color: '#ddd',
    marginTop: 5,
  },
});

export default ProfessionalExperience;
