package com.example.aksharadeepa.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import android.widget.LinearLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.aksharadeepa.R;
import com.example.aksharadeepa.models.Question;
import com.example.aksharadeepa.utils.DummyDataLoader;
import com.example.aksharadeepa.utils.SharedPrefsHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import com.google.android.material.button.MaterialButtonToggleGroup;

public class QuizFragment extends Fragment {

    private String currentSubject = "Science";
    private List<Question> questions;
    private int currentIndex = 0;
    private int score = 0;

    private TextView questionText, scoreText, finalScoreText;
    private RadioGroup optionsGroup;
    private MaterialButtonToggleGroup subjectGroup, difficultyGroup;
    private com.google.android.material.progressindicator.LinearProgressIndicator quizProgressIndicator;
    private Button nextButton, restartButton, startQuizButton;
    private LinearLayout selectionContainer, quizContainer, resultContainer;
    private RecyclerView resultRecyclerView;
    private SharedPrefsHelper prefs;
    private List<Integer> userAnswers = new ArrayList<>();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_quiz, container, false);

        selectionContainer = view.findViewById(R.id.selectionContainer);
        quizContainer = view.findViewById(R.id.quizContainer);
        resultContainer = view.findViewById(R.id.resultContainer);
        resultRecyclerView = view.findViewById(R.id.resultRecyclerView);
        resultRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        questionText = view.findViewById(R.id.questionText);
        scoreText = view.findViewById(R.id.scoreText);
        finalScoreText = view.findViewById(R.id.finalScoreText);
        optionsGroup = view.findViewById(R.id.optionsGroup);
        quizProgressIndicator = view.findViewById(R.id.quizProgressIndicator);
        subjectGroup = view.findViewById(R.id.subjectGroup_toggle);
        difficultyGroup = view.findViewById(R.id.difficultyGroup_toggle);

        nextButton = view.findViewById(R.id.nextButton);
        restartButton = view.findViewById(R.id.restartButton);
        startQuizButton = view.findViewById(R.id.startQuizButton);

        prefs = new SharedPrefsHelper(requireContext());

        startQuizButton.setOnClickListener(v -> {
            String subject = "Science";
            int subId = subjectGroup.getCheckedButtonId();
            if (subId == R.id.btnMath) subject = "Mathematics";
            else if (subId == R.id.btnSocial) subject = "Social Science";

            String difficulty = "Any";
            int diffId = difficultyGroup.getCheckedButtonId();
            if (diffId == R.id.btnEasy) difficulty = "Easy";
            else if (diffId == R.id.btnMedium) difficulty = "Medium";
            else if (diffId == R.id.btnHard) difficulty = "Hard";

            selectionContainer.setVisibility(View.GONE);
            quizContainer.setVisibility(View.VISIBLE);
            loadQuiz(subject, difficulty);
        });

        nextButton.setOnClickListener(v -> {
            int selectedId = optionsGroup.getCheckedRadioButtonId();
            if (selectedId == -1) {
                Toast.makeText(getContext(), "Please select an answer", Toast.LENGTH_SHORT).show();
                return;
            }

            View radioButton = optionsGroup.findViewById(selectedId);
            int idx = optionsGroup.indexOfChild(radioButton);
            userAnswers.add(idx);
            
            if (idx == questions.get(currentIndex).getCorrectAnswerIndex()) {
                score++;
            }

            currentIndex++;
            if (currentIndex < questions.size()) {
                showQuestion();
            } else {
                finishQuiz();
            }
        });

        restartButton.setOnClickListener(v -> {
            selectionContainer.setVisibility(View.VISIBLE);
            resultContainer.setVisibility(View.GONE);
        });

        return view;
    }

    private void loadQuiz(String subject, String difficulty) {
        currentSubject = subject;
        List<Question> allSource = DummyDataLoader.loadQuestionsFromJson(requireContext(), subject);
        
        // Filter by difficulty
        List<Question> allPool = new ArrayList<>();
        if (difficulty.equals("Any")) {
            allPool.addAll(allSource);
        } else {
            for (Question q : allSource) {
                if (q.getDifficulty().equalsIgnoreCase(difficulty)) {
                    allPool.add(q);
                }
            }
        }
        
        // Fallback if pool is empty
        if (allPool.isEmpty()) allPool = allSource;

        Set<String> usedIds = prefs.getUsedQuestionIds(subject);

        List<Question> available = new ArrayList<>();
        List<Question> alreadyUsed = new ArrayList<>();
        
        for (Question q : allPool) {
            if (!usedIds.contains(q.getId())) {
                available.add(q);
            } else {
                alreadyUsed.add(q);
            }
        }

        Collections.shuffle(available);
        Collections.shuffle(alreadyUsed);

        List<Question> sessionQuestions = new ArrayList<>();
        
        // Target 25 questions
        int targetSize = Math.min(allPool.size(), 25);

        // Take from available first
        int takeFromAvailable = Math.min(available.size(), targetSize);
        for (int i = 0; i < takeFromAvailable; i++) {
            sessionQuestions.add(available.get(i));
        }

        // If we still need more, take from alreadyUsed
        if (sessionQuestions.size() < targetSize) {
            // Reset used questions in prefs if we're forced to reuse
            prefs.clearUsedQuestions(subject);
            int needed = targetSize - sessionQuestions.size();
            for (int i = 0; i < Math.min(needed, alreadyUsed.size()); i++) {
                sessionQuestions.add(alreadyUsed.get(i));
            }
        }

        questions = sessionQuestions;
        
        // Shuffle the final selection so repeats are mixed with new ones
        Collections.shuffle(questions);
        
        // Mark these as used for future sessions
        for (Question q : questions) {
            prefs.markQuestionAsUsed(subject, q.getId());
        }

        currentIndex = 0;
        score = 0;
        userAnswers.clear();
        showQuestion();
    }

    private void showQuestion() {
        Question q = questions.get(currentIndex);
        questionText.setText(q.getText());
        optionsGroup.clearCheck();
        
        for (int i = 0; i < optionsGroup.getChildCount(); i++) {
            ((RadioButton) optionsGroup.getChildAt(i)).setText(q.getOptions()[i]);
        }
        
        scoreText.setText("Question " + (currentIndex + 1) + "/" + questions.size() + " | Score: " + score);
        if (quizProgressIndicator != null) {
            quizProgressIndicator.setMax(questions.size());
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                quizProgressIndicator.setProgress(currentIndex + 1, true);
            } else {
                quizProgressIndicator.setProgress(currentIndex + 1);
            }
        }
    }

    private void finishQuiz() {
        prefs.setSubjectScore(currentSubject, (int)((float)score/questions.size() * 100));
        
        quizContainer.setVisibility(View.GONE);
        resultContainer.setVisibility(View.VISIBLE);
        
        finalScoreText.setText("Result: " + score + " / " + questions.size());
        
        com.example.aksharadeepa.adapters.QuizResultAdapter adapter = new com.example.aksharadeepa.adapters.QuizResultAdapter(questions, userAnswers);
        resultRecyclerView.setAdapter(adapter);
    }
}
