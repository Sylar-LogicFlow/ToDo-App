//MODULES
import { useContext } from "react";
import { ContextProvider, usedispatch } from "./context/context";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditSquareIcon from "@mui/icons-material/EditSquare";

//function
export default function CardTodo({ todos, EditDialog, deletDialog }) {
  const { messageShow } = useContext(ContextProvider);
  const dispatch = usedispatch();

  //checking
  function CheckElement() {
    dispatch({ type: "Check", payload: { todo: todos } });
    if (todos.iscompleted) {
      messageShow("success removed from passed");
    } else {
      messageShow("passed success");
    }
  }
  //===checking===

  //Edit
  function EditElement() {
    EditDialog(todos);
  }
  //===Edit===

  //Delet
  function deletElement() {
    deletDialog(todos);
  }
  //===Delet===

  return (
    <Card
      sx={{
        minWidth: 275,
        background: "linear-gradient(135deg, #424242, #9e9e9e)",
        textDecoration: todos.iscompleted ? "line-through" : "none",
        width: "100%",
        borderRadius: "15px",
      }}
    >
      <CardContent
        sx={{
          background: "linear-gradient(65deg, #2d2130ff,#4e4650ff, #2d2130ff)",
          marginBottom: "8px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          width: "94%",
          "&:hover": {
            background: "#6d6a6aff",
            transition: "0.4s",
            padding: "19px",
            cursor: "pointer",
          },
        }}
      >
        {/* Typography title and Dateils */}
        <div style={{ width: "63%", wordWrap: "break-word", flexWrap: "wrap" }}>
          <Typography variant="h5" component="div">
            {todos.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 18 }}>
            {todos.datails}
          </Typography>
        </div>
        {/* ===Typography title and Dateils=== */}

        {/* Icons buttons */}
        <div
          style={{ width: "40%", display: "flex", justifyContent: "center" }}
        >
          <IconButton
            aria-label="Add"
            onClick={() => {
              CheckElement();
            }}
          >
            <AddCircleIcon
              sx={{
                background: todos.iscompleted ? "green" : "white",
                padding: "4px",
                borderRadius: "25px",
                border: "2px solid green",
                color: todos.iscompleted ? "white" : "green",
              }}
            />
          </IconButton>

          <IconButton
            aria-label="edit"
            onClick={() => {
              EditElement();
            }}
          >
            <EditSquareIcon
              sx={{
                background: "white",
                padding: "4px",
                borderRadius: "25px",
                border: "2px solid gray",
                color: "gray",
              }}
            />
          </IconButton>

          <IconButton
            aria-label="delete"
            onClick={() => {
              deletElement();
            }}
          >
            <DeleteIcon
              sx={{
                background: "white",
                padding: "4px",
                borderRadius: "25px",
                border: "2px solid red",
                color: "red",
              }}
            />
          </IconButton>
        </div>
        {/* ===Icons buttons=== */}
      </CardContent>
    </Card>
  );
}
