import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";
import datasets from "../assets/data/datasets.json";

export default function QuizScreen() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedDataset, setSelectedDataset] = useState(null);

    // Function to select a random dataset
    const selectRandomDataset = () => {
        const randomIndex = Math.floor(Math.random() * datasets.length);
        setSelectedDataset(datasets[randomIndex]);
        setCurrentQuestion(0); // Reset to the first question
        setScore(0); // Reset score
        setUserAnswers([]); // Clear previous answers
        setIsQuizFinished(false); // Reset quiz finished state
    };

    useEffect(() => {
        selectRandomDataset(); // Select a random dataset on mount
    }, []);

    const handleNextQuestion = () => {
        if (!selectedDataset) return;

        const correct = selectedOption === selectedDataset[currentQuestion].correctAnswer;
        setUserAnswers([
            ...userAnswers,
            {
                question: selectedDataset[currentQuestion].question,
                selectedOption,
                correct,
                correctAnswer: selectedDataset[currentQuestion].correctAnswer,
            },
        ]);

        if (correct) {
            setScore(score + 1);
        }

        if (currentQuestion < selectedDataset.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            setIsQuizFinished(true);
        }
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };

    const handleRetryQuiz = () => {
        selectRandomDataset();
    };

    if (!selectedDataset) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {isQuizFinished ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>
                        Quiz Finished! Your score: {score}/{selectedDataset.length}
                    </Text>
                    <Text style={styles.reviewText}>Review your answers:</Text>
                    {userAnswers.map((answer, index) => (
                        <View key={index} style={styles.reviewContainer}>
                            <Text style={styles.reviewQuestionText}>{answer.question}</Text>
                            <Text
                                style={[
                                    styles.answerText,
                                    answer.correct ? styles.correctAnswer : styles.incorrectAnswer,
                                ]}
                            >
                                Your answer: {answer.selectedOption}
                            </Text>
                            {!answer.correct && (
                                <Text style={styles.correctAnswerText}>
                                    Correct answer: {answer.correctAnswer}
                                </Text>
                            )}
                        </View>
                    ))}
                    <Button title="Retry Quiz" onPress={handleRetryQuiz} />
                </View>
            ) : (
                <View style={styles.quizContainer}>
                    <Text style={styles.questionText}>
                        {selectedDataset[currentQuestion].question}
                    </Text>
                    <View style={styles.optionsContainer}>
                        {selectedDataset[currentQuestion].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedOption === option && styles.selectedOptionButton,
                                ]}
                                onPress={() => handleOptionPress(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        {currentQuestion < selectedDataset.length - 1 ? (
                            <Button
                                title="Next"
                                onPress={handleNextQuestion}
                                disabled={!selectedOption}
                            />
                        ) : (
                            <Button
                                title="Submit"
                                onPress={handleNextQuestion}
                                disabled={!selectedOption}
                            />
                        )}
                    </View>
                </View>
            )}

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    quizContainer: {
        width: "100%",
    },
    questionText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    selectedOptionButton: {
        backgroundColor: "#c0e0ff",
    },
    optionText: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
    },
    resultContainer: {
        alignItems: "flex-start",
        width: '100%',
        padding: 16,
    },
    resultText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
        marginBottom: 20,
        textAlign: "center",
        width: "100%",
    },
    reviewText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    reviewContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        width: '100%',
    },
    reviewQuestionText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    answerText: {
        fontSize: 16,
    },
    correctAnswer: {
        color: "green",
    },
    incorrectAnswer: {
        color: "red",
    },
    correctAnswerText: {
        fontSize: 14,
        color: "blue",
    },
});
