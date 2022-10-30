import { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useLocalStorage } from "react-use";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { checkfa } from "utils/checkfa";

function HomeLoggedOut() {
  const [, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [, setToken] = useLocalStorage("token", null);
  const [, setDisableAuth] = useLocalStorage("disableAuth", false);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/auth/login", { withCredentials: true })
        .then(function (response) {
          if (!response.data.enabled) {
            setLoggedIn(true);
            setDisableAuth(true);
            setToken("");
            history.go(0);
          } else {
            setDisableAuth(false);
          }
        });
    }
    fetchData();
  }, [history, setDisableAuth, setLoggedIn, setToken]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: "50vh",
      }}
    >
      <Grid item xs={10}>
        <Typography style={{ direction: checkfa && "rtl" }} variant="h5">
          <span style={{ direction: checkfa && "rtl" }}>
            {checkfa
              ? "ZeroUI - یک رابط کاربری برای استفاده از zero-tier است"
              : `ZeroUI - ZeroTier Controller Web UI - is a web user interface for a
              self-hosted ZeroTier network controller.`}
          </span>
        </Typography>

        <Typography style={{ direction: checkfa && "rtl" }}>
          <span>
            {checkfa
              ? "لطفا برای ادامه ورود کنید"
              : "Please Log In to continue"}
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default HomeLoggedOut;
