import { collection, doc, updateDoc, addDoc, deleteDoc, getDocs, query, where, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const studentsCollection = collection(db, "students");
export const teachersCollection = collection(db, "teachers");
export const classesCollection = collection(db, "classes");
export const eventsCollection = collection(db, "events");

// ==================== GRADE MANAGEMENT ====================

/**
 * Update a student's subject grade and recalculate the class average
 * @param {string} studentId - The student document ID
 * @param {string} subject - Subject name ("math" or "english")
 * @param {number} gradeValue - Grade value (0-100)
 */
export async function updateStudentGrade(studentId, subject, gradeValue) {
  try {
    const studentDocRef = doc(db, "students", studentId);
    const gradeField = `${subject}Grade`;

    // Update student grade
    await updateDoc(studentDocRef, {
      [gradeField]: gradeValue,
    });

    // Get the student document to find their class
    const studentDoc = await getDoc(studentDocRef);
    if (!studentDoc.exists()) throw new Error("Student not found");

    const studentData = studentDoc.data();
    const classIds = studentData.classIds || [];

    // Recalculate average grade for each class the student is in
    for (const classId of classIds) {
      await recalculateClassAverage(classId);
    }
  } catch (error) {
    console.error("Error updating student grade:", error);
    throw error;
  }
}

/**
 * Recalculate and update the average grade for a class
 * @param {string} classId - The class document ID
 */
export async function recalculateClassAverage(classId) {
  try {
    const classDocRef = doc(db, "classes", classId);
    const classDoc = await getDoc(classDocRef);

    if (!classDoc.exists()) throw new Error("Class not found");

    const classData = classDoc.data();
    const studentIds = classData.studentIds || [];

    if (studentIds.length === 0) {
      await updateDoc(classDocRef, { averageGrade: 0 });
      return;
    }

    // Fetch all students in the class
    const studentsSnapshot = await getDocs(collection(db, "students"));
    const classStudents = studentsSnapshot.docs
      .filter((doc) => studentIds.includes(doc.id))
      .map((doc) => doc.data());

    // Calculate average of all non-null subject grades (math + english)
    const allGrades = [];
    classStudents.forEach((student) => {
      if (student.mathGrade !== null && student.mathGrade !== undefined) {
        allGrades.push(student.mathGrade);
      }
      if (student.englishGrade !== null && student.englishGrade !== undefined) {
        allGrades.push(student.englishGrade);
      }
    });

    const averageGrade = allGrades.length > 0 ? Math.round(allGrades.reduce((a, b) => a + b, 0) / allGrades.length) : 0;

    // Update class average
    await updateDoc(classDocRef, { averageGrade });
  } catch (error) {
    console.error("Error recalculating class average:", error);
    throw error;
  }
}

// ==================== CLASS CRUD ====================

/**
 * Add a new class
 * @param {object} classData - Class data { name, gradeLevel, teacherId, studentIds }
 * @returns {string} - The new class document ID
 */
export async function addClass(classData) {
  try {
    const docRef = await addDoc(classesCollection, {
      ...classData,
      averageGrade: 0,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
}

/**
 * Update an existing class
 * @param {string} classId - The class document ID
 * @param {object} classData - Updated class data
 */
export async function updateClass(classId, classData) {
  try {
    const classDocRef = doc(db, "classes", classId);
    await updateDoc(classDocRef, classData);
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
}

/**
 * Delete a class
 * @param {string} classId - The class document ID
 */
export async function deleteClass(classId) {
  try {
    const classDocRef = doc(db, "classes", classId);
    await deleteDoc(classDocRef);
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
}

/**
 * Get all students in a class
 * @param {string} classId - The class document ID
 * @returns {array} - Array of student documents
 */
export async function getStudentsByClassId(classId) {
  try {
    const classDocRef = doc(db, "classes", classId);
    const classDoc = await getDoc(classDocRef);

    if (!classDoc.exists()) throw new Error("Class not found");

    const classData = classDoc.data();
    const studentIds = classData.studentIds || [];

    if (studentIds.length === 0) return [];

    const studentsSnapshot = await getDocs(studentsCollection);
    return studentsSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((student) => studentIds.includes(student.id));
  } catch (error) {
    console.error("Error fetching students by class:", error);
    throw error;
  }
}