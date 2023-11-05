/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import CountDown from "../../../hooks/CountDown";

const useStyles = makeStyles(() => ({
  root: {
    padding: "40px 30px !important",
  },

  title: {
    position: "absolute",
    top: "0%",
    left: "0%",
  },

  btnClose: {
    position: "absolute",
    top: "2%",
    right: "2%",
  },

  otpContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    justifyContent: "left",
    alignItems: "center",
    marginBottom: "1rem",
  },

  otpInputs: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "center",
    padding: "20px 0",
  },

  otpInput: {
    fontSize: "2.25rem",
    textAlign: "center",
    height: "50px",
    width: "50px",
  },

  description: {
    color: "#31a51c",
    padding: "25px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "500 !important",
  },

  textCountDown: {
    color: "#fdba4d",
    textAlign: "center",
  },

  btn: {
    display: "flex !important",
    justifyContent: "space-between !important",
    width: "70%",
    marginTop: "20px",
  },

  btnGreen: {
    backgroundColor: "#fdba4d !important",
    color: "white !important",
    width: "100%",
  },

  btnGrey: {
    backgroundColor: "#b6c1bc !important",
    width: "100%",
    color: "white !important",
  },
}));

const initialValues = {
  otp: [
    { digit: "" },
    { digit: "" },
    { digit: "" },
    { digit: "" },
    { digit: "" },
    { digit: "" },
  ],
};

export default function ModalLoginOTPImport({
  open,
  onClose,
  onSubmit,
  onClickBackConfirmUserName,
  confirmOTP,
}) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values),
  });

  const handleOTPChange = (event, element) => {
    if (event.target.value === "") {
      return;
    }
    formik.setFieldValue(element, event.target.value);
    const nextElementSibling = event.target.nextElementSibling;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const inputOnKeyDown = (e, element) => {
    const target = e.target;
    formik.setFieldValue(element, "");

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    const previousElementSibling = target.previousElementSibling;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <Box className={classes.root}>
        <DialogTitle className={classes.title}>NHẬP MÃ OTP</DialogTitle>

        <DialogTitle className={classes.description}>
          MÃ OTP ĐÃ ĐƯỢC GỬI TỚI SỐ ĐIỆN THOẠI/EMAIL
        </DialogTitle>

        <h4 className={classes.textCountDown}>
          {confirmOTP ? (
            <CountDown initialMinute={3} initialSeconds={0} />
          ) : (
            <div>
              Mã khôi phục không đúng <Button>Gửi lại mã</Button>
            </div>
          )}
        </h4>
        <DialogActions className={classes.btnClose}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </DialogActions>
        <form className={classes.otpContainer} onSubmit={formik.handleSubmit}>
          <div className={classes.otpInputs}>
            {initialValues.otp.map((item, index) => {
              return (
                <input
                  key={index}
                  className={classes.otpInput}
                  type="text"
                  {...formik.getFieldProps(`otp.${index}.digit`)}
                  onChange={(event) =>
                    handleOTPChange(event, `otp.${index}.digit`)
                  }
                  onKeyDown={(event) =>
                    inputOnKeyDown(event, `otp.${index}.digit`)
                  }
                  autoComplete="one-time-code"
                  maxLength={1}
                />
              );
            })}
          </div>
          <DialogActions className={classes.btn}>
            <Button
              type="button"
              className={classes.btnGrey}
              onClick={onClickBackConfirmUserName}
            >
              &lt; Trở về
            </Button>
            <Button type="submit" className={classes.btnGreen}>
              Thay đổi mật khẩu
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
}
