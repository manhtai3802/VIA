/* eslint-disable no-useless-escape */
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import backgroundLogin from '../../assets/backgroundLogin.png';
import * as yup from 'yup';
import { Formik } from 'formik';
import TextField from '../FormControl/TextField/TextField';
import PasswordField from '../FormControl/PasswordField';

const useStyles = makeStyles(() => ({
  backgroundLogin: {
    backgroundImage: `url(${backgroundLogin})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '55vh',
    backgroundAttachment: 'unset',
    margin: '3px auto 0',
    backgroundPosition: '0px 0px',
  },

  textHeader: {
    position: 'absolute',
    top: '30px',
    right: '550px',
    color: '#ffff',
  },

  textBottom: {
    top: '180px',
    left: '1360px',
  },

  formLogin: {
    position: 'absolute',
    top: '60px',
    right: '10px',
    backgroundColor: '#ffff',
    borderRadius: 4,
  },

  input: {
    margin: 20,
    display: 'flex',
  },

  button: {
    height: '42px',
    width: '115px',
    position: 'relative',
    bottom: '-22px',
    right: '-1px',
  },
}));

// const phoneNumberVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const schema = yup.object().shape({
  // phoneNumber: yup
  //   .string()
  //   .required('Vui lòng nhập số điện thoại')
  //   .matches(phoneNumberVN, 'Vui lòng nhập đúng số điện thoại'),
  userName: yup.string().email('Vui lòng nhập đúng email'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

function FormLogin() {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        userName: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log('>>>>>>>>', values);
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box className={classes.backgroundLogin}>
            <Typography className={classes.textHeader}>ĐĂNG NHẬP NGAY!</Typography>
            <Box className={classes.formLogin}>
              <Box
                className={classes.input}
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
              >
                <TextField label="Số điện thoại hoặc email" name="userName" />
                <PasswordField label="Mật khẩu" name="password" />
                <Button className={classes.button} type="submit" style={{ backgroundColor: '#fdba4d', color: 'white' }}>
                  Đăng nhập
                </Button>
              </Box>
            </Box>
            <Button className={classes.textBottom} style={{ color: 'white' }}>
              Quên mật khẩu
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default FormLogin;
