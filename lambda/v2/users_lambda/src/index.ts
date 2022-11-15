import createUser from "../mutations/users/createUser/createUser";
import getUserByEmail from "../query/users/getUserByEmail/getUserByEmail";
import updateUser from "../mutations/users/updateUser/updateUser";
import deleteUser from "../mutations/admin/deleteUser/deleteUser";
import preRegisterUser from "../query/users/preRegisterUser/preRegisterUser";
import getAllUserInfo from "../query/admin/getAllUserInfo/getAllUserInfo";
// import preRegisterUser from "../query/users/preRegisterUser/preRegisterUser";
exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    case "createUser":
      return await preRegisterUser(event.arguments.user);

    case "getUserByEmail":
      return await getUserByEmail(event.arguments.id);
    case "updateUser":
      return await updateUser(event.arguments.user);
    case "deleteUser":
      return await deleteUser(event.arguments.id);
    case "getAllUserInfo":
      return await getAllUserInfo();
    default:
      return null;
  }
};
