package com.example.aksharadeepa.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.aksharadeepa.R;
import com.example.aksharadeepa.utils.SharedPrefsHelper;

public class GoalFragment extends Fragment {

    private EditText goalInput;
    private TextView currentGoalText, streakText, goalProgressText;
    private View streakCard;
    private SharedPrefsHelper prefs;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_goal, container, false);

        goalInput = view.findViewById(R.id.goalInput);
        currentGoalText = view.findViewById(R.id.currentGoalText);
        streakCard = view.findViewById(R.id.streakCard);
        streakText = view.findViewById(R.id.streakText);
        goalProgressText = view.findViewById(R.id.goalProgressText);
        Button saveButton = view.findViewById(R.id.saveGoalButton);

        prefs = new SharedPrefsHelper(requireContext());
        displayGoal();

        saveButton.setOnClickListener(v -> {
            String input = goalInput.getText().toString();
            if (!input.isEmpty()) {
                try {
                    int g = Integer.parseInt(input);
                    prefs.setDailyGoal(g);
                    displayGoal();
                    Toast.makeText(getContext(), "Goal Updated!", Toast.LENGTH_SHORT).show();
                    goalInput.setText("");
                } catch (NumberFormatException e) {
                    Toast.makeText(getContext(), "Please enter a valid number", Toast.LENGTH_SHORT).show();
                }
            }
        });

        return view;
    }

    private void displayGoal() {
        int goal = prefs.getDailyGoal();
        currentGoalText.setText("Current Daily Goal: " + goal + " chapters");
        
        int progress = prefs.getChaptersCompletedToday();
        goalProgressText.setText("Today's Progress: " + progress + "/" + goal);
        
        int streak = prefs.getStreak();
        if (streak > 0) {
            streakCard.setVisibility(View.VISIBLE);
            streakText.setText("You're on a " + streak + "-day streak! 🚀");
        } else {
            streakCard.setVisibility(View.GONE);
        }
    }
}
