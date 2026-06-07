import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ResumeContext } from '../ResumeContext';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


const PreviewScreen = () => {
  const { resumes, currentResumeId } = useContext(ResumeContext);
  const resume = resumes[currentResumeId] || {};

  const handlePrint = async () => {
    try {
      const html = generateHtml(resume);
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Sharing not available", "Cannot share the PDF file.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while generating PDF.");
    }
  };

  const generateHtml = (resumeData) => {
    const { personalInformation, objective, education, experience } = resumeData;
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif; padding: 40px; color: #333; }
            h1 { text-align: center; text-transform: uppercase; color: #2c3e50; margin-bottom: 5px; }
            .title { text-align: center; color: #216ef2; font-size: 18px; margin-top: 0; }
            .contact { text-align: center; color: #7f8c8d; font-size: 14px; margin-bottom: 30px; }
            .section-title { color: #2c3e50; font-size: 18px; text-transform: uppercase; border-bottom: 2px solid #216ef2; padding-bottom: 5px; margin-top: 30px; margin-bottom: 15px; }
            .item { margin-bottom: 20px; }
            .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; color: #2c3e50; }
            .item-date { color: #216ef2; font-size: 14px; }
            .item-subtitle { font-style: italic; color: #7f8c8d; margin: 3px 0; }
            .item-location { color: #95a5a6; font-size: 13px; }
            .item-desc { margin-top: 8px; line-height: 1.5; font-size: 14px; color: #34495e; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>${personalInformation?.name || 'Your Name'} ${personalInformation?.lastName || ''}</h1>
          ${personalInformation?.title ? `<p class="title">${personalInformation.title}</p>` : ''}
          <div class="contact">
            ${personalInformation?.email ? personalInformation.email : ''}
            ${personalInformation?.phone ? ` | ${personalInformation.phone}` : ''}
            ${personalInformation?.address ? ` | ${personalInformation.address}` : ''}
          </div>

          ${objective ? `
            <div class="section-title">OBJECTIVE</div>
            <p class="item-desc">${objective}</p>
          ` : ''}

          ${education?.length > 0 ? `
            <div class="section-title">EDUCATION</div>
            ${education.map(edu => `
              <div class="item">
                <div class="item-header">
                  <span>${edu.degree || ''}</span>
                  <span class="item-date">${edu.duration || ''}</span>
                </div>
                <div class="item-subtitle">${edu.institution || ''}</div>
                <div class="item-location">${edu.location || ''}</div>
                <div class="item-desc">${edu.description || ''}</div>
              </div>
            `).join('')}
          ` : ''}

          ${experience?.length > 0 ? `
            <div class="section-title">EXPERIENCE</div>
            ${experience.map(exp => `
              <div class="item">
                <div class="item-header">
                  <span>${exp.title || ''}</span>
                  <span class="item-date">${exp.duration || ''}</span>
                </div>
                <div class="item-subtitle">${exp.company || ''}</div>
                <div class="item-location">${exp.location || ''}</div>
                <div class="item-desc">${exp.description || ''}</div>
              </div>
            `).join('')}
          ` : ''}
        </body>
      </html>
    `;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {resume.personalInformation?.name || 'Your Name'}
          {resume.personalInformation?.lastName && ` ${resume.personalInformation.lastName}`}
        </Text>

        {resume.personalInformation?.title && (
          <Text style={styles.title}>{resume.personalInformation.title}</Text>
        )}

        <View style={styles.contactContainer}>
          {resume.personalInformation?.email && (
            <Text style={styles.contactItem}>{resume.personalInformation.email}</Text>
          )}

          {resume.personalInformation?.phone && (
            <Text style={styles.contactItem}> | {resume.personalInformation.phone}</Text>
          )}

          {resume.personalInformation?.address && (
            <Text style={styles.contactItem}> | {resume.personalInformation.address}</Text>
          )}
        </View>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Objective Section */}
      {resume.objective && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OBJECTIVE</Text>
          <Text style={styles.sectionContent}>{resume.objective}</Text>
        </View>
      )}

      {/* Education Section */}
      {resume.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resume.education.map((edu, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                {edu.duration && <Text style={styles.itemDate}>{edu.duration}</Text>}
              </View>
              {edu.institution && <Text style={styles.itemSubtitle}>{edu.institution}</Text>}
              {edu.location && <Text style={styles.itemLocation}>{edu.location}</Text>}
              {edu.description && (
                <Text style={styles.itemDescription}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Experience Section */}
      {resume.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {resume.experience.map((exp, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.title}</Text>
                {exp.duration && <Text style={styles.itemDate}>{exp.duration}</Text>}
              </View>
              {exp.company && <Text style={styles.itemSubtitle}>{exp.company}</Text>}
              {exp.location && <Text style={styles.itemLocation}>{exp.location}</Text>}
              {exp.description && (
                <Text style={styles.itemDescription}>{exp.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}
      {/* Print Button */}
      <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
        <Text style={styles.printButtonText}>PRINT / SHARE PDF</Text>
      </TouchableOpacity>

      {/* Bottom Padding */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: '#216ef2',
    fontWeight: '600',
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    borderBottomWidth: 2,
    borderBottomColor: '#216ef2',
    paddingBottom: 5,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
  },
  item: {
    marginBottom: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
  },
  itemSubtitle: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  itemLocation: {
    color: '#95a5a6',
    fontSize: 13,
  },
  itemDate: {
    color: '#216ef2',
    fontSize: 14,
    fontWeight: '500',
  },
  itemDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
  },
  printButton: {
    backgroundColor: '#216ef2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  printButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreviewScreen;