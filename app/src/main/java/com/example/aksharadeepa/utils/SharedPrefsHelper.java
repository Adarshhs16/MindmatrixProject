package com.example.aksharadeepa.utils;

import android.content.Context;
import android.content.SharedPreferences;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class SharedPrefsHelper {
    private static final String PREF_NAME = "AksharaDeepaPrefs";
    private SharedPreferences prefs;
    private SharedPreferences.Editor editor;

    public SharedPrefsHelper(Context context) {
        prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = prefs.edit();
    }

    public void setChapterStatus(String chapterId, boolean completed) {
        editor.putBoolean("chapter_" + chapterId, completed);
        editor.apply();
    }

    public boolean getChapterStatus(String chapterId) {
        return prefs.getBoolean("chapter_" + chapterId, false);
    }

    public void setSubjectScore(String subject, int score) {
        editor.putInt("score_" + subject, score);
        editor.apply();
    }

    public int getSubjectScore(String subject) {
        return prefs.getInt("score_" + subject, 0);
    }

    public void setDailyGoal(int goal) {
        editor.putInt("daily_goal", goal);
        editor.apply();
        
        // If changing goal makes today's progress eligible for a streak
        if (getChaptersCompletedToday() >= goal) {
            checkAndIncrementStreak();
        }
    }

    public int getDailyGoal() {
        return prefs.getInt("daily_goal", 1);
    }

    public void setGoalProgress(int progress) {
        editor.putInt("goal_progress", progress);
        editor.apply();
    }

    public int getGoalProgress() {
        return prefs.getInt("goal_progress", 0);
    }

    public void setStreak(int streak) {
        editor.putInt("current_streak", streak);
        editor.apply();
    }

    public int getStreak() {
        int streak = prefs.getInt("current_streak", 0);
        String lastDate = getLastGoalDate();
        if (lastDate.isEmpty()) return 0;
        
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
            Date last = sdf.parse(lastDate);
            String todayStr = sdf.format(new Date());
            Date today = sdf.parse(todayStr);
            
            long diff = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
            if (diff > 1) {
                // Streak broken if more than 1 day since last completion
                streak = 0;
                setStreak(0);
            }
        } catch (Exception e) {
            // Silently fail and return saved streak
        }
        return streak;
    }

    public void setLastGoalDate(String date) {
        editor.putString("last_goal_date", date);
        editor.apply();
    }

    public String getLastGoalDate() {
        return prefs.getString("last_goal_date", "");
    }

    public int getChaptersCompletedToday() {
        String today = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault()).format(new java.util.Date());
        String savedDate = prefs.getString("completion_date", "");
        if (today.equals(savedDate)) {
            return prefs.getInt("completed_today_count", 0);
        }
        return 0;
    }

    public void incrementChaptersCompletedToday() {
        String today = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault()).format(new java.util.Date());
        int count = getChaptersCompletedToday() + 1;
        
        editor.putString("completion_date", today);
        editor.putInt("completed_today_count", count);
        editor.apply();

        // Check if goal is met
        if (count >= getDailyGoal()) {
            checkAndIncrementStreak();
        }
    }

    public void decrementChaptersCompletedToday() {
        String today = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault()).format(new java.util.Date());
        int count = Math.max(0, getChaptersCompletedToday() - 1);
        
        editor.putString("completion_date", today);
        editor.putInt("completed_today_count", count);
        editor.apply();
    }

    public void markQuestionAsUsed(String subject, String questionId) {
        java.util.Set<String> used = new java.util.HashSet<>(prefs.getStringSet("used_questions_" + subject, new java.util.HashSet<>()));
        used.add(questionId);
        editor.putStringSet("used_questions_" + subject, used);
        editor.apply();
    }

    public java.util.Set<String> getUsedQuestionIds(String subject) {
        return prefs.getStringSet("used_questions_" + subject, new java.util.HashSet<>());
    }

    public void clearUsedQuestions(String subject) {
        editor.remove("used_questions_" + subject);
        editor.apply();
    }

    public void checkAndIncrementStreak() {
        String todayStr = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(new Date());
        String lastDate = getLastGoalDate();

        if (todayStr.equals(lastDate)) {
            return; // Already completed today, don't double count
        }

        int currentStreak = getStreak(); // This will return 0 if the streak was broken
        
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
            if (lastDate.isEmpty()) {
                setStreak(1);
            } else {
                Date last = sdf.parse(lastDate);
                Date now = sdf.parse(todayStr);
                long diff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
                
                if (diff == 1) {
                    // Incremental day
                    setStreak(currentStreak + 1);
                } else {
                    // Streak was either broken (diff > 1) or initial
                    setStreak(1);
                }
            }
            setLastGoalDate(todayStr);
        } catch (Exception e) {
            setStreak(1);
            setLastGoalDate(todayStr);
        }
    }
}
