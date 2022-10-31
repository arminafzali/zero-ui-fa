import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Divider,
  Grid,
  Typography,
  TextField,
  Select,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ManagedRoutes from "./components/ManagedRoutes";
import IPv4AutoAssign from "./components/IPv4AutoAssign";

import API from "utils/API";
import { parseValue, replaceValue, setValue } from "utils/ChangeHelper";
import { checkfa } from "utils/checkfa";

function NetworkSettings({ network, setNetwork }) {
  const sendReq = async (data) => {
    try {
      const req = await API.post("/network/" + network["config"]["id"], data);
      console.log("Action", req);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange =
    (key1, key2, mode = "text", additionalData = null) =>
    (event) => {
      const value = parseValue(event, mode, additionalData);

      let updatedNetwork = replaceValue({ ...network }, key1, key2, value);
      setNetwork(updatedNetwork);

      let data = setValue({}, key1, key2, value);

      sendReq(data);
    };

  return (
    <Accordion style={{ direction: checkfa && "rtl" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{checkfa ? "تنظیمات کلی" : "General settings"}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography>{checkfa ? "شناسه شبکه" : "Network ID"}</Typography>
            <Typography variant="h5">
              <span>{network["config"]["id"]}</span>
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              value={network["config"]["name"]}
              onChange={handleChange("config", "name")}
              label={checkfa ? "نام" : "Name"}
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={network["description"]}
              onChange={handleChange("description")}
              multiline
              minRows={2}
              maxRows={Infinity}
              label={checkfa ? "توضیحات" : "Description"}
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Divider />
          <Grid item>
            <Typography>
              {checkfa ? "کنترل دسترسی" : "Access Control"}
            </Typography>
            <Select
              native
              value={network["config"]["private"]}
              onChange={handleChange("config", "private", "json")}
            >
              <option value={true}>{checkfa ? "خصوصی" : "Private"}</option>
              <option value={false}>{checkfa ? "عمومی" : "Public"}</option>
            </Select>
          </Grid>
          <Divider />
          <Grid item>
            <ManagedRoutes
              routes={network["config"]["routes"]}
              handleChange={handleChange}
            />
          </Grid>
          <Divider />
          <Grid item>
            <IPv4AutoAssign
              ipAssignmentPools={network["config"]["ipAssignmentPools"]}
              handleChange={handleChange}
            />
          </Grid>
          {/* TODO: */}
          {/* <Grid item>
            <Typography>IPv6 Auto-Assign</Typography>
          </Grid> */}
          <Divider />
          <Grid item>
            <TextField
              label={
                checkfa ? "محدودیت گیرنده چندپخشی" : "Multicast Recipient Limit"
              }
              type="number"
              value={network["config"]["multicastLimit"]}
              onChange={handleChange("config", "multicastLimit", "json")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Checkbox
              checked={network["config"]["enableBroadcast"]}
              color="primary"
              onChange={handleChange("config", "enableBroadcast", "checkbox")}
            />
            <span>{checkfa ? "فعال کردن پخش" : "Enable Broadcast"}</span>
          </Grid>
          {/* TODO: */}
          {/* <Grid item>
            <Typography>DNS</Typography>
          </Grid> */}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default NetworkSettings;
