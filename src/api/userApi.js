import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = '/ExamUser/login';
    return axiosClient.post(url, data);
  },

  getOTPChangePassword(data) {
    const url = '/ExamUser/get-otp-change-password';
    return axiosClient.get(url, data);
  },

  validateOTPChangePassword(data) {
    const url = '/ExamUser/get-otp-change-password';
    return axiosClient.get(url, data);
  },

  changePassword(data) {
    const url = '/ExamUser/get-otp-change-password';
    return axiosClient.get(url, data);
  },

  register(data) {
    const url = '/ExamUser/get-otp-change-password';
    return axiosClient.get(url, data);
  },
};

export default userApi;
