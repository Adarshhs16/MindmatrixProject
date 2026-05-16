package com.example.aksharadeepa.activities;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.aksharadeepa.R;
import com.example.aksharadeepa.adapters.ChapterAdapter;
import com.example.aksharadeepa.models.Chapter;
import com.example.aksharadeepa.utils.DummyDataLoader;
import com.example.aksharadeepa.utils.SharedPrefsHelper;

import java.util.ArrayList;
import java.util.List;

public class SyllabusActivity extends AppCompatActivity {

    private String currentSubject;
    private List<Chapter> subjectChapters;
    private ChapterAdapter adapter;
    private SharedPrefsHelper prefs;
    private com.google.android.material.progressindicator.LinearProgressIndicator progressBar;
    private TextView progressLabel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_syllabus);

        currentSubject = getIntent().getStringExtra("subject");
        if (currentSubject == null) currentSubject = "Science";

        prefs = new SharedPrefsHelper(this);
        
        TextView title = findViewById(R.id.subjectTitle);
        title.setText(currentSubject);

        ImageButton btnBack = findViewById(R.id.btnBack);
        btnBack.setOnClickListener(v -> finish());

        progressBar = findViewById(R.id.subjectProgressBar);
        progressLabel = findViewById(R.id.progressLabel);

        RecyclerView recyclerView = findViewById(R.id.chapterRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        loadChapters();
        updateProgress();

        adapter = new ChapterAdapter(subjectChapters, prefs, this::updateProgress);
        recyclerView.setAdapter(adapter);
    }

    private void loadChapters() {
        List<Chapter> all = DummyDataLoader.getSyllabus();
        subjectChapters = new ArrayList<>();
        for (Chapter c : all) {
            if (c.getSubject().equalsIgnoreCase(currentSubject)) {
                subjectChapters.add(c);
            }
        }
    }

    private void updateProgress() {
        int total = subjectChapters.size();
        int completed = 0;
        for (Chapter c : subjectChapters) {
            if (prefs.getChapterStatus(c.getId())) {
                completed++;
            }
        }

        int percent = (total > 0) ? (completed * 100 / total) : 0;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            progressBar.setProgress(percent, true);
        } else {
            progressBar.setProgress(percent);
        }
        progressLabel.setText("Overall Progress: " + percent + "% (" + completed + "/" + total + " Chapters)");
    }
}
