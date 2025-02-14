import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";

import axios from "axios";
import { checkfa } from "utils/checkfa";

function LogInUser() {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [, setToken] = useLocalStorage("token", null);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSnackbarOpen(false);
  };

  const handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === "Enter") {
      LogIn();
    }
  };

  const LogIn = () => {
    if (!username || !password) {
      return;
    }

    axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        setLoggedIn(true);
        setToken(response.data.token);
        handleClose();
        history.go(0);
      })
      .catch(function (error) {
        setPassword("");
        setSnackbarOpen(true);
        console.error(error);
      });
  };

  return (
    <>
      <Button onClick={handleClickOpen} color="primary" variant="contained">
        {localStorage.getItem("lang") === "fa" ? "ورود" : "Log In"}
      </Button>
      <Dialog open={open} onClose={handleClose} onKeyPress={handleKeyPress}>
        <DialogTitle>{checkfa ? "ورود" : "Log In"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            margin="dense"
            label={checkfa ? "نام کاربری" : "username"}
            type="username"
            fullWidth
          />
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            margin="dense"
            label={checkfa ? "رمز عبور" : "password"}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {checkfa ? "انصراف" : "Cancel"}
          </Button>
          <Button onClick={LogIn} color="primary">
            {checkfa ? "ورود" : "Log In"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        message={
          checkfa
            ? "نام کاربری یا رمز عبور نادرست است"
            : "Invalid username or password"
        }
      />
    </>
  );
}

export default LogInUser;
