import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storageDecrypt, storageEncrypt } from '@/assets/common/utils';
import { accountLogin } from '@/service/request/login';

const LOGIN_INFO_STORE_KEY = '_login_info_';
const USER_INFO_STORE_KEY = '_user_info_';
const ACCESS_INFO_STORE_KEY = '_access_info_';

// 获取存储中的值
const getStorageValue = (key) => {
  try {
    return JSON.parse(storageDecrypt(sessionStorage.getItem(key)));
  } catch (e) {
    return null;
  }
};
// 设置存储中的值
const setStorageValue = (key, val) => sessionStorage.setItem(key, storageEncrypt(JSON.stringify(val)));

export const userLogin = createAsyncThunk('user/userLogin', async (data) => {
  try {
    return await accountLogin(data);
  } catch (e) {
    return e;
  }
});

const userState = {
  loginInfo: getStorageValue(LOGIN_INFO_STORE_KEY),
  userInfo: getStorageValue(USER_INFO_STORE_KEY),
  accessInfo: getStorageValue(ACCESS_INFO_STORE_KEY),
};

// token,userInfo,access
const userSlice = createSlice({
  name: 'user',
  initialState: userState,

  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loginInfo = payload;
      setStorageValue('loginInfo', payload);
    });
  },
});

// 获取用户信息

// 获取菜单权限

export default userSlice.reducer;
