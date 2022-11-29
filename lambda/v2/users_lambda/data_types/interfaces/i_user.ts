interface IUSER {
    id: string;
    cnic: string;
    PHONE_NUMBER:string;
    ETH_ADDRESS:string;
    FULL_NAME: String;
    DOB:String;
    FATHER_OR_HUSBAND_NAME:String;
    CITY: String;
    COUNTRY: String;
    POSTAL_CODE:String;
    ADDRESS:String;
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
  ETH_ADDRESS:string;
  FULL_NAME: String;
  DOB:String;
  FATHER_OR_HUSBAND_NAME:String;
  CITY: String;
  COUNTRY: String;
  POSTAL_CODE:String;
  ADDRESS:String;
  
}
export {IUSER,ICHECKBYEMAIL,IPREREGISTERUSER}