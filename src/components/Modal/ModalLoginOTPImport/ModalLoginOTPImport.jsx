/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";

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
    height: "60px",
    width: "60px",
  },

  description: {
    color: "#31a51c",
    padding: "25px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
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

export default function ModalLoginOTPImport({ open, onClose, onSubmit }) {
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

        <Typography className="">Thời gian đếm ngược 3 phút</Typography>
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
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </Box>
    </Dialog>
  );
}
