import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userLoginReducer from "../features/users/userLoginSlice";
import userRegisterReducer from "../features/users/userRegisterSlice";
import userUpdateReducer from "../features/users/userUpdateSlice";
import notesListReducer from "../features/notes/notesListSlice";
import notesCreateReducer from "../features/notes/notesCreateSlice";
import notesUpdateReducer from "../features/notes/notesUpdateSlice";
import notesDeleteReducer from "../features/notes/notesDeleteSlice";
import usersListReducer from "../features/admin/usersListSlice";
import userDeleteReducer from "../features/admin/userDeleteSlice";
import adminUserUpdateReducer from "../features/admin/usersUpdateSlice";
import adminUserBlockReducer from "../features/admin/userBlockSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    noteList: notesListReducer,
    noteCreate: notesCreateReducer,
    noteUpdate: notesUpdateReducer,
    noteDelete: notesDeleteReducer,
    adminUserList: usersListReducer,
    adminUserDelete: userDeleteReducer,
    adminUserUpdate: adminUserUpdateReducer,
    adminUserBlock: adminUserBlockReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
