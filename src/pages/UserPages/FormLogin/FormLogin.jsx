/* eslint-disable no-useless-escape */
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import userApi from "../../../api/userApi";
import background_login from "../../../assets/background_login.png";
import logo from "../../../assets/logo.png";
import PasswordField from "../../../components/FormControl/PasswordField";
import TextField from "../../../components/FormControl/TextField/TextField";
import ModalRegisterSuccess from "../../../components/Modal/ModalChangePasswordSuccess/ModalChangePasswordSuccess";
import ModalLoginConfirmUserName from "../../../components/Modal/ModalLoginConfirmUserName/ModalLoginConfirmUserName";
import ModalLoginCreateNewPassword from "../../../components/Modal/ModalLoginCreateNewPassword/ModalLoginCreateNewPassword";
import ModalLoginOTPImport from "../../../components/Modal/ModalLoginOTPImport/ModalLoginOTPImport";

const useStyles = makeStyles(() => ({
  backgroundLogin: {
    backgroundImage: `url(${background_login})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "unset",
    backgroundPosition: "0px 0px",
    position: "relative",

    width: "100%",
    height: "55vh",
  },

  logo: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "110px",
  },

  form: {
    position: "absolute",
    right: "2%",
    top: "15%",
  },

  textBottom: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    margin: "15px 0 0 0",
  },

  formLogin: {
    width: "100%",
  },

  input: {
    padding: 15,
    borderRadius: 4,

    width: "fit-content",

    backgroundColor: "#ffff",

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

// const phoneEmail =
//   /^((03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b)|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/;
const schema = yup.object().shape({
  // userName: yup
  //   .string()
  //   .matches(phoneEmail, "Vui lòng nhập đúng email hoặc số điện thoại"),

  userName: yup.string().required("Vui lòng điền tên đăng nhập"),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
      "Vui lòng nhập mật khẩu"
    ),
});

function FormLogin() {
  const classes = useStyles();

  const [openOTPImport, setOpenOTPImport] = useState(false);
  const [openConfirmUserName, setOpenConfirmUserName] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangePasswordSuccess, setOpenChangePasswordSuccess] =
    useState(false);
  const [confirmOTP, setConfirmOTP] = useState(true);
  const [OTPCode, SetOTPCode] = useState();
  const [userNameConfirm, setUserNameConfirm] = useState("");

  const onSubmit = async (values) => {
    try {
      const response = await userApi.login(values);

      if (response.data.success) return window.alert("Đăng nhập thành công!");
      window.alert("Đăng nhập thất bại, kiểm tra lại thông tin");
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

  const handleClickBackConfirmUserName = () => {
    setOpenOTPImport(false);
    setOpenConfirmUserName(true);
  };

  const handleSubmitOTPImport = async (values) => {
    let otp = values.otp.map((item) => item.digit).join("");

    try {
      const response = await userApi.validateOTPChangePassword(
        userNameConfirm,
        otp
      );

      if (response.data.content) {
        setConfirmOTP(true);
        setOpenOTPImport(false);
        setOpenChangePassword(true);
        SetOTPCode(otp);
      } else {
        setConfirmOTP(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmitChangePassword = async (values) => {
    values.otpCode = OTPCode;
    values.userName = userNameConfirm;
    try {
      const response = await userApi.changePassword(values);

      if (response.data.success) {
        setOpenChangePasswordSuccess(true);
        setOpenChangePassword(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const handleCloseChangePasswordSuccess = () => {
    console.log("...");
    setOpenChangePasswordSuccess(false);
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
            <Box className={classes.logo}></Box>
            <Box className={classes.form}>
              <Typography style={{ color: "#fff", margin: "10px 0" }}>
                ĐĂNG NHẬP NGAY!
              </Typography>
              <Box className={classes.formLogin}>
                <Box className={classes.input}>
                  {/* <TextField label="Số điện thoại hoặc email" name="userName" /> */}

                  <TextField label="Tên đăng nhập" name="userName" />
                  <Box style={{ margin: "0 15px" }}>
                    <PasswordField label="Mật khẩu" name="password" />
                  </Box>
                  <Button
                    className={classes.button}
                    type="submit"
                    style={{ backgroundColor: "#fdba4d", color: "white" }}
                  >
                    Đăng nhập
                  </Button>
                </Box>
              </Box>
              <Box className={classes.textBottom}>
                <Button
                  style={{ color: "white", padding: 0 }}
                  type="button"
                  onClick={handleClickForgetPassword}
                >
                  Quên mật khẩu
                </Button>
              </Box>
            </Box>
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
            onClickBackConfirmUserName={handleClickBackConfirmUserName}
            confirmOTP={confirmOTP}
          />
          <ModalLoginCreateNewPassword
            onSubmit={handleSubmitChangePassword}
            open={openChangePassword}
            onClose={handleCloseChangePassword}
          />
          <ModalRegisterSuccess
            open={openChangePasswordSuccess}
            onClose={handleCloseChangePasswordSuccess}
          />
        </form>
      )}
    </Formik>
  );
}

export default FormLogin;
