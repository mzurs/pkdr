import createUser from "../mutations/users/createUser/createUser";
import getUserByEmail from "../query/users/getUserByEmail/getUserByEmail";
import updateUser from "../mutations/users/updateUser/updateUser";
import deleteUser from "../mutations/admin/deleteUser/deleteUser";
import preRegisterUser from "../query/users/preRegisterUser/preRegisterUser";
import getAllUserInfo from "../query/admin/getAllUserInfo/getAllUserInfo";
import zkProfile from "../mutations/users/createProfile/createProfile";
import setUserName from "../mutations/users/setUserName/setUserName";
import addContacts from "../mutations/users/addContacts/addContacts";
import getAddressByUserName from "../query/users/getAddressByUserName/getAddressByUserName";
import create_ETH_Profile from "../mutations/users/create_ETH_Profile/create_ETH_Profile";
import getUsersCount from "../query/admin/getUsersCount/getUsersCount";
import listContacts from "../query/users/listContacts/listContacts";
import getUserInfo from "../query/users/getUserInfo/getUserInfo";

exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    case "createUser":
      return await preRegisterUser(event.arguments.user);

    case "getUserByEmail":
      // return "zohaib10092001@gmail.com"
      return await getUserByEmail(event.arguments.id);

    case "updateUser":
      return await updateUser(event.arguments.user);

    case "deleteUser":
      return await deleteUser(event.arguments.id);

    case "getAllUserInfo":
      return await getAllUserInfo();

    case "zkProfile":
      return await zkProfile(event.arguments.zkuser);

    case "setUserName":
      return await setUserName(event.arguments.setname);

    case "addContacts":
      return await addContacts(event.arguments.user);

    case "getAddressByUserName":
      return await getAddressByUserName(event.arguments.userName);

    case "create_ETH_Profile":
      return await create_ETH_Profile(event.arguments.address);

    case "getUsersCount":
      return await getUsersCount();

    case "listContacts":
      return await listContacts(event.arguments.listContactsParams);

      case "getUserInfo":
        return await getUserInfo(event.arguments.userInfoParams);

    default:
      return null;
  }
};
