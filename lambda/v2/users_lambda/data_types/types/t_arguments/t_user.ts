type User = {
  id: string;
  cnic: string;
  PHONE_NUMBER:string;
};

type UpdateUser={
  id:string;
  attributeName: string;
  attributeValue: string;
}

type SetUserName={
  id:string,
  userName:string
}

export { User,UpdateUser,SetUserName};

