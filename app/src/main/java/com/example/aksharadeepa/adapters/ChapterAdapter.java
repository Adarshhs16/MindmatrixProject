package com.example.aksharadeepa.adapters;

import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.aksharadeepa.R;
import com.example.aksharadeepa.models.Chapter;
import com.example.aksharadeepa.utils.SharedPrefsHelper;

import java.util.List;

public class ChapterAdapter extends RecyclerView.Adapter<ChapterAdapter.ViewHolder> {

    private List<Chapter> chapters;
    private SharedPrefsHelper prefs;
    private OnProgressChangeListener progressChangeListener;

    private static final int TYPE_HEADER = 0;
    private static final int TYPE_ITEM = 1;

    public interface OnProgressChangeListener {
        void onProgressChanged();
    }

    public ChapterAdapter(List<Chapter> chapters, SharedPrefsHelper prefs, OnProgressChangeListener listener) {
        this.chapters = chapters;
        this.prefs = prefs;
        this.progressChangeListener = listener;
    }

    public void updateData(List<Chapter> newChapters) {
        this.chapters = newChapters;
        notifyDataSetChanged();
    }

    @Override
    public int getItemViewType(int position) {
        return TYPE_ITEM;
    }

    @NonNull
    @Override
    public ChapterAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_chapter, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ChapterAdapter.ViewHolder holder, int position) {
        Chapter chapter = chapters.get(position);
        ViewHolder itemHolder = holder;
        
        // Header Logic: Show header if it's the first item or category changes
        boolean showHeader = false;
        if (position == 0) {
            showHeader = true;
        } else {
            Chapter prev = chapters.get(position - 1);
            if (!chapter.getCategory().equals(prev.getCategory())) {
                showHeader = true;
            }
        }

        TextView headerView = itemHolder.itemView.findViewById(R.id.headerText);
        if (headerView == null) {
            // If the header view isn't in item_chapter, we should have it there for this simple logic
            // or we'd need to use two view types properly. Let's ensure it's in the layout.
        } else {
            headerView.setVisibility(showHeader ? View.VISIBLE : View.GONE);
            headerView.setText(chapter.getCategory());
        }

        itemHolder.title.setText(chapter.getTitle());
        itemHolder.subject.setText(chapter.getSubject());

        itemHolder.btnRead.setOnClickListener(v -> {
            if (chapter.getPdfUrl() != null && !chapter.getPdfUrl().isEmpty()) {
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setDataAndType(Uri.parse(chapter.getPdfUrl()), "application/pdf");
                    intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                    
                    // Fallback to browser if no PDF viewer
                    Intent chooser = Intent.createChooser(intent, "Open Textbook");
                    itemHolder.itemView.getContext().startActivity(chooser);
                } catch (Exception e) {
                    // If everything fails, open in browser
                    try {
                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(chapter.getPdfUrl()));
                        itemHolder.itemView.getContext().startActivity(browserIntent);
                    } catch (Exception ex) {
                        Toast.makeText(itemHolder.itemView.getContext(), "Cannot open PDF", Toast.LENGTH_SHORT).show();
                    }
                }
            } else {
                Toast.makeText(itemHolder.itemView.getContext(), "PDF not available", Toast.LENGTH_SHORT).show();
            }
        });
        
        boolean isCompleted = prefs.getChapterStatus(chapter.getId());
        itemHolder.checkBox.setOnCheckedChangeListener(null);
        itemHolder.checkBox.setChecked(isCompleted);
        itemHolder.itemView.setAlpha(isCompleted ? 0.6f : 1.0f);

        itemHolder.checkBox.setOnCheckedChangeListener((buttonView, isChecked) -> {
            boolean wasCompleted = prefs.getChapterStatus(chapter.getId());
            if (isChecked && !wasCompleted) {
                prefs.incrementChaptersCompletedToday();
                itemHolder.itemView.animate()
                    .scaleX(1.02f)
                    .scaleY(1.02f)
                    .alpha(0.6f)
                    .setDuration(150)
                    .withEndAction(() -> {
                        itemHolder.itemView.animate().scaleX(1.0f).scaleY(1.0f).start();
                    }).start();
            } else if (!isChecked && wasCompleted) {
                prefs.decrementChaptersCompletedToday();
                itemHolder.itemView.animate().alpha(1.0f).setDuration(150).start();
            }
            prefs.setChapterStatus(chapter.getId(), isChecked);
            if (progressChangeListener != null) {
                progressChangeListener.onProgressChanged();
            }
        });
    }

    @Override
    public int getItemCount() {
        return chapters.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView title, subject;
        CheckBox checkBox;
        Button btnRead;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.chapterTitle);
            subject = itemView.findViewById(R.id.chapterSubject);
            checkBox = itemView.findViewById(R.id.chapterCheckBox);
            btnRead = itemView.findViewById(R.id.btnRead);
        }
    }

    public static class HeaderViewHolder extends RecyclerView.ViewHolder {
        TextView headerText;
        public HeaderViewHolder(@NonNull View itemView) {
            super(itemView);
            headerText = itemView.findViewById(R.id.headerText);
        }
    }
}
