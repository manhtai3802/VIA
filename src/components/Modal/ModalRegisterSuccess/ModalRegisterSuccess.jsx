/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import IconRegisterSuccess from "../../../assets/icon_register_success.png";
import { makeStyles } from "@mui/styles";

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

  btn: {
    display: "flex !important",
    justifyContent: "space-between !important",
  },

  btnGreen: {
    backgroundColor: "#0b8147 !important",
    color: "white !important",
    width: "100%",
  },
  btnGrey: {
    backgroundColor: "#b6c1bc !important",
    width: "100%",
    color: "white !important",
  },
}));

export default function ModalRegisterSuccess({ open, onClose }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
        <Box className={classes.root}>
          <DialogContent className={classes.img}>
            <img src={IconRegisterSuccess} />
          </DialogContent>
          <DialogTitle className={classes.title}>
            ĐĂNG KÝ THÀNH CÔNG
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.textDescription}>
              Để xử dụng hợp đồng thu hộ, <br /> bạn có muốn ký kết hợp đồng
              điện tử ngay?
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.btn}>
            <Button onClick={onClose} className={classes.btnGrey}>
              Đăng nhập
            </Button>
            <Button onClick={onClose} className={classes.btnGreen}>
              Ký kết hợp đồng
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
