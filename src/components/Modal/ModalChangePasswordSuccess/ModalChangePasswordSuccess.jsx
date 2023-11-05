/* eslint-disable react/prop-types */
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import IconRegisterSuccess from "../../../assets/icon_register_success.png";

const useStyles = makeStyles(() => ({
  root: {
    padding: "40px",
  },

  img: {
    display: "flex",
    justifyContent: "center",
  },

  title: {
    color: "#31a51c",
    display: "flex",
    justifyContent: "center",
  },

  textDescription: {
    textAlign: "center",
  },
}));

export default function ModalRegisterSuccess({ open, onClose }) {
  const classes = useStyles();
  React.useEffect(() => {
    console.log("....");
    let timer1 = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, [open]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
        <Box className={classes.root}>
          <DialogContent className={classes.img}>
            <img src={IconRegisterSuccess} />
          </DialogContent>
          <DialogTitle className={classes.title}>
            MẬT KHẨU ĐƯỢC THIẾT LẬP LẠI
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.textDescription}>
              Bạn vui lòng nhớ mật khẩu nhé!
            </DialogContentText>
            <DialogContentText className={classes.textDescription}>
              Tự động đăng nhập sau 5 giây
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
