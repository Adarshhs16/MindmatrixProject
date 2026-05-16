package com.example.aksharadeepa.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.aksharadeepa.R;
import com.example.aksharadeepa.utils.SharedPrefsHelper;

public class StrengthFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_strength, container, false);

        SharedPrefsHelper prefs = new SharedPrefsHelper(requireContext());

        setupSubject(view, R.id.sciProgress, R.id.sciPercent, "Science", prefs);
        setupSubject(view, R.id.mathProgress, R.id.mathPercent, "Mathematics", prefs);
        setupSubject(view, R.id.socProgress, R.id.socPercent, "Social Science", prefs);

        return view;
    }

    private void setupSubject(View root, int pbId, int tvId, String subject, SharedPrefsHelper prefs) {
        com.google.android.material.progressindicator.LinearProgressIndicator pb = root.findViewById(pbId);
        TextView tv = root.findViewById(tvId);
        int score = prefs.getSubjectScore(subject);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            pb.setProgress(score, true);
        } else {
            pb.setProgress(score);
        }
        tv.setText(score + "%");
    }
}
