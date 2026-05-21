import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { addClass, updateClass } from "../services/firestore";

export default function ClassCrudModal({ open, onClose, onSuccess, editingClass }) {
  const [formData, setFormData] = useState({
    name: "",
    gradeLevel: "",
    teacherId: "",
    studentIds: [],
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch teachers on mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "teachers"));
        const teachersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(teachersList);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (editingClass) {
      setFormData({
        name: editingClass.name || "",
        gradeLevel: editingClass.gradeLevel || "",
        teacherId: editingClass.teacherId || "",
        studentIds: editingClass.studentIds || [],
      });
    } else {
      setFormData({
        name: "",
        gradeLevel: "",
        teacherId: "",
        studentIds: [],
      });
    }
    setError(null);
  }, [editingClass, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gradeLevel" ? parseInt(value) || "" : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("Class name is required");
      return;
    }
    if (!formData.gradeLevel) {
      setError("Grade level is required");
      return;
    }

    setLoading(true);
    try {
      if (editingClass) {
        // Update existing class
        await updateClass(editingClass.id, {
          name: formData.name,
          gradeLevel: formData.gradeLevel,
          teacherId: formData.teacherId || null,
        });
      } else {
        // Add new class
        await addClass({
          name: formData.name,
          gradeLevel: formData.gradeLevel,
          teacherId: formData.teacherId || null,
          studentIds: [],
        });
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error saving class:", err);
      setError(err.message || "Error saving class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingClass ? "Edit Class" : "Add New Class"}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {error && (
            <Box sx={{ color: "red", fontSize: "0.875rem" }}>
              {error}
            </Box>
          )}
          <TextField
            label="Class Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            placeholder="e.g., Grade 3 Math"
          />
          <FormControl fullWidth>
            <InputLabel>Grade Level</InputLabel>
            <Select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              label="Grade Level"
            >
              <MenuItem value="">Select grade level</MenuItem>
              <MenuItem value={1}>1st Grade</MenuItem>
              <MenuItem value={2}>2nd Grade</MenuItem>
              <MenuItem value={3}>3rd Grade</MenuItem>
              <MenuItem value={4}>4th Grade</MenuItem>
              <MenuItem value={5}>5th Grade</MenuItem>
              <MenuItem value={6}>6th Grade</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Teacher (Optional)</InputLabel>
            <Select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              label="Teacher (Optional)"
            >
              <MenuItem value="">None</MenuItem>
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
