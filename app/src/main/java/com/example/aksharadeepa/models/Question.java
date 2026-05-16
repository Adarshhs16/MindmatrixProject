package com.example.aksharadeepa.models;

public class Question {
    private String id;
    private String text;
    private String[] options;
    private int correctAnswerIndex;
    private String explanation;
    private String difficulty;

    public Question(String id, String text, String[] options, int correctAnswerIndex, String explanation, String difficulty) {
        this.id = id;
        this.text = text;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
        this.explanation = explanation;
        this.difficulty = difficulty;
    }

    public String getId() { return id; }
    public String getText() { return text; }
    public String[] getOptions() { return options; }
    public int getCorrectAnswerIndex() { return correctAnswerIndex; }
    public String getExplanation() { return explanation; }
    public String getDifficulty() { return difficulty; }
}
