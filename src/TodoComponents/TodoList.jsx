//MODULES
import { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import CardTodo from "./Todo";
import { ContextProvider, usedispatch } from "./context/context";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

//function
export default function TodoList() {
  const [input, setinput] = useState({ Title: "", Dateils: "" });
  const { reRenderTodoTitle, messageShow, ERmessageShow } =
    useContext(ContextProvider);
  const [OpenE, setOpenE] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [dialogId, setdialogId] = useState(null);
  const [inputEdit, setinputEdit] = useState({
    title: "",
    datails: "",
  });
  const dispatch = usedispatch();

  //get form localStorage
  useEffect(() => {
    dispatch({ type: "getload" });
  }, []);
  //===get form localStorage====

  //Create NEWOB
  const valueTodo = () => {
    if (input.Title == "") {
      ERmessageShow("you need to fill out the Title to create New Task");
      return;
    }
    if (input.Title.length <= 3) {
      ERmessageShow("letters should more then 3 to create New Task");
      return;
    }
    dispatch({
      type: "Add",
      payload: { title: input.Title, dateils: input.Dateils },
    });

    setinput({ Title: "", Dateils: "" });
    messageShow("success Added Task");
  };
  //===Create NEWOB===

  const Todolist = reRenderTodoTitle.map((Tod) => {
    return (
      <CardTodo
        key={Tod.id}
        todos={Tod}
        EditDialog={showeditdialog}
        deletDialog={showdeletdialog}
      />
    );
  });

  //function (edit)
  function showeditdialog(todos) {
    setdialogId(todos);
    setinputEdit({
      title: todos.title,
      datails: todos.datails,
    });
    setOpenE(true);
  }

  function CloseDialogE() {
    setOpenE(false);
  }

  function EditElement() {
    dispatch({
      type: "Edit",
      payload: {
        dialog: dialogId,
        title: inputEdit.title,
        datails: inputEdit.datails,
      },
    });
    setOpenE(false);
    messageShow("Edit success");
  }
  //===function (edit)===

  //function (delet)
  function showdeletdialog(todos) {
    setdialogId(todos);
    setOpenD(true);
  }

  function CloseDialogD() {
    setOpenD(false);
  }

  function deletelement() {
    dispatch({ type: "delet", payload: { dialog: dialogId } });
    setOpenD(false);
    messageShow("success delet");
  }
  //===function (delet)===

  return (
    <>
      {/* EDIT */}
      <Dialog open={OpenE} onClose={CloseDialogE}>
        <DialogContent>
          <DialogContentText>
            Editing will modify the original data. Make sure to save your
            changes when done.
          </DialogContentText>
          <form>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={inputEdit.title}
              onChange={(e) =>
                setinputEdit({ ...inputEdit, title: e.target.value })
              }
              onKeyUp={(e) => e.key === "Enter" && EditElement()}
            />
          </form>
          <form>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="dateils"
              label="Dateils"
              type="text"
              fullWidth
              variant="standard"
              value={inputEdit.datails}
              onChange={(e) =>
                setinputEdit({ ...inputEdit, datails: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseDialogE}>Cancel</Button>
          <Button onClick={EditElement}>Edit</Button>
        </DialogActions>
      </Dialog>
      {/* ==EDIT== */}

      {/* DELET */}
      <Dialog
        open={openD}
        onClose={CloseDialogD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure delet this Item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Last chance! This will permanently delete this item forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseDialogD}>Disagree</Button>
          <Button onClick={deletelement}>Agree</Button>
        </DialogActions>
      </Dialog>
      {/* ==DELET== */}
      <Card
        sx={{
          background: "linear-gradient(135deg, #424242, #9e9e9e)",
          borderRadius: "13px",
          maxHeight: "50vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "7px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(126, 120, 120, 8)",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(255,255,255,0.5)",
          },
        }}
      >
        <div>{Todolist}</div>
      </Card>
      <Card
        sx={{
          margin: "5px 0px",
          background: "linear-gradient(135deg, #424242, #9e9e9e)",
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <Button sx={{ margin: "6px" }} onClick={valueTodo}>
          Add
        </Button>

        <TextField
          sx={{ width: "35%" }}
          id="standard-basic"
          label="Title"
          variant="standard"
          value={input.Title}
          onChange={(e) => setinput({ ...input, Title: e.target.value })}
          onKeyUp={(e) => e.key === "Enter" && valueTodo()}
        />

        <TextField
          sx={{ width: "35%" }}
          id="standard-basic"
          label="Dateils"
          variant="standard"
          value={input.Dateils}
          onChange={(e) => setinput({ ...input, Dateils: e.target.value })}
          onKeyUp={(e) => e.key === "Enter" && valueTodo()}
        />
      </Card>
    </>
  );
}
