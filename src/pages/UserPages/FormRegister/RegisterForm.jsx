/* eslint-disable no-useless-escape */
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field, Formik } from "formik";
import * as yup from "yup";
import PasswordField from "../../../components/FormControl/PasswordField";
import group from "../../../assets/Group.png";
import userApi from "../../../api/userApi";
import SelectField from "../../../components/FormControl/SelectField/SelectField";
import ModalRegisterSuccess from "../../../components/Modal/ModalRegisterSuccess/ModalRegisterSuccess";
import { useState } from "react";
import ModalRegisterFailed from "../../../components/Modal/ModalRegisterFailed/ModalRegisterFailed";
import TextField from "../../../components/FormControl/TextField/TextField";

const dataProvince = [
  { name: "Thanh Hóa", value: "TH" },
  { name: "Hà Nội", value: "HN" },
  { name: "Hồ Chí Minh", value: "HCM" },
];
const dataDistrict = [
  { name: "Nga Sơn", value: "NS" },
  { name: "Thanh Xuân", value: "TX" },
  { name: "Thủ Đức", value: "TD" },
];
const dataWards = [
  { name: "Nga Phượng", value: "NP" },
  { name: "Vũ Tông Phan", value: "VTP" },
  { name: "Võ Thị Sáu", value: "VTS" },
];

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1400,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "30px",
    marginTop: "30px",
  },

  titleRegister: {
    color: "#DCA245",
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },

  right: {
    width: "400px",
  },

  left: {
    flex: "1 1 0",
  },

  groupIcon: {
    marginLeft: "130px",
  },

  titleGroupIcon: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: "175px",
  },

  group: {
    backgroundRepeat: "no-repeat",
    width: "120px",
    height: "90px",
    position: "relative",

    "& > img": {
      width: "35px",
      height: "40px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
}));
const phoneNumberVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const schema = yup.object().shape({
  userName: yup.string(),
  shopName: yup.string().required("Vui lòng nhập tên cửa hàng"),
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(phoneNumberVN, "Vui lòng nhập đúng số điện thoại"),
  email: yup.string().email("Vui lòng nhập đúng email"),
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
  address: yup.string(),
  wards: yup.string(),
  district: yup.string(),
  province: yup.string(),
  acceptTerm: yup.string().required("Vui lòng đọc chính sách bỏ mật"),
});

function RegisterForm() {
  const [openFailed, setOpenFailed] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const classes = useStyles();

  const onSubmit = async (values) => {
    values.userName = values.shopName;
    try {
      const response = await userApi.register(values);

      if (response.data.success) return setOpenSuccess(true);
      setOpenFailed(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseFailed = () => {
    setOpenFailed(false);
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <Formik
      initialValues={{
        userName: "tainm",
        shopName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        email: "",
        address: "",
        wards: "",
        district: "",
        province: "",
        acceptTerm: false,
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box className={classes.root}>
            <Container>
              <Grid container spacing={1}>
                <Grid item className={classes.left}>
                  <Typography className={classes.titleRegister}>
                    ĐĂNG KÝ TÀI KHOẢN
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField label="Tên cửa hàng" name="shopName" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="Số điện thoại" name="phoneNumber" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="Email" name="email" />
                    </Grid>
                    <Grid item xs={6}>
                      <PasswordField label="Mật khẩu" name="password" />
                    </Grid>
                    <Grid item xs={6}>
                      <PasswordField
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Địa chỉ" name="address" />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectField
                        label="Phường/Xã"
                        name="wards"
                        dataArr={dataWards}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectField
                        label="Quận/Huyện"
                        name="district"
                        dataArr={dataDistrict}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectField
                        label="Thành phố"
                        name="province"
                        dataArr={dataProvince}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Field
                        type="checkbox"
                        name="acceptTerm"
                        as={FormControlLabel}
                        control={<Checkbox />}
                        label="Tôi đã đọc và đồng ý với Chính sách bảo mật thông tin"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#fdba4d", color: "white" }}
                      >
                        Đăng ký ngay
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item className={classes.right}>
                  <Box>
                    <Typography className={classes.titleGroupIcon}>
                      DỊCH VỤ CỦA CHÚNG TÔI
                    </Typography>
                    <Grid container className={classes.groupIcon}>
                      <Grid item xs={6}>
                        <Box className={classes.group}>
                          <img src={group} />
                        </Box>
                        <Typography>VIA EXPRESS</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.group}>
                          <img src={group} />
                        </Box>
                        <Typography>VIA EXPRESS</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.group}>
                          <img src={group} />
                        </Box>
                        <Typography>VIA EXPRESS</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.group}>
                          <img src={group} />
                        </Box>
                        <Typography>VIA EXPRESS</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={classes.group}>
                          <img src={group} />
                        </Box>
                        <Typography>VIA EXPRESS</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <ModalRegisterSuccess
            onClose={handleCloseSuccess}
            open={openSuccess}
          />
          <ModalRegisterFailed onClose={handleCloseFailed} open={openFailed} />
        </form>
      )}
    </Formik>
  );
}

export default RegisterForm;