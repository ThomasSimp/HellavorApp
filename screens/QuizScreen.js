import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean",
    },
];

export default function QuizScreen() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]); // Track user answers

    const handleNextQuestion = () => {
        // Record user's answer and whether it was correct
        const correct = selectedOption === questions[currentQuestion].correctAnswer;
        setUserAnswers([...userAnswers, { 
            question: questions[currentQuestion].question,
            selectedOption,
            correct,
            correctAnswer: questions[currentQuestion].correctAnswer 
        }]);

        // Update score if the answer was correct
        if (correct) {
            setScore(score + 1);
        }

        // Move to next question or finish quiz
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null); // Reset selected option for the next question
        } else {
            setIsQuizFinished(true); // End the quiz
        }
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };

    return (
        <View style={styles.container}>
            {isQuizFinished ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Quiz Finished! Your score: {score}/{questions.length}</Text>
                    <Text style={styles.reviewText}>Review your answers:</Text>
                    {userAnswers.map((answer, index) => (
                        <View key={index} style={styles.reviewContainer}>
                            <Text style={styles.reviewQuestionText}>{answer.question}</Text>
                            <Text style={[
                                styles.answerText,
                                answer.correct ? styles.correctAnswer : styles.incorrectAnswer
                            ]}>
                                Your answer: {answer.selectedOption}
                            </Text>
                            {!answer.correct && (
                                <Text style={styles.correctAnswerText}>
                                    Correct answer: {answer.correctAnswer}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.quizContainer}>
                    <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                    <View style={styles.optionsContainer}>
                        {questions[currentQuestion].options.map((option, index) => (
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
                        {currentQuestion < questions.length - 1 ? (
                            <Button title="Next" onPress={handleNextQuestion} disabled={!selectedOption} />
                        ) : (
                            <Button title="Submit" onPress={handleNextQuestion} disabled={!selectedOption} />
                        )}
                    </View>
                </View>
            )}
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
        alignItems: "flex-start", // Align text to the left
        width: '100%', // Full width for proper alignment
        padding: 16,
    },
    resultText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
        marginBottom: 20,
        textAlign: "center", // Center the main result text
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
