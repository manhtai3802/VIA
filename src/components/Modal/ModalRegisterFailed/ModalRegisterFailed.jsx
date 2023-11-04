/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import IconRegisterFailed from "../../../assets/icon_register_failed.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  img: {
    display: "flex",
    justifyContent: "center",
  },

  title: {
    color: "red",
    display: "flex",
    justifyContent: "center",
  },

  textDescription: {
    textAlign: "center",
  },

  btn: {
    display: "flex !important",
    justifyContent: "center !important",
    marginBottom: "10px",
  },

  btnGreen: {
    backgroundColor: "#0b8147 !important",
    color: "white !important",
  },
  btnGrey: {
    backgroundColor: "#b6c1bc !important",
    color: "white !important",
  },
}));

export default function ModalRegisterFailed({ open, onClose }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
        <DialogContent className={classes.img}>
          <img src={IconRegisterFailed} />
        </DialogContent>
        <DialogTitle className={classes.title}>
          ĐĂNG KÝ KHÔNG THÀNH CÔNG
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.textDescription}>
            Thông tin bạn đăng ký có thể đã trùng với một tài khoản khác trong
            hệ thống
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.btn}>
          <Button onClick={onClose} className={classes.btnGrey}>
            &lt; Bỏ qua đăng ký
          </Button>
          <Button onClick={onClose} className={classes.btnGreen}>
            Ký kết hợp đồng
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
