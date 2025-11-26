import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import Markdown from 'react-native-markdown-display';

interface AnalysisScreenProps {
    result: string;
    onReset: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ result, onReset }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Analysis Results</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                <View style={styles.resultCard}>
                    <Markdown style={markdownStyles as any}>
                        {result}
                    </Markdown>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={onReset}>
                    <Text style={styles.buttonText}>Analyze Another</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    resultCard: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    footer: {
        padding: 20,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.surface,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const markdownStyles = {
    body: {
        color: Colors.text,
        fontSize: 16,
        lineHeight: 24,
    },
    heading1: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    heading2: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    strong: {
        color: Colors.secondary,
        fontWeight: 'bold',
    },
};
