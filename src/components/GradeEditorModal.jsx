import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { updateStudentGrade } from "../services/firestore";

export default function GradeEditorModal({ open, onClose, student, subject, onSuccess }) {
  const [grade, setGrade] = useState(student?.[`${subject}Grade`] || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    const gradeValue = parseInt(grade);

    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
      setError("Grade must be a number between 0 and 100");
      return;
    }

    setLoading(true);
    try {
      await updateStudentGrade(student.id, subject, gradeValue);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating grade:", err);
      setError(err.message || "Error saving grade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit {subject.charAt(0).toUpperCase() + subject.slice(1)} Grade</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box>
          <Box sx={{ mb: 2 }}>
            <strong>Student:</strong> {student?.firstName} {student?.lastName}
          </Box>
          {error && (
            <Box sx={{ color: "red", fontSize: "0.875rem", mb: 2 }}>
              {error}
            </Box>
          )}
          <TextField
            label="Grade (0-100)"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            fullWidth
            autoFocus
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
