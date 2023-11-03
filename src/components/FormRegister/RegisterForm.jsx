/* eslint-disable no-useless-escape */
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextField from '../FormControl/TextField/TextField';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import PasswordField from '../FormControl/PasswordField';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '30px',
    marginTop: '30px',
  },

  title: {
    color: '#DCA245',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
  },

  right: {
    width: '400px',
  },

  left: {
    flex: '1 1 0',
  },
}));
const phoneNumberVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const schema = yup.object().shape({
  userName: yup.string(),
  shopName: yup.string().required('Vui lòng nhập tên cửa hàng'),
  phoneNumber: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneNumberVN, 'Vui lòng nhập đúng số điện thoại'),
  email: yup.string().email('Vui lòng nhập đúng email'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
  address: yup.string(),
  wards: yup.string(),
  district: yup.string(),
  province: yup.string(),
  acceptTerm: yup.string().required('Vui lòng đọc chính sách bỏ mật'),
});

function RegisterForm() {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        userName: '',
        shopName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        email: '',
        address: '',
        wards: '',
        district: '',
        province: '',
        acceptTerm: false,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log('>>>>>>>>', values);
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box className={classes.root}>
            <Container>
              <Grid container spacing={1}>
                <Grid item className={classes.left}>
                  <Typography className={classes.title}>ĐĂNG KÝ TÀI KHOẢN</Typography>
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
                      <PasswordField label="Xác nhận mật khẩu" name="confirmPassword" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Địa chỉ" name="address" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="Phường/Xã" name="wards" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="Quận/Huyện" name="district" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="Thành phố" name="province" />
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
                      <Button type="submit" style={{ backgroundColor: '#fdba4d', color: 'white' }}>
                        Đăng ký ngay
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item className={classes.right}>
                  <Box>
                    <Typography>DỊCH VỤ CỦA CHÚNG TÔI</Typography>
                    <Grid container>
                      <Grid item xs={6}>
                        a
                      </Grid>
                      <Grid item xs={6}>
                        a
                      </Grid>
                      <Grid item xs={6}>
                        a
                      </Grid>
                      <Grid item xs={6}>
                        a
                      </Grid>
                      <Grid item xs={12}>
                        a
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default RegisterForm;
