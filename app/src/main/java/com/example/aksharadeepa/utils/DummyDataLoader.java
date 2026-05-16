package com.example.aksharadeepa.utils;

import android.content.Context;
import com.example.aksharadeepa.models.Chapter;
import com.example.aksharadeepa.models.Question;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class DummyDataLoader {

    public static List<Chapter> getSyllabus() {
        List<Chapter> chapters = new ArrayList<>();
        // SCIENCE (jesc1)
        String sciBase = "https://ncert.nic.in/textbook/pdf/jesc1";
        // Chemistry
        chapters.add(new Chapter("sci_01", "Chemical Reactions & Equations", "Science", "🧪 Chemistry", false, sciBase + "01.pdf"));
        chapters.add(new Chapter("sci_02", "Acids, Bases & Salts", "Science", "🧪 Chemistry", false, sciBase + "02.pdf"));
        chapters.add(new Chapter("sci_03", "Metals & Non-Metals", "Science", "🧪 Chemistry", false, sciBase + "03.pdf"));
        chapters.add(new Chapter("sci_04", "Carbon & Its Compounds", "Science", "🧪 Chemistry", false, sciBase + "04.pdf"));
        
        // Biology
        chapters.add(new Chapter("sci_05", "Life Processes", "Science", "🌱 Biology", false, sciBase + "05.pdf"));
        chapters.add(new Chapter("sci_06", "Control & Coordination", "Science", "🌱 Biology", false, sciBase + "06.pdf"));
        chapters.add(new Chapter("sci_07", "How do Organisms Reproduce", "Science", "🌱 Biology", false, sciBase + "07.pdf"));
        chapters.add(new Chapter("sci_08", "Heredity & Evolution", "Science", "🌱 Biology", false, sciBase + "08.pdf"));
        
        // Physics
        chapters.add(new Chapter("sci_09", "Light – Reflection & Refraction", "Science", "🔬 Physics", false, sciBase + "09.pdf"));
        chapters.add(new Chapter("sci_10", "Human Eye & Colourful World", "Science", "🔬 Physics", false, sciBase + "10.pdf"));
        chapters.add(new Chapter("sci_11", "Electricity", "Science", "🔬 Physics", false, sciBase + "11.pdf"));
        chapters.add(new Chapter("sci_12", "Magnetic Effects of Electric Current", "Science", "🔬 Physics", false, sciBase + "12.pdf"));
        
        // Environmental
        chapters.add(new Chapter("sci_13", "Our Environment", "Science", "🌍 Environment", false, sciBase + "13.pdf"));

        // MATHEMATICS (jemh1)
        String mathBase = "https://ncert.nic.in/textbook/pdf/jemh1";
        chapters.add(new Chapter("math_01", "Real Numbers", "Mathematics", "📐 Mathematics", false, mathBase + "01.pdf"));
        chapters.add(new Chapter("math_02", "Polynomials", "Mathematics", "📐 Mathematics", false, mathBase + "02.pdf"));
        chapters.add(new Chapter("math_03", "Pair of Linear Equations in Two Variables", "Mathematics", "📐 Mathematics", false, mathBase + "03.pdf"));
        chapters.add(new Chapter("math_04", "Quadratic Equations", "Mathematics", "📐 Mathematics", false, mathBase + "04.pdf"));
        chapters.add(new Chapter("math_05", "Arithmetic Progressions", "Mathematics", "📐 Mathematics", false, mathBase + "05.pdf"));
        chapters.add(new Chapter("math_06", "Triangles", "Mathematics", "📐 Mathematics", false, mathBase + "06.pdf"));
        chapters.add(new Chapter("math_07", "Coordinate Geometry", "Mathematics", "📐 Mathematics", false, mathBase + "07.pdf"));
        chapters.add(new Chapter("math_08", "Trigonometry (Introduction + Identities)", "Mathematics", "📐 Mathematics", false, mathBase + "08.pdf"));
        chapters.add(new Chapter("math_09", "Heights & Distances", "Mathematics", "📐 Mathematics", false, mathBase + "09.pdf"));
        chapters.add(new Chapter("math_10", "Circles", "Mathematics", "📐 Mathematics", false, mathBase + "10.pdf"));
        chapters.add(new Chapter("math_11", "Areas Related to Circles", "Mathematics", "📐 Mathematics", false, mathBase + "11.pdf"));
        chapters.add(new Chapter("math_12", "Surface Areas & Volumes", "Mathematics", "📐 Mathematics", false, mathBase + "12.pdf"));
        chapters.add(new Chapter("math_13", "Statistics", "Mathematics", "📐 Mathematics", false, mathBase + "13.pdf"));
        chapters.add(new Chapter("math_14", "Probability", "Mathematics", "📐 Mathematics", false, mathBase + "14.pdf"));

        // SOCIAL SCIENCE
        // History (jess2)
        String histBase = "https://ncert.nic.in/textbook/pdf/jess2";
        chapters.add(new Chapter("soc_01", "The Rise of Nationalism in Europe", "Social Science", "🏛 History", false, histBase + "01.pdf"));
        chapters.add(new Chapter("soc_02", "Nationalism in India", "Social Science", "🏛 History", false, histBase + "02.pdf"));
        chapters.add(new Chapter("soc_03", "The Making of a Global World", "Social Science", "🏛 History", false, histBase + "03.pdf"));
        chapters.add(new Chapter("soc_04", "The Age of Industrialisation", "Social Science", "🏛 History", false, histBase + "04.pdf"));
        chapters.add(new Chapter("soc_05", "Print Culture and the Modern World", "Social Science", "🏛 History", false, histBase + "05.pdf"));
        
        // Geography (jess1)
        String geogBase = "https://ncert.nic.in/textbook/pdf/jess1";
        chapters.add(new Chapter("soc_06", "Resources and Development", "Social Science", "🌍 Geography", false, geogBase + "01.pdf"));
        chapters.add(new Chapter("soc_07", "Forest and Wildlife Resources", "Social Science", "🌍 Geography", false, geogBase + "02.pdf"));
        chapters.add(new Chapter("soc_08", "Water Resources", "Social Science", "🌍 Geography", false, geogBase + "03.pdf"));
        chapters.add(new Chapter("soc_09", "Agriculture", "Social Science", "🌍 Geography", false, geogBase + "04.pdf"));
        chapters.add(new Chapter("soc_10", "Minerals and Energy Resources", "Social Science", "🌍 Geography", false, geogBase + "05.pdf"));
        chapters.add(new Chapter("soc_11", "Manufacturing Industries", "Social Science", "🌍 Geography", false, geogBase + "06.pdf"));
        chapters.add(new Chapter("soc_12", "Lifelines of National Economy", "Social Science", "🌍 Geography", false, geogBase + "07.pdf"));
        
        // Civics (jess3)
        String civBase = "https://ncert.nic.in/textbook/pdf/jess3";
        chapters.add(new Chapter("soc_13", "Power Sharing", "Social Science", "⚖ Civics", false, civBase + "01.pdf"));
        chapters.add(new Chapter("soc_14", "Federalism", "Social Science", "⚖ Civics", false, civBase + "02.pdf"));
        chapters.add(new Chapter("soc_15", "Gender, Religion and Caste", "Social Science", "⚖ Civics", false, civBase + "03.pdf"));
        chapters.add(new Chapter("soc_16", "Political Parties", "Social Science", "⚖ Civics", false, civBase + "04.pdf"));
        chapters.add(new Chapter("soc_17", "Outcomes of Democracy", "Social Science", "⚖ Civics", false, civBase + "05.pdf"));
        
        // Economics (jess4)
        String econBase = "https://ncert.nic.in/textbook/pdf/jess4";
        chapters.add(new Chapter("soc_18", "Development", "Social Science", "💰 Economics", false, econBase + "01.pdf"));
        chapters.add(new Chapter("soc_19", "Sectors of Indian Economy", "Social Science", "💰 Economics", false, econBase + "02.pdf"));
        chapters.add(new Chapter("soc_20", "Money and Credit", "Social Science", "💰 Economics", false, econBase + "03.pdf"));
        chapters.add(new Chapter("soc_21", "Globalisation and Indian Economy", "Social Science", "💰 Economics", false, econBase + "04.pdf"));
        chapters.add(new Chapter("soc_22", "Consumer Rights", "Social Science", "💰 Economics", false, econBase + "05.pdf"));

        return chapters;
    }

    public static List<Question> loadQuestionsFromJson(Context context, String subject) {
        List<Question> questions = new ArrayList<>();
        String fileName = "";
        if (subject.equals("Science")) fileName = "science_questions";
        else if (subject.equals("Mathematics")) fileName = "mathematics_questions";
        else fileName = "social_studies_questions";

        try {
            int resId = context.getResources().getIdentifier(fileName, "raw", context.getPackageName());
            if (resId != 0) {
                InputStream is = context.getResources().openRawResource(resId);
                int size = is.available();
                byte[] buffer = new byte[size];
                is.read(buffer);
                is.close();
                String json = new String(buffer, StandardCharsets.UTF_8);
                JSONArray array = new JSONArray(json);

                for (int i = 0; i < array.length(); i++) {
                    JSONObject obj = array.getJSONObject(i);
                    JSONArray optsArray = obj.getJSONArray("options");
                    String[] options = new String[optsArray.length()];
                    for (int j = 0; j < optsArray.length(); j++) {
                        options[j] = optsArray.getString(j);
                    }
                    questions.add(new Question(
                            obj.getString("id"),
                            obj.getString("text"),
                            options,
                            obj.getInt("correctIndex"),
                            obj.getString("explanation"),
                            obj.optString("difficulty", "Medium")
                    ));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (questions.isEmpty()) {
            questions = getBaseDummyQuestions(subject);
        }
        
        return questions;
    }

    private static List<Question> getBaseDummyQuestions(String subject) {
        List<Question> questions = new ArrayList<>();
        if (subject.equals("Science")) {
            questions.add(new Question("sci_d1", "What is the chemical formula of Marble?", new String[]{"CaCO3", "CaO", "Ca(OH)2", "CaSO4"}, 0, "Marble is CaCO3.", "Easy"));
            questions.add(new Question("sci_d2", "Which gas is released when sodium reacts with water?", new String[]{"Oxygen", "Hydrogen", "Nitrogen", "Carbon dioxide"}, 1, "Hydrogen.", "Easy"));
        } else if (subject.equals("Mathematics")) {
            questions.add(new Question("mat_d1", "The common difference of the AP: 3, 1, -1, -3... is?", new String[]{"2", "-2", "3", "1"}, 1, "-2.", "Easy"));
        } else {
            questions.add(new Question("soc_d1", "Who discovered the sea route to India?", new String[]{"Columbus", "Vasco da Gama", "Magellan", "Drake"}, 1, "Vasco da Gama.", "Easy"));
        }
        return questions;
    }

    public static List<Question> getQuestions(String subject) {
        return getBaseDummyQuestions(subject);
    }
}
