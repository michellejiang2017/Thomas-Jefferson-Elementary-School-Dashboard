import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Button, Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClassCrudModal from "../components/ClassCrudModal";
import { deleteClass } from "../services/firestore";

export default function ClassesDashboard() {
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch classes on mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "classes"));
      const classList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setClasses(classList);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleAddClick = () => {
    setEditingClass(null);
    setModalOpen(true);
  };

  const handleEditClick = (classItem) => {
    setEditingClass(classItem);
    setModalOpen(true);
  };

  const handleDeleteClick = (classItem) => {
    setDeleteConfirm(classItem);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    setLoading(true);
    try {
      await deleteClass(deleteConfirm.id);
      await fetchClasses();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting class:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSuccess = () => {
    fetchClasses();
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Classes Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1f2937" }}
          onClick={handleAddClick}
        >
          Add Class
        </Button>
      </Box>

      {classes.length === 0 ? (
        <Typography color="text.secondary">
          No classes in Firebase yet. Click "Add Class" to create one.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
            gap: 2,
            mt: 2,
          }}
        >
          {classes.map((classItem) => (
            <Card key={classItem.id} variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {classItem.name || "Unnamed class"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Grade level: {classItem.gradeLevel ?? "—"}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Average grade: {classItem.averageGrade ?? "—"}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    size="small"
                    variant="contained"
                    component={Link}
                    to={`/class/${classItem.id}`}
                    sx={{ backgroundColor: "#1f2937" }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    component={Link}
                    to={`/math-home/${classItem.id}`}
                  >
                    Math
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    component={Link}
                    to={`/english-home/${classItem.id}`}
                  >
                    English
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(classItem)}
                    sx={{ color: "#1f2937" }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(classItem)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <ClassCrudModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
        editingClass={editingClass}
      />

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Delete Class</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{deleteConfirm?.name}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
