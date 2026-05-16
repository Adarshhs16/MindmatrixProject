package com.example.aksharadeepa.adapters;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.aksharadeepa.R;
import com.example.aksharadeepa.models.Question;

import java.util.List;

public class QuizResultAdapter extends RecyclerView.Adapter<QuizResultAdapter.ViewHolder> {

    private List<Question> questions;
    private List<Integer> userAnswers;

    public QuizResultAdapter(List<Question> questions, List<Integer> userAnswers) {
        this.questions = questions;
        this.userAnswers = userAnswers;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_quiz_result, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Question q = questions.get(position);
        int userAnsIdx = userAnswers.get(position);
        boolean isCorrect = userAnsIdx == q.getCorrectAnswerIndex();

        holder.question.setText(q.getText());
        holder.userAnswer.setText("Your answer: " + q.getOptions()[userAnsIdx]);
        holder.explanation.setText("Note: " + q.getExplanation());

        if (isCorrect) {
            holder.background.setBackgroundColor(Color.parseColor("#E8F5E9")); // Light green
            holder.correctAnswer.setVisibility(View.GONE);
            holder.userAnswer.setTextColor(Color.parseColor("#2E7D32"));
        } else {
            holder.background.setBackgroundColor(Color.parseColor("#FFEBEE")); // Light red
            holder.correctAnswer.setVisibility(View.VISIBLE);
            holder.correctAnswer.setText("Correct answer: " + q.getOptions()[q.getCorrectAnswerIndex()]);
            holder.userAnswer.setTextColor(Color.parseColor("#C62828"));
        }
    }

    @Override
    public int getItemCount() {
        return questions.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView question, userAnswer, correctAnswer, explanation;
        LinearLayout background;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            question = itemView.findViewById(R.id.resultQuestionText);
            userAnswer = itemView.findViewById(R.id.userAnswerText);
            correctAnswer = itemView.findViewById(R.id.correctAnswerText);
            explanation = itemView.findViewById(R.id.explanationText);
            background = itemView.findViewById(R.id.resultItemBackground);
        }
    }
}
