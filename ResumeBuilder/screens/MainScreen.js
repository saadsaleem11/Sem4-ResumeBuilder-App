import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { ResumeContext } from '../ResumeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const logoImage = require("./pictures/logo.jpg");

const MainScreen = ({ navigation }) => {
  const { resumes, startNewResume, deleteResume } = useContext(ResumeContext);
  const [hasResumes, setHasResumes] = useState(false);

  useEffect(() => {
    setHasResumes(Object.keys(resumes).length > 0);
  }, [resumes]);

  const calculateProgress = (resume) => {
    const sections = [
      resume.personalInformation,
      resume.objective,
      resume.experience?.length > 0,
      resume.education?.length > 0
    ];
    return Math.round((sections.filter(Boolean).length / 4) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric'
    });
  };

  const getResumeName = (resume) => {
    return resume.personalInformation?.name || 
           resume.personalInformation?.title || 
           'Unnamed Resume';
  };

  if (!hasResumes) {
    return (
      <View style={styles.emptyContainer}>
        <Image style={styles.logo} source={logoImage} />
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => {
            const newId = Date.now().toString();
            startNewResume(newId);
            navigation.navigate('options');
          }}
        >
          <Text style={styles.createButtonText}>Create your first resume now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resumes</Text>
      
      <FlatList
        data={Object.entries(resumes)}
        keyExtractor={([id]) => id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item: [id, resume] }) => (
          <View style={styles.resumeCard}>
            <TouchableOpacity 
              style={styles.resumeContent}
              onPress={() => {
                startNewResume(id);
                navigation.navigate('options');
              }}
            >
              <Text style={styles.resumeName}>{getResumeName(resume)}</Text>
              <Text style={styles.resumeProgress}>
                {calculateProgress(resume)}% complete
              </Text>
              <Text style={styles.resumeDate}>
                Last updated: {formatDate(resume.updatedAt || resume.startedAt)}
              </Text>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill, 
                  { width: `${calculateProgress(resume)}%` }
                ]} />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteResume(id)}
            >
              <Icon name="trash" size={18} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity 
        style={styles.newButton}
        onPress={() => {
          const newId = Date.now().toString();
          startNewResume(newId);
          navigation.navigate('options');
        }}
      >
        <Icon name="plus" size={20} color="white" />
        <Text style={styles.newButtonText}>NEW RESUME</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  resumeCard: {
    backgroundColor: '#263242',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumeContent: {
    flex: 1,
  },
  resumeName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  resumeProgress: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 4,
  },
  resumeDate: {
    fontSize: 12,
    color: '#7e7e7e',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#1b1b1b',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#216ef2',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },
  separator: {
    height: 16,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#216ef2',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  newButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 180,
    width: 180,
    borderRadius: 40,
    marginBottom: 40,
  },
  createButton: {
    backgroundColor: '#216ef2',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 5,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainScreen;