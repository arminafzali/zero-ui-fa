import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

import API from "utils/API";
import { checkfa } from "utils/checkfa";

function NetworkManagement() {
  const { nwid } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendDelReq = async () => {
    const req = await API.delete("/network/" + nwid);
    console.log("Action:", req);
  };

  const deleteNetwork = async () => {
    await sendDelReq();
    history.push("/");
    history.go(0);
  };

  return (
    <Accordion style={{ direction: checkfa && "rtl" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{checkfa ? "مدیریت" : "Management"}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          {checkfa ? "حذف شبکه" : " Delete Network"}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {"Are you sure you want to delete this network?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteNetwork} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  );
}

export default NetworkManagement;
