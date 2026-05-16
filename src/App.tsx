/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, BookOpen, GraduationCap, BarChart2, Target, CheckCircle2, ChevronRight, Play, Bookmark, Trash2, User, Zap, Trophy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock data for the web preview
const SYLLABUS = [
  // Science - Physics
  { id: 'sci_01', title: 'Light – Reflection & Refraction', subject: 'Science', category: '🔬 Physics', completed: false },
  { id: 'sci_02', title: 'Human Eye & Colourful World', subject: 'Science', category: '🔬 Physics', completed: false },
  { id: 'sci_03', title: 'Electricity', subject: 'Science', category: '🔬 Physics', completed: false },
  { id: 'sci_04', title: 'Magnetic Effects of Electric Current', subject: 'Science', category: '🔬 Physics', completed: false },
  // Science - Chemistry
  { id: 'sci_c1', title: 'Chemical Reactions & Equations', subject: 'Science', category: '🧪 Chemistry', completed: false },
  { id: 'sci_c2', title: 'Acids, Bases & Salts', subject: 'Science', category: '🧪 Chemistry', completed: false },
  { id: 'sci_c3', title: 'Metals & Non-Metals', subject: 'Science', category: '🧪 Chemistry', completed: false },
  { id: 'sci_c4', title: 'Carbon & Its Compounds', subject: 'Science', category: '🧪 Chemistry', completed: false },
  // Science - Biology
  { id: 'sci_05', title: 'Life Processes', subject: 'Science', category: '🌱 Biology', completed: true },
  { id: 'sci_06', title: 'Control & Coordination', subject: 'Science', category: '🌱 Biology', completed: false },
  { id: 'sci_07', title: 'How do Organisms Reproduce', subject: 'Science', category: '🌱 Biology', completed: false },
  { id: 'sci_08', title: 'Heredity & Evolution', subject: 'Science', category: '🌱 Biology', completed: false },
  { id: 'sci_09', title: 'Our Environment', subject: 'Science', category: '🌱 Biology', completed: false },
  { id: 'sci_10', title: 'Management of Natural Resources', subject: 'Science', category: '🌱 Biology', completed: false },

  // Mathematics
  { id: 'math_01', title: 'Real Numbers', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_02', title: 'Polynomials', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_03', title: 'Pair of Linear Equations in Two Variables', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_04', title: 'Quadratic Equations', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_05', title: 'Arithmetic Progressions', subject: 'Mathematics', category: '📐 Mathematics', completed: true },
  { id: 'math_06', title: 'Triangles', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_07', title: 'Coordinate Geometry', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_08', title: 'Trigonometry (Introduction + Identities)', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_09', title: 'Heights & Distances', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_10', title: 'Circles', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_11', title: 'Constructions', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_12', title: 'Areas Related to Circles', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_13', title: 'Surface Areas & Volumes', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_14', title: 'Statistics', subject: 'Mathematics', category: '📐 Mathematics', completed: false },
  { id: 'math_15', title: 'Probability', subject: 'Mathematics', category: '📐 Mathematics', completed: false },

  // Social Science - History
  { id: 'soc_01', title: 'Rise of Nationalism in Europe', subject: 'Social Science', category: '🏛 History', completed: false },
  { id: 'soc_02', title: 'Nationalism in India', subject: 'Social Science', category: '🏛 History', completed: false },
  { id: 'soc_03', title: 'The Making of a Global World', subject: 'Social Science', category: '🏛 History', completed: false },
  { id: 'soc_04', title: 'The Age of Industrialisation', subject: 'Social Science', category: '🏛 History', completed: false },
  { id: 'soc_05', title: 'Print Culture and the Modern World', subject: 'Social Science', category: '🏛 History', completed: false },
  // Geography
  { id: 'soc_06', title: 'Resources and Development', subject: 'Social Science', category: '🌍 Geography', completed: true },
  { id: 'soc_07', title: 'Forest and Wildlife Resources', subject: 'Social Science', category: '🌍 Geography', completed: false },
  { id: 'soc_08', title: 'Water Resources', subject: 'Social Science', category: '🌍 Geography', completed: false },
  { id: 'soc_09', title: 'Agriculture', subject: 'Social Science', category: '🌍 Geography', completed: false },
  { id: 'soc_10', title: 'Minerals and Energy Resources', subject: 'Social Science', category: '🌍 Geography', completed: false },
  { id: 'soc_11', title: 'Manufacturing Industries', subject: 'Social Science', category: '🌍 Geography', completed: false },
  { id: 'soc_12', title: 'Lifelines of National Economy', subject: 'Social Science', category: '🌍 Geography', completed: false },
  // Civics
  { id: 'soc_13', title: 'Power Sharing', subject: 'Social Science', category: '⚖ Civics', completed: false },
  { id: 'soc_14', title: 'Federalism', subject: 'Social Science', category: '⚖ Civics', completed: false },
  { id: 'soc_15', title: 'Democracy and Diversity', subject: 'Social Science', category: '⚖ Civics', completed: false },
  { id: 'soc_16', title: 'Gender, Religion and Caste', subject: 'Social Science', category: '⚖ Civics', completed: false },
  { id: 'soc_17', title: 'Popular Struggles and Movements', subject: 'Social Science', category: '⚖ Civics', completed: false },
  { id: 'soc_18', title: 'Political Parties', subject: 'Social Science', category: '⚖ Civics', completed: false },
  { id: 'soc_19', title: 'Outcomes of Democracy', subject: 'Social Science', category: '⚖ Civics', completed: false },
  // Economics
  { id: 'soc_20', title: 'Development', subject: 'Social Science', category: '💰 Economics', completed: false },
  { id: 'soc_21', title: 'Sectors of Indian Economy', subject: 'Social Science', category: '💰 Economics', completed: false },
  { id: 'soc_22', title: 'Money and Credit', subject: 'Social Science', category: '💰 Economics', completed: false },
  { id: 'soc_23', title: 'Globalisation and Indian Economy', subject: 'Social Science', category: '💰 Economics', completed: false },
  { id: 'soc_24', title: 'Consumer Rights', subject: 'Social Science', category: '💰 Economics', completed: false },
];

const QUESTIONS = {
  Science: [
    { text: 'What is the chemical formula of Marble?', options: ['CaCO3', 'CaO', 'Ca(OH)2', 'CaSO4'], correct: 0, explanation: 'Marble is Calcium Carbonate (CaCO3).', difficulty: 'Easy' },
    { text: 'Which gas is released when sodium reacts with water?', options: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Carbon dioxide'], correct: 1, explanation: 'Sodium reacts with water to release hydrogen gas.', difficulty: 'Easy' },
    { text: 'The SI unit of electric current is?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], correct: 2, explanation: 'Ampere is the unit for current flow.', difficulty: 'Easy' },
    { text: 'Which part of the brain controls balance?', options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Pons'], correct: 1, explanation: 'Cerebellum coordinates voluntary movements such as balance.', difficulty: 'Medium' },
    { text: 'The gadget used for producing electric current is?', options: ['Generator', 'Galvanometer', 'Ammeter', 'Motor'], correct: 0, explanation: 'Electric generators convert mechanical energy into electrical energy.', difficulty: 'Easy' },
    { text: 'Which acid is present in Tomato?', options: ['Citric Acid', 'Oxalic Acid', 'Lactic Acid', 'Acetic Acid'], correct: 1, explanation: 'Oxalic acid is found in tomatoes.', difficulty: 'Easy' },
    { text: 'The pH of human blood is around?', options: ['6.4', '7.4', '8.4', '9.4'], correct: 1, explanation: 'Human blood is slightly basic with a pH of ~7.4.', difficulty: 'Medium' },
    { text: 'The unit of power of a lens is?', options: ['Watt', 'Dioptre', 'Lumen', 'Candela'], correct: 1, explanation: 'Dioptre (D) is the unit of lens power.', difficulty: 'Easy' },
    { text: 'Which metal is liquid at room temperature?', options: ['Mercury', 'Sodium', 'Zinc', 'Copper'], correct: 0, explanation: 'Mercury is the only metal that is liquid at standard temperature.', difficulty: 'Easy' },
    { text: 'The focal length of a plane mirror is?', options: ['Zero', 'Infinite', 'One', 'Negative'], correct: 1, explanation: 'A plane mirror has an infinite focal length.', difficulty: 'Medium' },
    { text: 'Which hormone is known as the emergency hormone?', options: ['Insulin', 'Thyroxine', 'Adrenaline', 'Estrogen'], correct: 2, explanation: 'Adrenaline prepares the body for "fight or flight".', difficulty: 'Easy' },
    { text: 'The functional unit of kidney is?', options: ['Neuron', 'Nephron', 'Alveoli', 'Ureter'], correct: 1, explanation: 'Nephrons filter blood and produce urine.', difficulty: 'Medium' },
    { text: 'The scattering of light by colloidal particles is called?', options: ['Dispersion', 'Reflection', 'Tyndall Effect', 'Refraction'], correct: 2, explanation: 'Tyndall effect makes the path of light visible.', difficulty: 'Medium' },
    { text: 'The device used to measure electric potential difference is?', options: ['Ammeter', 'Voltmeter', 'Galvanometer', 'Ohmmeter'], correct: 1, explanation: 'Voltmeter measures voltage between two points.', difficulty: 'Easy' },
    { text: 'Which part of the flower develops into fruit?', options: ['Stigma', 'Style', 'Ovary', 'Ovule'], correct: 2, explanation: 'The ovary ripens into a fruit after fertilization.', difficulty: 'Medium' },
    { text: 'The mirrors used by dentists to see large images of teeth are?', options: ['Convex', 'Concave', 'Plane', 'Parabolic'], correct: 1, explanation: 'Concave mirrors produce enlarged virtual images when close.', difficulty: 'Medium' },
    { text: 'The non-metal which is a good conductor of electricity is?', options: ['Sulphur', 'Iodine', 'Graphite', 'Phosphorus'], correct: 2, explanation: 'Graphite (an allotrope of carbon) conducts electricity.', difficulty: 'Easy' },
    { text: 'Which plant hormone promotes cell division?', options: ['Auxin', 'Gibberellin', 'Cytokinin', 'Abscisic Acid'], correct: 2, explanation: 'Cytokinin is responsible for cell division in plants.', difficulty: 'Hard' },
    { text: 'The center of curvature of a spherical mirror is?', options: ['On surface', 'Behind only', 'Part of sphere', 'In front only'], correct: 2, explanation: 'It is the center of the sphere of which the mirror is a part.', difficulty: 'Medium' },
    { text: 'Biogas mainly consists of?', options: ['Ethane', 'Propane', 'Methane', 'Butane'], correct: 2, explanation: 'Methane is the major component of biogas.', difficulty: 'Easy' },
    { text: 'Pyruvate breakdown to CO2 and energy occurs in?', options: ['Cytoplasm', 'Mitochondria', 'Chloroplast', 'Nucleus'], correct: 1, explanation: 'This aerobic process happens in mitochondria.', difficulty: 'Medium' },
    { text: 'Which is a balanced equation?', options: ['H2+O2->H2O', 'Mg+O2->MgO', '2Mg+O2->2MgO', 'Na+Cl2->NaCl'], correct: 2, explanation: '2Mg + O2 -> 2MgO is balanced.', difficulty: 'Easy' },
    { text: 'A zyg-zag line in periodic table separates?', options: ['Gases/Liquids', 'Metals/Non-metals', 'Solids/Gases', 'Acids/Bases'], correct: 1, explanation: 'Zig-zag line separates metals from non-metals.', difficulty: 'Medium' },
    { text: 'Common salt from sea water is obtained by?', options: ['Filtration', 'Distillation', 'Evaporation', 'Sublimation'], correct: 2, explanation: 'Evaporation is the primary process.', difficulty: 'Easy' },
    { text: 'The movement of sunflower towards Sun is?', options: ['Phototropism', 'Chemotropism', 'Hydrotropism', 'Geotropism'], correct: 0, explanation: 'Sunlight direction triggers phototropism.', difficulty: 'Easy' },
    { text: 'Which mirror is used as a rear-view mirror in vehicles?', options: ['Concave', 'Convex', 'Plane', 'Cylindrical'], correct: 1, explanation: 'Convex mirrors provide a wide field of view.', difficulty: 'Easy' },
    { text: 'The part of the eye that controls the amount of light entering is?', options: ['Cornea', 'Lens', 'Pupil', 'Retina'], correct: 2, explanation: 'The pupil adjusts its size to regulate light.', difficulty: 'Medium' },
    { text: 'A solution turns red litmus blue, its pH is likely to be?', options: ['1', '4', '5', '10'], correct: 3, explanation: 'Bases turn red litmus blue and have pH > 7.', difficulty: 'Easy' },
    { text: 'Element with electronic configuration 2, 8, 2 is?', options: ['Na', 'Mg', 'Al', 'Si'], correct: 1, explanation: 'Atomic number 12 is Magnesium (Mg).', difficulty: 'Easy' },
    { text: 'Which of the following is not a digestive enzyme?', options: ['Pepsin', 'Trypsin', 'Amylase', 'Insulin'], correct: 3, explanation: 'Insulin is a hormone, not a digestive enzyme.', difficulty: 'Medium' },
    // Adding more unique questions to ensure pool size
    { text: 'In which part of the human eye is identity formed?', options: ['Iris', 'Pupil', 'Retina', 'Cornea'], correct: 2, difficulty: 'Medium', explanation: 'Images are formed on the retina.' },
    { text: 'What is the speed of light in vacuum?', options: ['3x10^8 m/s', '3x10^5 m/s', '3x10^6 m/s', '3x10^7 m/s'], correct: 0, difficulty: 'Easy', explanation: 'Standard physics constant.' },
    { text: 'The resistance of an ideal ammeter is?', options: ['Zero', 'Infinite', 'High', 'Low'], correct: 0, difficulty: 'Hard', explanation: 'Ideal ammeter has zero resistance to not affect current.' },
    { text: 'The color of solid magnesium oxide is?', options: ['Black', 'White', 'Yellow', 'Blue'], correct: 1, difficulty: 'Medium', explanation: 'Magnesium burns with white light to form white powder.' },
    { text: 'Which of these is a covalent compound?', options: ['NaCl', 'CH4', 'MgO', 'CaCl2'], correct: 1, difficulty: 'Hard', explanation: 'Methane (CH4) involves sharing of electrons.' },
  ],
  Mathematics: [
    { id: 'm1', text: 'The common difference of the AP: 3, 1, -1, -3... is?', options: ['2', '-2', '3', '1'], correct: 1, explanation: 'd = 1 - 3 = -2.', difficulty: 'Easy' },
    { id: 'm2', text: 'The value of sin 30 is?', options: ['1', '0', '1/2', '√3/2'], correct: 2, explanation: 'From the trig table, sin 30° = 1/2.', difficulty: 'Easy' },
    { id: 'm3', text: 'Sum of first 10 natural numbers?', options: ['45', '55', '50', '60'], correct: 1, explanation: 'Sum = 10 * 11 / 2 = 55.', difficulty: 'Easy' },
    { id: 'm4', text: 'If HCF(26, 91) = 13, then LCM(26, 91) is?', options: ['182', '364', '455', '13'], correct: 0, explanation: 'LCM = (Product of numbers) / HCF = (26*91)/13 = 182.', difficulty: 'Medium' },
    { id: 'm5', text: 'What is the coordinate of origin?', options: ['(1, 1)', '(0, 0)', '(0, 1)', '(1, 0)'], correct: 1, explanation: 'The origin is where axes intersect at (0,0).', difficulty: 'Easy' },
    { id: 'm6', text: 'A quadratic equation has degree?', options: ['1', '2', '3', '0'], correct: 1, explanation: 'Quadratic equations have a maximum power of 2.', difficulty: 'Easy' },
    { id: 'm7', text: 'The probability of a sure event is?', options: ['0', '1', '0.5', 'Infinite'], correct: 1, explanation: 'A sure event always happens, so P = 1.', difficulty: 'Easy' },
    { id: 'm8', text: 'Area of a circle is?', options: ['2πr', 'πr^2', 'πd', '2πr^2'], correct: 1, explanation: 'Area = π * radius^2.', difficulty: 'Easy' },
    { id: 'm9', text: 'Zero of the polynomial p(x) = 2x + 5 is?', options: ['-5/2', '5/2', '2/5', '-2/5'], correct: 0, explanation: '2x + 5 = 0 => x = -5/2.', difficulty: 'Easy' },
    { id: 'm10', text: 'The value of cos 60 is?', options: ['1', '0', '1/2', '√3/2'], correct: 2, explanation: 'cos 60° = 1/2.', difficulty: 'Easy' },
    { id: 'm11', text: 'The distance of point (4, 3) from origin is?', options: ['3', '4', '5', '7'], correct: 2, explanation: 'Distance = sqrt(4^2 + 3^2) = 5.', difficulty: 'Medium' },
    { id: 'm12', text: 'Discriminant of ax^2 + bx + c = 0 is?', options: ['b^2 - 4ac', '4ac - b^2', 'sqrt(b^2-4ac)', 'b^2 + 4ac'], correct: 0, explanation: 'D = b^2 - 4ac.', difficulty: 'Medium' },
    { id: 'm13', text: 'Value of tan 45 is?', options: ['0', '1', 'sqrt(3)', '1/sqrt(3)'], correct: 1, explanation: 'tan 45° = 1.', difficulty: 'Easy' },
    { id: 'm14', text: 'Surface area of a sphere of radius r?', options: ['4πr^2', '2πr^2', '3πr^2', 'πr^2'], correct: 0, explanation: 'Total surface area = 4πr^2.', difficulty: 'Medium' },
    { id: 'm15', text: 'Sum of roots of ax^2 + bx + c = 0 is?', options: ['c/a', '-b/a', 'b/a', '-c/a'], correct: 1, explanation: 'Alpha + Beta = -b/a.', difficulty: 'Medium' },
    { id: 'm16', text: 'Product of roots of ax^2 + bx + c = 0 is?', options: ['c/a', '-b/a', 'b/a', 'a/c'], correct: 0, explanation: 'Alpha * Beta = c/a.', difficulty: 'Medium' },
    { id: 'm17', text: 'Total number of outcomes when two dice are thrown?', options: ['12', '36', '24', '6'], correct: 1, explanation: '6 * 6 = 36.', difficulty: 'Medium' },
    { id: 'm18', text: 'Mean of first 5 prime numbers?', options: ['5.6', '5', '6', '4.5'], correct: 0, explanation: '(2+3+5+7+11)/5 = 28/5 = 5.6.', difficulty: 'Hard' },
    { id: 'm19', text: 'If n-th term of an AP is 3n + 1, common difference is?', options: ['3', '1', '4', '2'], correct: 0, explanation: 'a1=4, a2=7. d = 7-4 = 3.', difficulty: 'Medium' },
    { id: 'm20', text: 'The point (0, -4) lies on?', options: ['X-axis', 'Y-axis', 'Origin', 'Quadrant I'], correct: 1, explanation: 'Since x=0, it lies on the Y-axis.', difficulty: 'Easy' },
    { id: 'm21', text: 'If tan A = 4/3, then cot A is?', options: ['3/4', '4/3', '5/3', '3/5'], correct: 0, explanation: 'cot A = 1/tan A = 3/4.', difficulty: 'Medium' },
    { id: 'm22', text: 'The volume of a cylinder is?', options: ['πr^2h', '1/3 πr^2h', '2πrh', '4/3 πr^3'], correct: 0, explanation: 'V = π * r^2 * h.', difficulty: 'Medium' },
    { id: 'm23', text: 'HCF of two co-prime numbers is?', options: ['0', '1', 'Common factor', 'Product'], correct: 1, explanation: 'Co-prime numbers have no common factor other than 1.', difficulty: 'Hard' },
    { id: 'm24', text: 'Number of tangents that can be drawn from a point outside the circle?', options: ['1', '2', 'Infinite', '0'], correct: 1, explanation: 'Exactly two tangents can be drawn.', difficulty: 'Medium' },
    { id: 'm25', text: 'The relation between Mean, Median and Mode is?', options: ['3 Median = Mode + 2 Mean', 'Mode = 2 Median - 3 Mean', 'Median = 3 Mode - Mean', 'Mean = Median + Mode'], correct: 0, explanation: '3 Median = Mode + 2 Mean is the empirical formula.', difficulty: 'Hard' },
    { id: 'm26', text: 'Distance of point (x, y) from origin is?', options: ['x+y', 'sqrt(x+y)', 'sqrt(x^2+y^2)', 'x^2+y^2'], correct: 2, explanation: 'By Pythagoras theorem.', difficulty: 'Medium' },
    { id: 'm27', text: 'Sin (90 - theta) is?', options: ['sin theta', 'cos theta', 'tan theta', 'sec theta'], correct: 1, explanation: 'Complementary angle identity.', difficulty: 'Medium' },
    { id: 'm28', text: 'Angle in a semi-circle is?', options: ['45', '90', '180', '60'], correct: 1, explanation: 'The angle subtended by a diameter at any point on the circle is 90°.', difficulty: 'Medium' },
    { id: 'm29', text: 'The volume of a cone is?', options: ['πr^2h', '1/3 πr^2h', 'πrl', '2/3 πr^3'], correct: 1, explanation: 'Volume is one-third of the corresponding cylinder.', difficulty: 'Medium' },
    { id: 'm30', text: 'Probability of getting a head in a single toss of a coin?', options: ['1', '0', '1/2', '1/4'], correct: 2, explanation: 'There are two equally likely outcomes (H, T).', difficulty: 'Easy' },
    // More questions
    { id: 'm31', text: 'The solution of x + y = 3 and 2x - y = 0 is?', options: ['(1,2)', '(2,1)', '(0,3)', '(3,0)'], correct: 0, difficulty: 'Hard', explanation: 'Solve the simultaneous equations.' },
    { id: 'm32', text: 'What is the value of (1 + tan^2 theta)?', options: ['sin^2', 'cos^2', 'sec^2', 'cosec^2'], correct: 2, difficulty: 'Hard', explanation: 'Standard identity.' },
    { id: 'm33', text: 'Volume of a sphere is?', options: ['4/3 πr^3', 'πr^3', '2/3 πr^3', '4πr^2'], correct: 0, difficulty: 'Medium', explanation: 'Formula for volume.' },
    { id: 'm34', text: 'The zeroes of x^2 - 2x - 8 are?', options: ['(4,-2)', '(-4,2)', '(2,4)', '(-2, -4)'], correct: 0, difficulty: 'Medium', explanation: 'Factorize: (x-4)(x+2).' },
    { id: 'm35', text: 'A tangent to a circle intersects it in how many points?', options: ['1', '2', '0', 'Many'], correct: 0, difficulty: 'Easy', explanation: 'By definition, one point.' },
  ],
  'Social Science': [
    { id: 's1', text: 'Who discovered the sea route to India?', options: ['Columbus', 'Vasco da Gama', 'Magellan', 'Drake'], correct: 1, explanation: 'Vasco da Gama discovered the sea route to India in 1498.', difficulty: 'Easy' },
    { id: 's2', text: 'The battle of Plassey took place in?', options: ['1764', '1757', '1857', '1942'], correct: 1, explanation: 'The battle established British rule in India in 1757.', difficulty: 'Medium' },
    { id: 's3', text: 'Who is known as the Iron Man of India?', options: ['Nehru', 'Gandhi', 'Sardar Patel', 'Ambedkar'], correct: 2, explanation: 'Sardar Patel is known for integrating princely states.', difficulty: 'Easy' },
    { id: 's4', text: 'When did the Jallianwala Bagh incident occur?', options: ['1919', '1920', '1930', '1942'], correct: 0, explanation: 'It occurred on April 13, 1919.', difficulty: 'Easy' },
    { id: 's5', text: 'Which soil is best suited for cotton cultivation?', options: ['Red soil', 'Alluvial soil', 'Black soil', 'Laterite soil'], correct: 2, explanation: 'Black soil (Regur soil) is ideal for cotton.', difficulty: 'Easy' },
    { id: 's6', text: 'Who was the first President of Independent India?', options: ['Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'S. Radhakrishnan'], correct: 0, explanation: 'Dr. Rajendra Prasad served as the first president.', difficulty: 'Easy' },
    { id: 's7', text: 'The Silicon Valley of India is?', options: ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad'], correct: 2, explanation: 'Bengaluru is the IT hub of India.', difficulty: 'Easy' },
    { id: 's8', text: 'When was the Quit India Movement launched?', options: ['1920', '1930', '1942', '1947'], correct: 2, explanation: 'Launched in August 1942.', difficulty: 'Easy' },
    { id: 's9', text: 'Who wrote "Hind Swaraj"?', options: ['Nehru', 'Gandhi', 'Bose', 'Patel'], correct: 1, explanation: 'Mahatma Gandhi wrote it in 1909.', difficulty: 'Medium' },
    { id: 's10', text: 'French Revolution started in?', options: ['1776', '1789', '1799', '1815'], correct: 1, explanation: 'It broke out in 1789.', difficulty: 'Medium' },
    { id: 's11', text: 'Longest river in India?', options: ['Godavari', 'Ganga', 'Yamuna', 'Brahmaputra'], correct: 1, explanation: 'Ganga is the longest.', difficulty: 'Easy' },
    { id: 's12', text: 'First World War ended in?', options: ['1914', '1918', '1939', '1945'], correct: 1, explanation: 'Ended on Nov 11, 1918.', difficulty: 'Medium' },
    { id: 's13', text: 'Project Tiger was launched in?', options: ['1953', '1973', '1983', '1993'], correct: 1, explanation: 'Launched in 1973.', difficulty: 'Medium' },
    { id: 's14', text: 'Bhakra Nangal dam is on which river?', options: ['Satluj', 'Beas', 'Chenab', 'Ravi'], correct: 0, explanation: 'Built on Satluj.', difficulty: 'Medium' },
    { id: 's15', text: 'Which of these is a Rabi crop?', options: ['Rice', 'Wheat', 'Maize', 'Cotton'], correct: 1, explanation: 'Wheat is a winter/Rabi crop.', difficulty: 'Easy' },
    { id: 's16', text: 'Kudremukh is famous for?', options: ['Coal', 'Iron Ore', 'Gold', 'Petroleum'], correct: 1, explanation: 'Famous for iron ore mines.', difficulty: 'Medium' },
    { id: 's17', text: 'Father of Indian Constitution?', options: ['Gandhi', 'Ambedkar', 'Nehru', 'Patel'], correct: 1, explanation: 'Dr. B.R. Ambedkar.', difficulty: 'Easy' },
    { id: 's18', text: 'Literacy rate of India (2011)?', options: ['74%', '65%', '82%', '50%'], correct: 0, explanation: 'Approx 74%.', difficulty: 'Medium' },
    { id: 's19', text: 'Green Revolution success in?', options: ['Wheat/Rice', 'Cotton', 'Tea', 'Pulses'], correct: 0, explanation: 'Mainly food grains.', difficulty: 'Easy' },
    { id: 's20', text: 'Capital of Karnataka?', options: ['Mysore', 'Mangalore', 'Bengaluru', 'Hubballi'], correct: 2, explanation: 'Bengaluru.', difficulty: 'Easy' },
    { id: 's21', text: 'Who was the first female Prime Minister of India?', options: ['Sonia Gandhi', 'Indira Gandhi', 'Pratibha Patil', 'Sarojini Naidu'], correct: 1, explanation: 'Indira Gandhi served as PM.', difficulty: 'Easy' },
    { id: 's22', text: 'The "Statue of Unity" is dedicated to?', options: ['Gandhi', 'Nehru', 'Sardar Patel', 'Bose'], correct: 2, explanation: 'Dedicated to Sardar Vallabhbhai Patel.', difficulty: 'Easy' },
    { id: 's23', text: 'Which state is known as the "Spice Garden of India"?', options: ['Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh'], correct: 1, explanation: 'Kerala is famous for its spices.', difficulty: 'Easy' },
    { id: 's24', text: 'The National Anthem of India was written by?', options: ['Tagore', 'Chatterjee', 'Naidu', 'Iqbal'], correct: 0, explanation: 'Rabindranath Tagore.', difficulty: 'Easy' },
    { id: 's25', text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1, explanation: 'Mars is red due to iron oxide.', difficulty: 'Easy' },
    { id: 's26', text: 'The largest continent in the world is?', options: ['Africa', 'Europe', 'Asia', 'North America'], correct: 2, explanation: 'Asia is the largest.', difficulty: 'Easy' },
    { id: 's27', text: 'Who was the first Indian to win a Nobel Prize?', options: ['C.V. Raman', 'Mother Teresa', 'Rabindranath Tagore', 'Amartya Sen'], correct: 2, explanation: 'Rabindranath Tagore in 1913.', difficulty: 'Easy' },
    { id: 's28', text: 'Vande Mataram was written by?', options: ['Tagore', 'Bankim Chandra Chatterjee', 'Lajpat Rai', 'Tilak'], correct: 1, explanation: 'Bankim Chandra Chatterjee.', difficulty: 'Medium' },
    { id: 's29', text: 'The lowest layer of Atmosphere is?', options: ['Stratosphere', 'Troposphere', 'Mesosphere', 'Exosphere'], correct: 1, explanation: 'Troposphere.', difficulty: 'Easy' },
    { id: 's30', text: 'When did India become a Republic?', options: ['1947', '1948', '1950', '1951'], correct: 2, explanation: 'Jan 26, 1950.', difficulty: 'Easy' },
    // More questions
    { id: 's31', text: 'Who wrote "Discovery of India"?', options: ['Gandhi', 'Nehru', 'Bose', 'Tagore'], correct: 1, difficulty: 'Hard', explanation: 'Jawaharlal Nehru wrote it in prison.' },
    { id: 's32', text: 'The Simon Commission was boycotted because?', options: ['No Indian member', 'It was late', 'It was pro-British', 'It was violent'], correct: 0, difficulty: 'Hard', explanation: 'All-white commission.' },
    { id: 's33', text: 'What is the tenure of a Rajya Sabha member?', options: ['4 years', '5 years', '6 years', 'Permanent'], correct: 2, difficulty: 'Hard', explanation: 'Elected for 6 years term.' },
    { id: 's34', text: 'Which city is the summer capital of J&K?', options: ['Jammu', 'Srinagar', 'Leh', 'Gulmarg'], correct: 1, difficulty: 'Medium', explanation: 'Srinagar is summer, Jammu is winter.' },
    { id: 's35', text: 'What is the main occupation of people in India?', options: ['Industry', 'Service', 'Agriculture', 'Mining'], correct: 2, difficulty: 'Easy', explanation: 'Agriculture employs the majority.' },
  ]
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [syllabus, setSyllabus] = useState(() => {
    const saved = localStorage.getItem('akshara_syllabus');
    return saved ? JSON.parse(saved) : SYLLABUS;
  });
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [selectedSubjectView, setSelectedSubjectView] = useState<string | null>(null);
  
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('akshara_streak') || '0');
  });
  const [dailyGoal, setDailyGoal] = useState(() => {
    return parseInt(localStorage.getItem('akshara_dailyGoal') || '3');
  });
  const [completedToday, setCompletedToday] = useState(() => {
    return parseInt(localStorage.getItem('akshara_completedToday') || '0');
  });
  
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(dailyGoal);
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('akshara_scores');
    return saved ? JSON.parse(saved) : { Science: 0, Mathematics: 0, 'Social Science': 0 };
  });
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [selectedQuizSubject, setSelectedQuizSubject] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<{subject: string, difficulty: string, index: number, score: number, userAnswers: number[]} | null>(null);
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem('akshara_points') || '0');
  });
  const [badges, setBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('akshara_badges');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarks, setBookmarks] = useState<any[]>(() => {
    const saved = localStorage.getItem('akshara_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [usedQuestionIds, setUsedQuestionIds] = useState<Record<string, Set<string>>>({
    Science: new Set(),
    Mathematics: new Set(),
    'Social Science': new Set()
  });
  
  // Date tracking for streak
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('akshara_lastVisit');
    const lastGoalDate = localStorage.getItem('akshara_lastGoalDate');

    if (lastVisit !== today) {
      // It's a new day!
      localStorage.setItem('akshara_lastVisit', today);
      
      // Reset daily completion
      setCompletedToday(0);
      localStorage.setItem('akshara_completedToday', '0');

      // Check if streak should be reset
      // If they didn't meet their goal yesterday (or ever), reset streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();

      if (lastGoalDate !== yesterdayString && lastGoalDate !== today) {
        setStreak(0);
        localStorage.setItem('akshara_streak', '0');
      }
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('akshara_syllabus', JSON.stringify(syllabus));
    localStorage.setItem('akshara_streak', streak.toString());
    localStorage.setItem('akshara_dailyGoal', dailyGoal.toString());
    localStorage.setItem('akshara_completedToday', completedToday.toString());
    localStorage.setItem('akshara_scores', JSON.stringify(scores));
    localStorage.setItem('akshara_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('akshara_points', points.toString());
    localStorage.setItem('akshara_badges', JSON.stringify(badges));
  }, [syllabus, streak, dailyGoal, completedToday, scores, bookmarks, points, badges]);

  const awardPoints = (amount: number) => {
    setPoints(prev => prev + amount);
  };

  const checkBadges = (updatedBadges: string[] = badges, currentPoints: number = points, currentStreak: number = streak, currentScores: any = scores) => {
    const newBadges = [...updatedBadges];
    let changed = false;

    if (currentPoints >= 500 && !newBadges.includes('Rising Star')) {
      newBadges.push('Rising Star');
      changed = true;
    }
    if (currentPoints >= 2000 && !newBadges.includes('Savant')) {
      newBadges.push('Savant');
      changed = true;
    }
    if (currentStreak >= 3 && !newBadges.includes('Consistent Learner')) {
      newBadges.push('Consistent Learner');
      changed = true;
    }
    if (currentScores.Science >= 90 && !newBadges.includes('Science Whiz')) {
      newBadges.push('Science Whiz');
      changed = true;
    }
    if (currentScores.Mathematics >= 90 && !newBadges.includes('Math Master')) {
      newBadges.push('Math Master');
      changed = true;
    }
    if (currentScores['Social Science'] >= 90 && !newBadges.includes('History Buff')) {
      newBadges.push('History Buff');
      changed = true;
    }

    if (changed) {
      setBadges(newBadges);
    }
  };

  useEffect(() => {
    checkBadges();
  }, [points, streak, scores]);

  const startQuiz = (subject: string, difficulty: string) => {
    const allPool = (QUESTIONS[subject as keyof typeof QUESTIONS] || []) as any[];
    const difficultyPool = allPool.filter(q => q.difficulty === difficulty || !q.difficulty); // fallback to tagged or untagged
    const used = usedQuestionIds[subject] || new Set();
    
    // Filter out used questions
    let available = difficultyPool.filter((q: any) => !used.has(q.id || q.text));
    
    // If pool is exhausted or less than needed, reset for this subject
    // Note: If pool is smaller than 25, we'll take what we have
    const limit = Math.min(25, difficultyPool.length);
    if (available.length < limit) {
      setUsedQuestionIds(prev => ({
        ...prev,
        [subject]: new Set()
      }));
      available = [...difficultyPool];
    }

    const shuffled = shuffleArray(available).slice(0, 25);
    
    // Mark these as used
    const newUsed = new Set(used);
    shuffled.forEach((q: any) => newUsed.add(q.id || q.text));
    setUsedQuestionIds(prev => ({
      ...prev,
      [subject]: newUsed
    }));

    setQuizQuestions(shuffled);
    setQuizState({ subject, difficulty, index: 0, score: 0, userAnswers: [] });
    setSelectedQuizSubject(null);
  };

  const toggleChapter = (id: string) => {
    const chapter = syllabus.find((c: any) => c.id === id);
    if (!chapter) return;

    if (!chapter.completed) {
      const newCount = completedToday + 1;
      setCompletedToday(newCount);
      awardPoints(10); // 10 points per chapter
      if (newCount === dailyGoal) {
        setStreak(prev => prev + 1);
        awardPoints(50); // Daily goal bonus
        localStorage.setItem('akshara_lastGoalDate', new Date().toDateString());
      }
    } else {
      setCompletedToday(prev => Math.max(0, prev - 1));
      // If they un-complete it and were at the goal, we don't necessarily decrease streak 
      // (usually streaks are "ever reached goal today")
    }

    setSyllabus((prev: any) => prev.map((c: any) => c.id === id ? { ...c, completed: !c.completed } : c));
  };

  const toggleBookmark = (question: any, subject: string) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.text === question.text);
      if (exists) {
        return prev.filter(b => b.text !== question.text);
      } else {
        return [...prev, { ...question, subject }];
      }
    });
  };

  const overallProgress = Math.round((syllabus.filter(c => c.completed).length / syllabus.length) * 100);

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F7] font-sans text-[#212121]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#3F51B5] to-[#2196F3] p-6 text-white shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">AKSHARA</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Knowledge Path</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2">
              <Zap size={16} className="text-yellow-300 fill-yellow-300" />
              <span className="font-black text-sm">{points}</span>
           </div>
           <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <User size={20} />
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-bold mb-4">Overall Progress</h2>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-[#3F51B5] h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">{overallProgress}% of syllabus completed</p>
              </section>

              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                     <Trophy size={60} />
                  </div>
                  <div className="flex items-center gap-2 text-[#3F51B5] mb-2">
                    <Trophy size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mastery</span>
                  </div>
                  <p className="text-2xl font-black">{points} <span className="text-[10px] text-gray-400">pts</span></p>
                </motion.div>
                <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 text-green-500 mb-2">
                    <CheckCircle2 size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Streak</span>
                  </div>
                  <p className="text-2xl font-black">{streak} <span className="text-[10px] text-gray-400">days</span></p>
                </div>
              </div>

              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
                {(Object.entries(scores) as [string, number][]).map(([subject, score]) => (
                  <div key={subject} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject}</span>
                      <span className="font-bold">{score}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-[#2196F3] h-1.5 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </section>

              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-blue-800 font-medium italic italic">"The roots of education are bitter, but the fruit is sweet." - Aristotle</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'syllabus' && (
            <motion.div
              key="syllabus"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
              id="syllabus-container"
            >
              {!selectedSubjectView ? (
                <>
                  <div className="px-2">
                    <h2 className="text-2xl font-black text-[#3F51B5] uppercase tracking-tighter">Syllabus Guide</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Select a subject to track progress</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Science', color: 'bg-blue-500', icon: '🔬' },
                      { name: 'Mathematics', color: 'bg-purple-500', icon: '📐' },
                      { name: 'Social Science', color: 'bg-orange-500', icon: '🌍' }
                    ].map(sub => {
                      const subjectChapters = syllabus.filter(c => c.subject === sub.name);
                      const completed = subjectChapters.filter(c => c.completed).length;
                      const progress = subjectChapters.length > 0 ? Math.round((completed / subjectChapters.length) * 100) : 0;
                      
                      return (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          key={sub.name}
                          onClick={() => setSelectedSubjectView(sub.name)}
                          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer group"
                        >
                          <div className={`${sub.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                            {sub.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800">{sub.name}</h3>
                            <div className="flex items-center gap-2 mt-2">
                               <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className={`${sub.color} h-full`} 
                                  />
                               </div>
                               <span className="text-[10px] font-black text-gray-400">{progress}%</span>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-2">
                    <button 
                      onClick={() => setSelectedSubjectView(null)}
                      className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-gray-400 hover:text-blue-500"
                    >
                      <ChevronRight className="rotate-180" />
                    </button>
                    <div>
                      <h2 className="text-2xl font-black text-[#3F51B5] uppercase tracking-tighter">{selectedSubjectView}</h2>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                        Chapter Progress: {Math.round((syllabus.filter(c => c.subject === selectedSubjectView && c.completed).length / syllabus.filter(c => c.subject === selectedSubjectView).length) * 100)}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {syllabus.filter(c => c.subject === selectedSubjectView).map((chapter, index, filteredArray) => {
                      const showHeader = index === 0 || chapter.category !== filteredArray[index - 1].category;
                      return (
                        <div key={chapter.id}>
                          {showHeader && (
                            <div className="px-2 py-2 mt-4 mb-2">
                              <h4 className="text-[11px] font-black text-[#3F51B5] uppercase tracking-[0.2em]">{chapter.category || 'General'}</h4>
                            </div>
                          )}
                          <motion.div
                            layout
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between group"
                          >
                            <div className="flex-1">
                               <h3 className="font-bold text-gray-800 leading-tight">{chapter.title}</h3>
                               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Foundational Mastery</p>
                            </div>
                            <button
                              onClick={() => toggleChapter(chapter.id)}
                              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                chapter.completed 
                                  ? 'bg-green-50 text-green-600 border-2 border-green-100' 
                                  : 'bg-gray-50 text-gray-300 border-2 border-gray-100 hover:border-blue-200 hover:text-blue-400'
                              }`}
                            >
                              <CheckCircle2 size={24} strokeWidth={chapter.completed ? 3 : 2} />
                            </button>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!quizState ? (
                <div className="space-y-6">
                  {!selectedQuizSubject ? (
                    <>
                      <div className="px-2">
                        <h2 className="text-2xl font-black text-[#3F51B5] uppercase tracking-tighter">Quiz Arena</h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Choose a field of battle</p>
                      </div>
                      <div className="grid gap-4">
                        {['Science', 'Mathematics', 'Social Science'].map(subject => (
                          <button
                            key={subject}
                            onClick={() => setSelectedQuizSubject(subject)}
                            className="w-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#3F51B5] group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <BookOpen size={24} />
                              </div>
                              <div className="text-left">
                                <span className="font-black text-lg block">{subject}</span>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mastery Challenge</p>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500" />
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                      <div className="flex items-center gap-2 px-2">
                        <button 
                          onClick={() => setSelectedQuizSubject(null)}
                          className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-gray-400"
                        >
                          <ChevronRight className="rotate-180" />
                        </button>
                        <h2 className="text-xl font-black text-[#3F51B5] uppercase tracking-tighter">{selectedQuizSubject}: Difficulty</h2>
                      </div>
                      
                      <div className="grid gap-3 p-2">
                        {[
                          { level: 'Easy', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', desc: 'Fundamentals and easy-recall' },
                          { level: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', desc: 'Concepts and application' },
                          { level: 'Hard', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', desc: 'Complex analysis and logic' }
                        ].map(diff => (
                          <button
                            key={diff.level}
                            onClick={() => startQuiz(selectedQuizSubject, diff.level)}
                            className={`w-full ${diff.bg} ${diff.border} border-2 p-6 rounded-3xl flex items-center justify-between group hover:shadow-md transition-all text-left`}
                          >
                            <div>
                               <div className="flex items-center gap-2">
                                  <span className={`font-black text-xl ${diff.color}`}>{diff.level}</span>
                                  {diff.level === 'Hard' && <div className="animate-pulse w-2 h-2 rounded-full bg-red-400" />}
                               </div>
                               <p className="text-xs text-gray-500 mt-1">{diff.desc}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl bg-white border ${diff.border} flex items-center justify-center ${diff.color}`}>
                               <Play size={20} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {quizState.index < quizQuestions.length ? (
                    <div className="bg-white p-8 rounded-3xl shadow-xl min-h-[400px] flex flex-col">
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{quizState.subject}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                                quizState.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                                quizState.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {quizState.difficulty}
                              </span>
                           </div>
                           <span className="bg-blue-100 text-[#3F51B5] px-3 py-1 rounded-full text-[10px] font-bold mt-1 w-fit">
                             {quizState.index + 1} / {quizQuestions.length}
                           </span>
                        </div>
                        <button 
                          onClick={() => toggleBookmark(quizQuestions[quizState.index], quizState.subject)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            bookmarks.some(b => b.text === quizQuestions[quizState.index].text)
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-gray-50 text-gray-300 hover:text-amber-500'
                          }`}
                        >
                          <Bookmark size={20} fill={bookmarks.some(b => b.text === quizQuestions[quizState.index].text) ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 leading-tight mb-auto">
                        {quizQuestions[quizState.index].text}
                      </h3>
                      <div className="space-y-3 mt-8">
                        {quizQuestions[quizState.index].options.map((opt: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => setQuizState(prev => prev ? { 
                              ...prev, 
                              index: prev.index + 1, 
                              score: i === quizQuestions[quizState.index].correct ? prev.score + 1 : prev.score,
                              userAnswers: [...prev.userAnswers, i]
                            } : null)}
                            className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-[#3F51B5] hover:bg-blue-50 transition-all font-medium text-gray-700"
                          >
                            <span className="inline-block w-8 font-bold text-gray-300">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-3xl shadow-xl text-center space-y-6">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <GraduationCap size={32} />
                      </div>
                      <h3 className="text-xl font-bold">Quiz Completed!</h3>
                      <div className="text-4xl font-black text-[#3F51B5]">{quizState.score} / {quizQuestions.length}</div>
                      
                      <div className="text-left space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        <p className="font-bold text-sm text-gray-400 uppercase">Review Answers</p>
                        {quizQuestions.map((q, idx) => {
                          const userAns = quizState.userAnswers[idx];
                          const isCorrect = userAns === q.correct;
                          return (
                            <div key={idx} className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                              <p className="font-bold text-sm mb-2">{q.text}</p>
                              <div className="space-y-1 mb-2">
                                <p className={`text-xs ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                  Your answer: <span className="font-bold">{q.options[userAns]}</span>
                                </p>
                                {!isCorrect && (
                                  <p className="text-xs text-green-700">
                                    Correct answer: <span className="font-bold">{q.options[q.correct]}</span>
                                  </p>
                                )}
                              </div>
                              {q.explanation && (
                                <div className="mt-2 p-2 bg-white/50 rounded-lg text-[11px] text-gray-600 leading-relaxed italic">
                                  <span className="font-bold uppercase text-[9px] block mb-0.5">Explanation:</span>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => {
                          const percentage = Math.round((quizState.score / quizQuestions.length) * 100);
                          // Quiz bonus points: score% * 2 (max 200)
                          awardPoints(percentage * 2);
                          setScores(prev => {
                            const currentScore = prev[quizState.subject as keyof typeof prev] || 0;
                            // Smoothing function: new score is 70% old, 30% new performance
                            const updated = currentScore === 0 ? percentage : Math.round(currentScore * 0.7 + percentage * 0.3);
                            return { ...prev, [quizState.subject]: updated };
                          });
                          setQuizState(null);
                        }}
                        className="w-full bg-[#3F51B5] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 mt-4"
                      >
                        Try Another Subject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="px-2">
                <h2 className="text-2xl font-black text-[#3F51B5] uppercase tracking-tighter">Your Collection</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Earned via Mastery & Consistency</p>
              </div>

              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex items-center gap-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000 rotate-12">
                   <Trophy size={160} />
                 </div>
                 <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-[#3F51B5] shadow-inner relative z-10">
                   <Trophy size={40} />
                 </div>
                 <div className="relative z-10">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Points</span>
                    <h3 className="text-5xl font-black text-gray-800 tracking-tighter">{points}</h3>
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
                      <Zap size={14} />
                      <span>Next Rank at 2,000 pts</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Science Whiz', icon: <Sparkles />, desc: 'Science score > 90%', color: 'bg-blue-500' },
                  { name: 'Math Master', icon: <Zap />, desc: 'Math score > 90%', color: 'bg-indigo-500' },
                  { name: 'Consistent Learner', icon: <CheckCircle2 />, desc: '3 day streak', color: 'bg-green-500' },
                  { name: 'Rising Star', icon: <User />, desc: '500 total points', color: 'bg-amber-500' },
                  { name: 'History Buff', icon: <BookOpen />, desc: 'Social Science > 90%', color: 'bg-red-500' },
                  { name: 'Savant', icon: <GraduationCap />, desc: '2000 total points', color: 'bg-purple-600' }
                ].map((badge) => {
                  const isEarned = badges.includes(badge.name);
                  return (
                    <motion.div
                      key={badge.name}
                      whileHover={isEarned ? { scale: 1.05 } : {}}
                      className={`p-6 rounded-[2rem] border-2 flex flex-col items-center text-center transition-all ${
                        isEarned 
                        ? `${badge.color} border-transparent text-white shadow-xl shadow-${badge.color.split('-')[1]}-100` 
                        : 'bg-gray-50 border-gray-100 text-gray-300'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                        isEarned ? 'bg-white/20' : 'bg-white text-gray-200'
                      }`}>
                        {badge.icon}
                      </div>
                      <h4 className="font-black text-xs uppercase tracking-tight leading-tight">{badge.name}</h4>
                      {isEarned ? (
                        <div className="mt-2 flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                           <CheckCircle2 size={10} />
                           <span className="text-[8px] font-black uppercase tracking-widest">Collected</span>
                        </div>
                      ) : (
                        <p className="text-[8px] font-bold uppercase tracking-widest mt-2">{badge.desc}</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-gray-900 p-8 rounded-[3rem] text-white overflow-hidden relative group">
                 <div className="relative z-10">
                    <h3 className="font-black text-xl mb-1 tracking-tighter">Leaderboard</h3>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6">Top Performers in Class</p>
                    
                    <div className="space-y-4">
                       {[
                         { name: 'Adarsh', points: 2450, rank: 1, me: true },
                         { name: 'Rahul', points: 2120, rank: 2 },
                         { name: 'Sneha', points: 1980, rank: 3 },
                         { name: 'Priya', points: 1850, rank: 4 }
                       ].map(user => (
                         <div key={user.name} className={`flex items-center gap-4 p-3 rounded-2xl border ${user.me ? 'bg-[#3F51B5] border-transparent shadow-lg shadow-blue-900/50' : 'bg-white/5 border-white/10'}`}>
                            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-black text-xs">
                              {user.rank}
                            </div>
                            <div className="flex-1">
                               <p className="font-black text-sm">{user.name} {user.me && <span className="text-[8px] bg-white/20 px-1 rounded ml-1">YOU</span>}</p>
                            </div>
                            <p className="font-black text-[#3F51B5] bg-white px-2 py-0.5 rounded-lg text-xs leading-none flex items-center justify-center min-w-[60px]">
                               {user.me ? points : user.points}
                            </p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 p-8 opacity-10 blur-3xl bg-blue-500 w-32 h-32 rounded-full -translate-y-16 translate-x-16" />
              </div>
            </motion.div>
          )}

          {activeTab === 'strength' && (
            <motion.div
              key="strength"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="px-2">
                <h2 className="text-2xl font-black text-[#3F51B5] uppercase tracking-tighter">Strength Map</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Based on Quiz Performance & Syllabus</p>
              </div>

              <div className="grid gap-4">
                {(Object.entries(scores) as [string, number][]).map(([subject, quizScore]) => {
                  const subjectChapters = syllabus.filter((c: any) => c.subject === subject);
                  const completionScore = subjectChapters.length > 0 
                    ? Math.round((subjectChapters.filter((c: any) => c.completed).length / subjectChapters.length) * 100) 
                    : 0;
                  
                  // Final strength is 60% quiz performance and 40% completion
                  const finalStrength = Math.round(quizScore * 0.6 + completionScore * 0.4);
                  
                  let label = 'Beginner';
                  let colorClass = 'bg-red-500';
                  if (finalStrength >= 85) { label = 'Master'; colorClass = 'bg-indigo-600'; }
                  else if (finalStrength >= 70) { label = 'Proficient'; colorClass = 'bg-green-500'; }
                  else if (finalStrength >= 40) { label = 'Intermediate'; colorClass = 'bg-amber-400'; }

                  return (
                    <div key={subject} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-black text-gray-800 text-lg">{subject}</h4>
                          <div className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest text-white mt-1 ${colorClass}`}>
                            {label}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-[#3F51B5]">{finalStrength}%</span>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Strength Index</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                            <span>Knowledge (Quiz)</span>
                            <span>{quizScore}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${quizScore}%` }}
                              className="h-full bg-blue-400" 
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                            <span>Expertise (Syllabus)</span>
                            <span>{completionScore}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${completionScore}%` }}
                              className="h-full bg-purple-400" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#1A237E] p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <GraduationCap size={18} />
                    </div>
                    <h4 className="font-black uppercase tracking-widest text-xs">Academic Advisor</h4>
                  </div>
                  <p className="text-sm font-medium leading-relaxed opacity-90 italic">
                    {(() => {
                      const entries = Object.entries(scores) as [string, number][];
                      const weakest = [...entries].sort((a, b) => a[1] - b[1])[0];
                      const strongest = [...entries].sort((a, b) => b[1] - a[1])[0];
                      
                      if (strongest[1] === 0) return "Start taking quizzes to see your strength map and get personalized advice!";
                      
                      return `Your ${strongest[0]} skills are impressive! However, your knowledge in ${weakest[0]} shows room for improvement. Try completing more ${weakest[0]} chapters to boost your score.`;
                    })()}
                  </p>
                </div>
                {/* Decorative circles */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />
                <div className="absolute right-8 top-2 w-12 h-12 bg-white/5 rounded-full" />
              </div>
            </motion.div>
          )}

          {activeTab === 'goal' && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold px-2">Study Goals</h2>
              <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {/* Circular Progress */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96" cy="96" r="88"
                      stroke="#F3F4F6" strokeWidth="12" fill="transparent"
                    />
                    <circle
                      cx="96" cy="96" r="88"
                      stroke="#3F51B5" strokeWidth="12" fill="transparent"
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * (1 - (completedToday / dailyGoal))}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black">{Math.min(100, Math.round((completedToday / dailyGoal) * 100))}%</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Complete</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Today's Mission</h3>
                <p className="text-gray-500 text-sm mb-6">You've completed {completedToday} out of {dailyGoal} chapters planned for today.</p>
                
                {isEditingGoal ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex flex-col items-center gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Set New Goal (Chapters)</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={tempGoal}
                        onChange={(e) => setTempGoal(parseInt(e.target.value) || 1)}
                        className="w-24 text-center text-3xl font-black bg-gray-50 border-2 border-blue-100 rounded-2xl py-2 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsEditingGoal(false)}
                        className="flex-1 bg-white border-2 border-gray-100 py-3 rounded-xl font-bold hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          setDailyGoal(tempGoal);
                          setIsEditingGoal(false);
                        }}
                        className="flex-1 bg-[#3F51B5] text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-100"
                      >
                        Save Goal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setTempGoal(dailyGoal);
                        setIsEditingGoal(true);
                      }}
                      className="flex-1 bg-white border-2 border-gray-100 py-3 rounded-xl font-bold hover:bg-gray-50"
                    >
                      Edit Goal
                    </button>
                    <button 
                      onClick={() => {
                        setTempGoal(Math.min(20, dailyGoal + 1));
                        setIsEditingGoal(true);
                      }}
                      className="flex-1 bg-[#3F51B5] text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-100"
                    >
                      Set New
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'bookmarks' && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="px-2">
                <h2 className="text-2xl font-black text-[#3F51B5] uppercase tracking-tighter">Bookmarks</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Questions you've saved for review</p>
              </div>

              {bookmarks.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl text-center shadow-sm">
                   <div className="w-16 h-16 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bookmark size={32} />
                   </div>
                   <h3 className="font-bold text-gray-800">No bookmarks yet</h3>
                   <p className="text-xs text-gray-400 mt-2">Questions you bookmark during quizzes will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookmarks.map((q, idx) => (
                    <motion.div 
                      layout
                      key={idx} 
                      className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative group overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 p-4">
                          <button 
                            onClick={() => setBookmarks(prev => prev.filter(b => b.text !== q.text))}
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                       
                       <div className="inline-block px-2 py-0.5 rounded bg-blue-50 text-[#3F51B5] text-[9px] font-black uppercase tracking-widest mb-3">
                          {q.subject}
                       </div>
                       
                       <h3 className="font-bold text-gray-800 leading-tight pr-8 mb-4">
                          {q.text}
                       </h3>
                       
                       <div className="grid grid-cols-1 gap-2 mb-4">
                          {q.options.map((opt: string, i: number) => (
                             <div 
                               key={i} 
                               className={`p-3 rounded-xl text-sm ${i === q.correct ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-500'}`}
                             >
                                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                                {opt}
                             </div>
                          ))}
                       </div>
                       
                       {q.explanation && (
                          <div className="p-3 bg-indigo-50/50 rounded-2xl">
                             <p className="text-[10px] font-black text-[#3F51B5] uppercase tracking-widest mb-1">Expert Insight</p>
                             <p className="text-xs text-gray-600 leading-relaxed italic">{q.explanation}</p>
                          </div>
                       )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'syllabus', icon: BookOpen, label: 'Lessons' },
          { id: 'quiz', icon: GraduationCap, label: 'Quiz' },
          { id: 'achievements', icon: Trophy, label: 'Wins' },
          { id: 'strength', icon: BarChart2, label: 'Map' },
          { id: 'goal', icon: Target, label: 'Goal' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setQuizState(null); }}
            className={`flex flex-col items-center gap-1 min-w-[64px] transition-all ${
              activeTab === tab.id ? 'text-[#3F51B5]' : 'text-gray-400'
            }`}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`p-1 ${activeTab === tab.id ? 'bg-blue-50 rounded-xl' : ''}`}
            >
              <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

