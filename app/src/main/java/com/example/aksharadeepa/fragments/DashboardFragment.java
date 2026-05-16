package com.example.aksharadeepa.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import com.example.aksharadeepa.R;
import com.example.aksharadeepa.models.Chapter;
import com.example.aksharadeepa.utils.DummyDataLoader;
import com.example.aksharadeepa.utils.SharedPrefsHelper;

import java.util.List;

public class DashboardFragment extends Fragment {

    private com.google.android.material.progressindicator.LinearProgressIndicator overallProgress;
    private TextView progressText, dailyGoalText, streakText;
    private SharedPrefsHelper prefs;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);

        overallProgress = view.findViewById(R.id.overallProgressBar);
        progressText = view.findViewById(R.id.overallProgressText);
        dailyGoalText = view.findViewById(R.id.dailyGoalText);
        streakText = view.findViewById(R.id.streakText);

        prefs = new SharedPrefsHelper(requireContext());

        view.findViewById(R.id.cardQuiz).setOnClickListener(v -> 
            Navigation.findNavController(v).navigate(R.id.navigation_quiz));
        
        view.findViewById(R.id.cardResources).setOnClickListener(v -> 
            Navigation.findNavController(v).navigate(R.id.navigation_syllabus));

        view.findViewById(R.id.editGoalButton).setOnClickListener(v ->
                Navigation.findNavController(v).navigate(R.id.navigation_goal));

        updateStats();

        return view;
    }

    private void updateStats() {
        List<Chapter> chapters = DummyDataLoader.getSyllabus();
        int completed = 0;
        for (Chapter c : chapters) {
            if (prefs.getChapterStatus(c.getId())) {
                completed++;
            }
        }

        int percent = (int) (((float) completed / chapters.size()) * 100);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            overallProgress.setProgress(percent, true);
        } else {
            overallProgress.setProgress(percent);
        }
        progressText.setText(percent + "%");

        int goal = prefs.getDailyGoal();
        int currentProgress = prefs.getChaptersCompletedToday();
        dailyGoalText.setText("Daily Goal: " + currentProgress + "/" + goal + " chapters");
        
        int streak = prefs.getStreak();
        streakText.setText("Current Streak: " + streak + " days 🔥");
    }
}
