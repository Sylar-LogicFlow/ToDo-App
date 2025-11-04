//MODULS
import Container from "@mui/material/Container";
import Header from "./TodoComponents/Header.jSx";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TodoList from "./TodoComponents/TodoList";

import { v4 as uidV } from "uuid";
import {
  ContextProvider,
  useTodos,
  usedispatch,
} from "./TodoComponents/context/context";
import { useState, useMemo, useEffect } from "react";

import CustomizedSnackbars from "./TodoComponents/showmessage";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

//FUNCTOINS
function AppContent() {
  const [displayswitch, setdisplayswitch] = useState("all");
  const [messageS, setmessageS] = useState("");
  const [OpenS, setOpenS] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [OpenER, setOpenSER] = useState(false);
  const [open, setopen] = useState(false);
  const Todos = useTodos();
  const dispatch = usedispatch();

  const completed = useMemo(() => {
    return Todos.filter((t) => {
      return t.iscompleted;
    });
  }, [Todos]);

  const notcompleted = useMemo(() => {
    return Todos.filter((t) => {
      return !t.iscompleted;
    });
  }, [Todos]);

  //get form localStorage
  useEffect(() => {
    dispatch({ type: "getload" });
  }, []);
  //===get form localStorage===

  const showbutton = useMemo(() => {
    return Todos.length > 4;
  }, [Todos]);

  const ShBton = () => {
    if (displayswitch === "all") {
      return (
        showbutton && (
          <Button
            sx={{ fontSize: "14px" }}
            color="secondary"
            onClick={() => {
              OpenDialogRemoveTodos();
            }}
          >
            Remove All Todos
          </Button>
        )
      );
    } else {
      return;
    }
  };

  //Switching completed
  let reRenderTodoTitle = Todos;
  if (displayswitch == "passed") {
    reRenderTodoTitle = completed;
  } else if (displayswitch == "Dosent passed") {
    reRenderTodoTitle = notcompleted;
  } else {
    reRenderTodoTitle = Todos;
  }
  //===Switching completed===

  //messageshow
  function messageShow(messageS) {
    setmessageS(messageS);
    setOpenS(true);
    setTimeout(() => {
      setOpenS(false);
    }, 2500);
  }

  function ERmessageShow(errormessage) {
    seterrormessage(errormessage);
    setOpenSER(true);
    setTimeout(() => {
      setOpenSER(false);
    }, 2500);
  }
  //===messageshow===

  //THIS FUNCTION FOR REMOVE ALL TODOS
  function OpenDialogRemoveTodos() {
    setopen(true);
  }

  function REMOVETODOS() {
    dispatch({ type: "Removeall" });
    setopen(false);
  }

  function CloseDialogRemoveTodos() {
    setopen(false);
  }
  //===THIS FUNCTION FOR REMOVE ALL TODOS===

  return (
    <>
      <Dialog
        open={open}
        onClose={CloseDialogRemoveTodos}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure delet All todo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            you'll delet All todo forever. and you cant get this agian.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseDialogRemoveTodos}>Disagree</Button>
          <Button onClick={REMOVETODOS}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Header />
      <ContextProvider.Provider
        value={{
          reRenderTodoTitle,
          messageShow,
          ERmessageShow,
        }}
      >
        <div
          style={{
            minHeight: "80vh",
            marginTop: "10px",
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              background: "linear-gradient(135deg, #424242, #9e9e9e, #757575)",
              borderRadius: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <header>
                <h1>Tasks</h1>
              </header>
              <ToggleButtonGroup
                color="primary"
                exclusive
                aria-label="Platform"
                sx={{ borderRadius: "20px" }}
                value={displayswitch}
                onChange={(e) => setdisplayswitch(e.target.value)}
              >
                <ToggleButton value="all">All Tasks</ToggleButton>
                <ToggleButton value="passed">passed</ToggleButton>
                <ToggleButton value="Dosent passed">dosent passed</ToggleButton>
              </ToggleButtonGroup>
              <hr style={{ margin: "10px" }} />
              <ShBton />
            </div>
            {/* showmessage  */}
            <CustomizedSnackbars
              messageS={messageS}
              openS={OpenS}
              ERmessage={errormessage}
              openER={OpenER}
            />
            {/* ===showmessage===  */}
            <TodoList />
          </Container>
        </div>
      </ContextProvider.Provider>
    </>
  );
}

export default AppContent;

