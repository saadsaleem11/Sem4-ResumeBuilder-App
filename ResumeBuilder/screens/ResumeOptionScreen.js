import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ResumeContext } from '../ResumeContext';

const ResumeOptionScreen = ({ navigation }) => {
  const { resumes, currentResumeId } = useContext(ResumeContext);
  const resume = resumes[currentResumeId] || {};

  // Check if section has data
  const isSectionComplete = (section) => {
    switch(section) {
      case 'PersonalInformation':
        return !!resume.personalInformation;
      case 'Objective':
        return !!resume.objective;
      case 'ProfessionalExperience':
        return resume.experience?.length > 0;
      case 'Education':
        return resume.education?.length > 0;
      default:
        return false;
    }
  };

  return (
    <View style={styles.container}>
      {/* Picture option */}
      <TouchableOpacity style={styles.addPicture}>
        <View style={styles.iconButton}>
          <Icon name="camera" size={30} color="#ffffff"/>
          <Text style={styles.optionalText}>(Optional)</Text>
        </View>
      </TouchableOpacity>

      {/* Personal Information */}
      <TouchableOpacity 
        onPress={() => navigation.navigate("PersonalInformation")} 
        style={styles.touchableFields}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.fieldText}>
            <Icon name='user' size={20} color="#ffffff" />
            <Text style={styles.insideText}>Personal Information</Text>
          </View>
        </View>
        {isSectionComplete('PersonalInformation') && (
          <Icon name="check-circle" size={20} color="#4CAF50" style={styles.checkMark} />
        )}
      </TouchableOpacity>

      {/* Objective */}
      <TouchableOpacity 
        onPress={() => navigation.navigate("ObjectiveScreen")} 
        style={styles.touchableFields}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.fieldText}>
            <Icon name='bullseye' size={20} color="#ffffff" />
            <Text style={styles.insideText}>Objective</Text>
          </View>
        </View>
        {isSectionComplete('Objective') && (
          <Icon name="check-circle" size={20} color="#4CAF50" style={styles.checkMark} />
        )}
      </TouchableOpacity>

      {/* Professional Experience */}
      <TouchableOpacity 
        onPress={() => navigation.navigate("ProfessionalExperience")} 
        style={styles.touchableFields}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.fieldText}>
            <Icon name='building' size={20} color="#ffffff" />
            <Text style={styles.insideText}>Professional Experience</Text>
          </View>
        </View>
        {isSectionComplete('ProfessionalExperience') && (
          <Icon name="check-circle" size={20} color="#4CAF50" style={styles.checkMark} />
        )}
      </TouchableOpacity>

      {/* Education */}
      <TouchableOpacity 
        onPress={() => navigation.navigate("EducationScreen")} 
        style={styles.touchableFields}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.fieldText}>
            <Icon name='graduation-cap' size={20} color="#ffffff" />
            <Text style={styles.insideText}>Education</Text>
          </View>
        </View>
        {isSectionComplete('Education') && (
          <Icon name="check-circle" size={20} color="#4CAF50" style={styles.checkMark} />
        )}
      </TouchableOpacity>

      {/* Preview Screen */}
      <TouchableOpacity 
        onPress={() => navigation.navigate("PreviewScreen")} 
        style={[styles.touchableFields, { backgroundColor: 'green' }]}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.fieldText}>
            <Icon name='eye' size={20} color="#ffffff" />
            <Text style={styles.insideText}>Preview Resume</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 40,
  },
  addPicture: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#263242',
    borderWidth: 1,
    borderColor: '#263242',
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 12,
  },
  iconButton: {
    alignItems: 'center',
  },
  optionalText: {
    marginTop: 5,
    color: '#aaaaaa',
    fontSize: 14,
  },
  touchableFields: {
    marginTop: 10,
    backgroundColor: '#263242',
    borderWidth: 1,
    borderColor: '#263242',
    padding: 9,
    borderRadius: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  fieldText: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  insideText: {
    fontSize: 16,
    color: 'white',
  },
  checkMark: {
    marginRight: 10,
  }
});

export default ResumeOptionScreen;