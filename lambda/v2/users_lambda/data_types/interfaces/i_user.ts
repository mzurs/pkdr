interface IUSER {
    id: string;
    cnic: string;
    PHONE_NUMBER:string;
  };

interface ICHECKBYEMAIL{
    TableName?: string,
    Key: {
      id: string,  
    },
}

interface IPREREGISTERUSER{
  id:string;
  cnic:string;
  PHONE_NUMBER:string;
}
export {IUSER,ICHECKBYEMAIL,IPREREGISTERUSER}