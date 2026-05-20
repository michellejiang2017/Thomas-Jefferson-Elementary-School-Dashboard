import { useEffect, useState } from "react";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import { eventsCollection } from "../services/firestore";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

function ClassDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" fontWeight="bold">
        Classes Dashboard
      </Typography>
    </Box>
  );
}

export default ClassDashboard;