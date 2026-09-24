// services/gradeService.js
// Pure functions for turning marks into a percentage/grade.
// Kept separate from the controller so the grading scale can be changed in one place.
 
/**
 * Converts marksObtained/maxMarks into a percentage and letter grade.
 * Adjust the cutoffs below to match your institution's grading policy.
 */
function calculateGrade(marksObtained, maxMarks) {
  const percentage = (marksObtained / maxMarks) * 100;
 
  let grade;
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  else grade = 'F';
 
  return { percentage: Number(percentage.toFixed(2)), grade };
}
 
/**
 * Aggregates multiple subject-wise Marks rows (for one student, one semester)
 * into an overall semester result.
 */
function calculateSemesterResult(marksRows) {
  if (!marksRows.length) {
    return { totalObtained: 0, totalMax: 0, percentage: 0, grade: 'N/A' };
  }
 
  const totalObtained = marksRows.reduce((sum, m) => sum + m.marksObtained, 0);
  const totalMax = marksRows.reduce((sum, m) => sum + m.maxMarks, 0);
  const { percentage, grade } = calculateGrade(totalObtained, totalMax);
 
  return { totalObtained, totalMax, percentage, grade };
}
 
module.exports = { calculateGrade, calculateSemesterResult };