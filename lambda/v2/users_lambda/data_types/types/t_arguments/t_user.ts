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
export { User,UpdateUser};
