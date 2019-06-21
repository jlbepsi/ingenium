import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {Typography} from "@material-ui/core";
import ButtonStyled from "./ButtonStyled";

function DialogDelete(props) {

  const { onClose, onActionValidate, title, ...other } = props;

  function handleAction () {
    onActionValidate();
  }

  function handleClose () {
    onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      {...other}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          {props.children}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Annuler
        </Button>

        <ButtonStyled
          text='Supprimer'
          variant={"error"}
          onClick={handleAction}
        />

      </DialogActions>
    </Dialog>
  );
}

DialogDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  onActionValidate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default DialogDelete;