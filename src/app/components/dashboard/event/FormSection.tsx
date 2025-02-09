import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

export interface Question {
  id: string;
  label: string;
  placeholder: string;
  inputType: "text" | "shortAnswer" | "multipleChoice";
}

const FormSection: React.FC = () => {
  const { eventRole, setEventRole } = useStore(useEventStore);
  const [questions, setQuestions] = useState<Question[]>([
    { id: "question1", label: "Question 1", placeholder: "Enter your question", inputType: "text" },
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState<"text" | "shortAnswer" | "multipleChoice">("text");
  const [newQuestionLabel, setNewQuestionLabel] = useState("");

  // Open dropdown menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open dialog for configuring the new question
  const handleSelectQuestionType = (type: "text" | "shortAnswer" | "multipleChoice") => {
    setNewQuestionType(type);
    setDialogOpen(true);
    handleMenuClose();
  };

  // Add the new question to the list
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `question${questions.length + 1}`,
      label: newQuestionLabel || `Question ${questions.length + 1}`,
      placeholder: "Enter your answer",
      inputType: newQuestionType,
    };
    setQuestions([...questions, newQuestion]);
    setEventRole({
      ...eventRole,
      questions: questions
    });
    setDialogOpen(false);
    setNewQuestionLabel("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        marginTop: 6,
        marginLeft: 2,
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        width: "768px",
        maxWidth: "100%",
      }}
    >
      <Typography variant="h4" sx={{ pb: 2, color: "#977342", fontWeight: "bold" }}>
        Application Questions
      </Typography>
      <form style={{ width: "100%" }}>
        {questions.map((question) => (
          <Box key={question.id} sx={{ pb: 3, width: "100%" }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold", color: "black" }}>
              {question.label}
            </Typography>
            <TextField
              id={question.id}
              placeholder={question.placeholder}
              variant="outlined"
              fullWidth
              sx={{ mb: 2, color: "black", fontWeight: "bold" }}
              inputProps={{ "aria-label": question.label }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                backgroundColor: "white",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body2" sx={{ color: "black", fontWeight: "bold" }}>
                {question.inputType === "text"
                  ? "Open-Ended"
                  : question.inputType === "shortAnswer"
                  ? "Short Answer"
                  : "Multiple Choice"}
              </Typography>
            </Box>
          </Box>
        ))}
        <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#977342",
              border: "none",
              "&:hover": {
                borderColor: "#CEAB76",
                color: "white",
              },
            }}
          >
            Add Another Question
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleSelectQuestionType("text")}>Open-Ended</MenuItem>
            <MenuItem onClick={() => handleSelectQuestionType("shortAnswer")}>Short Answer</MenuItem>
            <MenuItem onClick={() => handleSelectQuestionType("multipleChoice")}>Multiple Choice</MenuItem>
          </Menu>
        </Box>
      </form>

      {/* Dialog for configuring the new question */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question Label"
            value={newQuestionLabel}
            onChange={(e) => setNewQuestionLabel(e.target.value)}
            placeholder="Enter the question label"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddQuestion} color="primary">
            Add Question
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormSection;