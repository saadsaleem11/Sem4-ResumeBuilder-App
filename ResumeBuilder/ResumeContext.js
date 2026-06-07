import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState({});
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load resumes from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('@resumes');
        if (data) {
          setResumes(JSON.parse(data));
        }
      } catch (error) {
        console.error('Load error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save to storage
  const saveResumesToStorage = useCallback(async (resumes) => {
    try {
      await AsyncStorage.setItem('@resumes', JSON.stringify(resumes));
    } catch (error) {
      console.error('Save error:', error);
    }
  }, []);

  const updateResume = useCallback((resumeId, section, data) => {
    setResumes(prev => {
      const updated = {
        ...prev,
        [resumeId]: {
          ...(prev[resumeId] || {}),
          [section]: data,
          updatedAt: new Date().toISOString()
        }
      };
      saveResumesToStorage(updated);
      return updated;
    });
  }, [saveResumesToStorage]);

  const startNewResume = useCallback((resumeId) => {
    setCurrentResumeId(resumeId);
    if (!resumes[resumeId]) {
      updateResume(resumeId, 'startedAt', new Date().toISOString());
    }
  }, [resumes, updateResume]);

  const deleteResume = useCallback(async (resumeId) => {
    setResumes(prev => {
      const updated = { ...prev };
      delete updated[resumeId];
      saveResumesToStorage(updated);
      return updated;
    });
  }, [saveResumesToStorage]);

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        currentResumeId,
        isLoading,
        startNewResume,
        updateResume,
        deleteResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};