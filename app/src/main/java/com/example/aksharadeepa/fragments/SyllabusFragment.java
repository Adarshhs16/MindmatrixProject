package com.example.aksharadeepa.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.aksharadeepa.R;
import com.example.aksharadeepa.activities.SyllabusActivity;

public class SyllabusFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_syllabus, container, false);

        view.findViewById(R.id.cardScience).setOnClickListener(v -> startSyllabusActivity("Science"));
        view.findViewById(R.id.cardMath).setOnClickListener(v -> startSyllabusActivity("Mathematics"));
        view.findViewById(R.id.cardSocial).setOnClickListener(v -> startSyllabusActivity("Social Science"));

        return view;
    }

    private void startSyllabusActivity(String subject) {
        Intent intent = new Intent(getActivity(), SyllabusActivity.class);
        intent.putExtra("subject", subject);
        startActivity(intent);
    }
}
