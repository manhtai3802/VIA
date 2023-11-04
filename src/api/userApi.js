import axios from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/ExamUser/login";
    return axios.post(url, data);
  },

  getOTPChangePassword(data) {
    const url = `/ExamUser/get-otp-change-password/?userName=${data}`;
    return axios.get(url);
  },

  validateOTPChangePassword(userName, otp) {
    console.log(userName, otp);
    const url = `/ExamUser/validate-otp-change-password?userName=${userName}&otpCode=${otp}`;
    return axios.get(url);
  },

  changePassword(data) {
    const url = "/ExamUser/change-password";
    return axios.post(url, data);
  },

  register(data) {
    const url = "/ExamUser/register-user";
    return axios.post(url, data);
  },
};

export default userApi;
