/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextField from "../../FormControl/TextField/TextField";

const useStyles = makeStyles(() => ({
  root: {
    margin: "40px",
  },

  title: {
    position: "absolute !important",
    bottom: "80%",
    left: "0%",
  },

  text: {
    textAlign: "center",
  },

  input: {
    padding: "25px 0 !important",
  },

  btnClose: {
    position: "absolute",
    top: "2%",
    right: "2%",
  },

  btn: {
    width: "fit-content",
    position: "relative",
    left: "35%",
    backgroundColor: "#fdba4d",
    borderRadius: "4px",
    marginTop: "20px",
  },
}));

const schema = yup.object().shape({
  userName: yup.string(),
});

export default function ModalLoginConfirmUserName({ onClose, open, onSubmit }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        userName: "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
          <form onSubmit={handleSubmit} className={classes.root}>
            <DialogTitle className={classes.title}>
              YÊU CẦU THAY ĐỔI BẢO MẬT
            </DialogTitle>

            <DialogContent className={classes.input}>
              <TextField label="Số điện thoại hoặc email" name="userName" />
            </DialogContent>

            <DialogActions className={classes.btnClose}>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </DialogActions>

            <DialogContentText className={classes.text}>
              Bạn vui lòng kiểm tra hòm thư đến hoặc tin nhắn trên điện thoại để
              lấy mã OTP
            </DialogContentText>
            <DialogActions className={classes.btn}>
              <Button style={{ color: "white" }} type="submit">
                Gửi yêu cầu
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </Formik>
  );
}
