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
type UpdateContactList={
  id:string;
  attributeValue: string;

}
export { User,UpdateUser,SetUserName,UpdateContactList};

