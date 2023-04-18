import { userReducer, userActions } from 'entities/User/model/slice/userSlice';
import { UserSchema, User } from 'entities/User/model/types/userSchema';
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData';

export {
    userActions,
    userReducer,
    User,
    UserSchema,
    getUserAuthData,
};
