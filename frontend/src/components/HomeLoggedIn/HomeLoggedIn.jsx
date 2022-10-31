import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Divider,
  Button,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  Hidden,
} from "@material-ui/core";
import useStyles from "./HomeLoggedIn.styles";

import NetworkButton from "./components/NetworkButton";

import API from "utils/API";
import { generateNetworkConfig } from "utils/NetworkConfig";
import { checkfa } from "utils/checkfa";

function HomeLoggedIn() {
  const [networks, setNetworks] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  const createNetwork = async () => {
    const network = await API.post("network", generateNetworkConfig());
    console.log(network);
    history.push("/network/" + network.data["config"]["id"]);
  };

  useEffect(() => {
    async function fetchData() {
      const networks = await API.get("network");
      setNetworks(networks.data);
      console.log("Networks:", networks.data);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root} style={{ direction: checkfa && "rtl" }}>
      <Button
        variant="contained"
        color="primary"
        className={classes.createBtn}
        onClick={createNetwork}
      >
        {checkfa ? "ساخت شبکه جدید" : "Create A Network"}
      </Button>
      <Divider />
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={6}>
          <Typography variant="h5">
            {checkfa ? "شبکه های کنترلر" : "Controller networks"}
          </Typography>
          {networks[0] &&
            (checkfa ? "آدرس کنترلر شبکه" : "Network controller address")}
          <Box fontWeight="fontWeightBold">
            {networks[0] && networks[0]["id"].slice(0, 10)}
          </Box>
        </Grid>
        <Grid item xs="auto">
          <Typography>{checkfa ? "شبکه ها" : "Networks"}</Typography>
          <Grid item>
            {networks[0] ? (
              <>
                <div className="netBtn" role="button">
                  <List
                    className={classes.flexContainer}
                    style={{ display: "flex" }}
                  >
                    <ListItem className={classes.nwid}>
                      {" "}
                      {checkfa ? "شناسه شبکه" : "id"}
                    </ListItem>
                    <ListItem className={classes.name}>
                      {checkfa ? "نام شبکه" : "name"}
                    </ListItem>
                    <Hidden mdDown>
                      <ListItem className={classes.cidr}>
                        {checkfa ? "آدرس" : "address"}
                      </ListItem>
                    </Hidden>
                  </List>
                </div>
                {networks.map((network) => (
                  <Grid key={network["id"]} item>
                    <NetworkButton network={network} />
                  </Grid>
                ))}
              </>
            ) : (
              <div>
                {checkfa
                  ? "لطفا حداقل یک شبکه بسازید"
                  : "Please create at least one network"}
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeLoggedIn;
