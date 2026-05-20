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

function classDashboard() {
    return (
        <h1>Classes Dashboard</h1>
    )
}

export default classDashboard; 