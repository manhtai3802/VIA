/* eslint-disable no-useless-escape */
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import userApi from "../../../api/userApi";
import background_login from "../../../assets/background_login.png";
import TextField from "../../../components/FormControl/TextField/TextField";
import ModalLoginConfirmUserName from "../../../components/Modal/ModalLoginConfirmUserName/ModalLoginConfirmUserName";
import PasswordField from "../../../components/FormControl/PasswordField";
import ModalLoginOTPImport from "../../../components/Modal/ModalLoginOTPImport/ModalLoginOTPImport";

const useStyles = makeStyles(() => ({
  backgroundLogin: {
    backgroundImage: `url(${background_login})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "55vh",
    backgroundAttachment: "unset",
    margin: "3px auto 0",
    backgroundPosition: "0px 0px",
  },

  textHeader: {
    position: "absolute",
    top: "30px",
    right: "550px",
    color: "#ffff",
  },

  textBottom: {
    top: "180px",
    left: "1360px",
  },

  formLogin: {
    position: "absolute",
    top: "60px",
    right: "10px",
    backgroundColor: "#ffff",
    borderRadius: 4,
  },

  input: {
    margin: 20,
    display: "flex",
  },

  button: {
    height: "42px",
    width: "115px",
    position: "relative",
    bottom: "-22px",
    right: "-1px",
  },
}));

// const phoneNumberVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const schema = yup.object().shape({
  userName: yup.string().when("isEmail", {
    is: "1",
    then: yup.string().email("Please enter valid email"),
  }),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

function FormLogin() {
  const classes = useStyles();

  const [openOTPImport, setOpenOTPImport] = useState(false);
  const [openConfirmUserName, setOpenConfirmUserName] = useState(false);
  const [userNameConfirm, setUserNameConfirm] = useState("");

  const onSubmit = async (values) => {
    try {
      const response = await userApi.login(values);

      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickForgetPassword = () => {
    setOpenConfirmUserName(!openConfirmUserName);
  };

  const handleSubmitConfirmUserName = async (values) => {
    try {
      const response = await userApi.getOTPChangePassword(values.userName);

      if (response.data.content) {
        setOpenOTPImport(true);
        setOpenConfirmUserName(false);
        setUserNameConfirm(values.userName);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseModalOTPImport = () => {
    setOpenOTPImport(!openOTPImport);
  };

  const handleSubmitOTPImport = async (values) => {
    let otp = values.otp.map((item) => item.digit).join("");

    try {
      const response = await userApi.validateOTPChangePassword(
        userNameConfirm,
        otp
      );

      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box className={classes.backgroundLogin}>
            <Typography className={classes.textHeader}>
              ĐĂNG NHẬP NGAY!
            </Typography>
            <Box className={classes.formLogin}>
              <Box
                className={classes.input}
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
              >
                <TextField label="Số điện thoại hoặc email" name="userName" />
                <PasswordField label="Mật khẩu" name="password" />
                <Button
                  className={classes.button}
                  type="submit"
                  style={{ backgroundColor: "#fdba4d", color: "white" }}
                >
                  Đăng nhập
                </Button>
              </Box>
            </Box>
            <Button
              className={classes.textBottom}
              style={{ color: "white" }}
              type="button"
              onClick={handleClickForgetPassword}
            >
              Quên mật khẩu
            </Button>
          </Box>
          <ModalLoginConfirmUserName
            open={openConfirmUserName}
            onClose={handleClickForgetPassword}
            onSubmit={handleSubmitConfirmUserName}
          />
          <ModalLoginOTPImport
            open={openOTPImport}
            onClose={handleCloseModalOTPImport}
            onSubmit={handleSubmitOTPImport}
          />
        </form>
      )}
    </Formik>
  );
}

export default FormLogin;
