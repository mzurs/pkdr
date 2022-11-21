
type UserExists = {
  __typename: string;
  message: string;
};

type UserNotExists = {
  __typename: string;
  message: string;
};

type UserInfo = {
  __typename: string;
  userInfo: String;
};

type UpdatedResult={
  __typename:string;
  id:string;
  message:string
}


type DeletedResult={
  __typename:string;
  id:string;
  message:string
}
export { UserExists, UserNotExists, UserInfo,UpdatedResult ,DeletedResult};
