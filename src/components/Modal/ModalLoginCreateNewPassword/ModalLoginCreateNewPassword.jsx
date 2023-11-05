/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import * as yup from "yup";
import PasswordField from "../../PasswordField/PasswordField";

const useStyles = makeStyles(() => ({
  form: {
    margin: "40px ",
  },

  title: {
    position: "absolute !important",
    bottom: "85%",
    left: "0%",
  },

  input: {
    padding: "20px 0 !important",
    width: "450px",
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
  otpCode: yup.string(),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
});

export default function ModalLoginCreateNewPassword({
  onClose,
  open,
  onSubmit,
}) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        userName: "",
        otpCode: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
          <form onSubmit={handleSubmit} className={classes.form}>
            <DialogTitle className={classes.title}>
              THIẾT LẬP MẬT KHẨU MỚI
            </DialogTitle>

            <DialogContent className={classes.input}>
              <PasswordField label="Mật khẩu mới" name="password" />
            </DialogContent>
            <DialogContent className={classes.input}>
              <PasswordField
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
              />
            </DialogContent>

            <DialogActions className={classes.btnClose}>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </DialogActions>

            <DialogActions className={classes.btn}>
              <Button style={{ color: "white" }} type="submit">
                Đăng nhập
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </Formik>
  );
}
