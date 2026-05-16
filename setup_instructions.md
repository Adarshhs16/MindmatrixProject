# Akshara-Deepa Tutor Setup Instructions

This project is a complete Android Studio project built using Java and XML.

## Project Structure
- **/app/src/main/java**: Contains all Java source code (Activities, Fragments, Adapters, Models, Utilities).
- **/app/src/main/res**: Contains all XML resources (Layouts, Menus, Navigation, Styles).
- **/app/build.gradle**: App-level build configuration.
- **/gradle/build.gradle**: Project-level build configuration.

## How to Import into Android Studio
1. Open **Android Studio**.
2. Select **File > Open**.
3. Navigate to the folder containing this project and select it.
4. Wait for Gradle sync to complete.
5. Connect an Android device or start an emulator.
6. Click **Run (Shift+F10)**.

## Key Features Implemented
1. **Home Dashboard**: Shows summary of syllabus progress and daily goals.
2. **Syllabus Tracker**: RecyclerView list of Science, Math, and Social chapters with checkboxes to mark completion, saved via SharedPreferences.
3. **Quiz System**: Subject-wise quizzes with automatic scoring and persistence.
4. **Strength Map**: Visual progress bars showing performance in each subject based on quiz results.
5. **Daily Goal**: System to set and track daily study targets.

## Note on Quiz Data
The `DummyDataLoader.java` contains a sample set of questions. For a full production app, you can extend the `getQuestions()` method or move the questions to a local SQLite database or JSON file for easier management of the 3000+ questions required.
