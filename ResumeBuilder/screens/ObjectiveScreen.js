import React, { useContext, useState, useEffect } from 'react';

import {View , Text , TouchableOpacity , TextInput , StyleSheet , KeyboardAvoidingView} from 'react-native';
import { ResumeContext } from '../ResumeContext';

const ObjectiveScreen = ({navigation}) => {
    const { resumes, currentResumeId, updateResume } = useContext(ResumeContext);
    const existingObjective = resumes[currentResumeId]?.objective || '';
  const [objective, setObjective] = useState('');

   useEffect(() => {
    if (existingObjective) setObjective(existingObjective);
  }, [existingObjective]);

  const handleSave = () => {
    if (!currentResumeId) {
      alert("No resume selected!");
      return;
    }
    updateResume(currentResumeId, 'objective', objective);
    alert("Objective Saved!");
    navigation.navigate('options'); 
  };

    return(
        <View style={styles.container}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>In this section,it's important to be clear and concise,highlighting your career goals and how they align with the company and position you're applying for.</Text>
            </View>

            <KeyboardAvoidingView style={styles.objectiveMainView} >
            <Text style={styles.objectiveText}>Your Objective:</Text>
            <View style={styles.objectiveView}>
                
                <TextInput style={styles.objectiveInput} placeholder='Looking for a position as an administrative assistant to apply my organisational and communication skills,contributing to the operational efficiency and administrative support of the team.'  placeholderTextColor="#888" multiline numberOfLines={20}   value={objective}                // <-- bind local state here
  onChangeText={setObjective} />
            </View>
            </KeyboardAvoidingView>

             <View style={styles.fieldContainer}>
                            <TouchableOpacity onPress={handleSave} style={styles.saveButton}><Text style={styles.ButtonText}>Save</Text></TouchableOpacity>
                        </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#1b1b1b',
        padding : 15,
    },
    sectionContainer  :{
        marginTop : 5,
    },
    sectionText : {
        color : 'white',
        
    },
    objectiveMainView : {
        marginTop : 50,
        
        

    },
    objectiveView: {
        marginTop : 5,
        borderWidth :1,
        borderColor : 'rgb(93, 93, 93)',
        borderRadius : 7,
        padding : 10,
        height : 300,
        backgroundColor : '#262626',
        
    },
    objectiveText : {
        color : 'white',
        

    },
    objectiveInput : {
        color : 'white',
    },
    saveButton : {
        marginTop : 15,
        alignItems : 'center',
        borderWidth : 1,
        marginBottom : 25,
        padding : 10,
        backgroundColor : '#216ef2',
        borderRadius : 20,

        
    },
    ButtonText : {
        color : 'white',
        fontWeight : 'bold',
        fontSize : 16,
    }
})

export default ObjectiveScreen;