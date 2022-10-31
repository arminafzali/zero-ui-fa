import { useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import API from "utils/API";
import { checkfa } from "utils/checkfa";

function DeleteMember({ nwid, mid, callback }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteMemberReq = async () => {
    const req = await API.delete("/network/" + nwid + "/member/" + mid);
    console.log("Action:", req);
    setOpen(false);
    callback();
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen}>
        <DeleteOutlineIcon color="secondary" style={{ fontSize: 20 }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {checkfa
            ? "مطمئن هستید که میخواهید این کاربر را حذف کنید؟"
            : "Are you sure you want to delete this member?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {checkfa
              ? "این عمل قابل بازیابی نیست."
              : "This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {checkfa ? "انصراف" : "Cancel"}
          </Button>
          <Button onClick={deleteMemberReq} color="secondary">
            {checkfa ? "حذف" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteMember;
