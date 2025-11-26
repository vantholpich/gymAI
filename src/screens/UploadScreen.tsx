import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '../constants/Colors';

interface UploadScreenProps {
    onAnalyze: (videoUri: string) => void;
    onBack: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onAnalyze, onBack }) => {
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickVideo = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setVideoUri(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick video');
        }
    };

    const handleAnalyze = async () => {
        if (!videoUri) return;
        setIsLoading(true);
        // Simulate processing or just pass the URI
        // In a real app, we might compress here.
        onAnalyze(videoUri);
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Upload Exercise</Text>

            <View style={styles.previewContainer}>
                {videoUri ? (
                    <Video
                        style={styles.video}
                        source={{ uri: videoUri }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                    />
                ) : (
                    <TouchableOpacity style={styles.uploadPlaceholder} onPress={pickVideo}>
                        <Text style={styles.uploadIcon}>📹</Text>
                        <Text style={styles.uploadText}>Tap to Select Video</Text>
                    </TouchableOpacity>
                )}
            </View>

            {videoUri && (
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.secondaryButton} onPress={pickVideo}>
                        <Text style={styles.secondaryButtonText}>Choose Another</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.primaryButton, isLoading && styles.disabledButton]}
                        onPress={handleAnalyze}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Analyze Form</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
        paddingTop: 60,
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        color: Colors.textSecondary,
        fontSize: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 30,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 30,
        borderWidth: 2,
        borderColor: Colors.surface,
        borderStyle: 'dashed',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    uploadPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    uploadIcon: {
        fontSize: 64,
        marginBottom: 16,
        color: Colors.textSecondary,
    },
    uploadText: {
        fontSize: 18,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    actions: {
        gap: 16,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.textSecondary,
    },
    secondaryButtonText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.7,
    },
});
