import axios from "axios";
import {
  REGISTER_CREATE_FAIL,
  REGISTER_CREATE_REQUEST,
  REGISTER_CREATE_SUCCESS,
  REGISTER_LIST_FAIL,
  REGISTER_LIST_REQUEST,
  REGISTER_LIST_SUCCESS,
} from "../constants/registerConstants";

export const listRegister = (objectId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGISTER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("USERINFO", userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("outpass Action student ID : ",studentId);
    const { data } = await axios.get(
      `http://localhost:5000/api/qr/entries`,
      config
    );

    dispatch({
      type: REGISTER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REGISTER_LIST_FAIL,
      payload: message,
    });
  }
};

// export const listRegisterSecurity = (outpassId) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: REGISTER_LIST_REQUEST,
//         });

//         const {
//             userLogin: { userInfo },
//         } = getState();

//         // console.log("USERINFO", userInfo);
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const { data } = await axios.post(`/api/qr/${outpassId}`, config);

//         console.log("data:",data);

//         dispatch({
//             type: REGISTER_LIST_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         dispatch({
//             type: REGISTER_LIST_FAIL,
//             payload: message,
//         });
//     }
// };

// export const createRegisterAction = (outpassId) => async (
//     dispatch,
//     getState
// ) => {
//     try {
//         dispatch({
//             type: REGISTER_CREATE_REQUEST,
//         });

//         const {
//             userLogin: { userInfo },
//         } = getState();

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         console.log(userInfo);
//         const { data } = await axios.post(
//             `/api/qr`,
//             { outpassId },
//             config
//         );

//         dispatch({
//             type: REGISTER_CREATE_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         dispatch({
//             type: REGISTER_CREATE_FAIL,
//             payload: message,
//         });
//     }
// };
