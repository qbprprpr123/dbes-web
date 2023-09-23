import { createSlice } from '@reduxjs/toolkit';
import { storageDecrypt, storageEncrypt } from '@/assets/common/utils';

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

const userState = {
  loginInfo: getStorageValue(LOGIN_INFO_STORE_KEY),
  userInfo: getStorageValue(USER_INFO_STORE_KEY),
  accessInfo: getStorageValue(ACCESS_INFO_STORE_KEY),
};

// token,userInfo,access
const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setLoginInfo(state, { payload }) {
      state.loginInfo = payload;
    },
  },
});

const { setLoginInfo } = userSlice.actions;

// 登录
export const login = async (params) => {
  const requestFn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(params);
      }, 3000);
    });
  };
  // let requestFn2 = empty;
  let rD = null;
  try {
    // 获取token信息
    const res = await requestFn(params);
    console.log(res);
    rD = res;
    setStorageValue(LOGIN_INFO_STORE_KEY, rD);
    // const userRes = await requestFn2(rD?.accessToken);
    // const userResData = userRes?.data;
  } catch (e) {
    return e;
  }

  return setLoginInfo(rD);
};

// 获取用户信息

// 获取菜单权限

export default userSlice.reducer;
