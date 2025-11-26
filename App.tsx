import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { HomeScreen } from './src/screens/HomeScreen';
import { UploadScreen } from './src/screens/UploadScreen';
import { AnalysisScreen } from './src/screens/AnalysisScreen';
import { Colors } from './src/constants/Colors';
import { analyzeExercise } from './src/services/ai';

type Screen = 'home' | 'upload' | 'analysis';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [analysisResult, setAnalysisResult] = useState<string>('');

  const handleStart = () => {
    setCurrentScreen('upload');
  };

  const handleAnalyze = async (videoUri: string) => {
    try {
      // In a real app, we would show a loading state here or in the UploadScreen
      // For now, UploadScreen handles the loading UI.
      const result = await analyzeExercise(videoUri);
      setAnalysisResult(result);
      setCurrentScreen('analysis');
    } catch (error) {
      console.error(error);
      // Handle error (show alert etc)
    }
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const handleReset = () => {
    setAnalysisResult('');
    setCurrentScreen('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {currentScreen === 'home' && <HomeScreen onStart={handleStart} />}
        {currentScreen === 'upload' && (
          <UploadScreen onAnalyze={handleAnalyze} onBack={handleBack} />
        )}
        {currentScreen === 'analysis' && (
          <AnalysisScreen result={analysisResult} onReset={handleReset} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
});
