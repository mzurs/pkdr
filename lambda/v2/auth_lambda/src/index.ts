// exports.handler = async function (event: any) {
//   console.log(event);
//   let token = event.headers.AuthorizeToken;
//   let effect = "Deny";
//   if (token == "abc") {
//     effect = "Allow";
//   } else {
//     effect = "Deny";
//   }
//   let policy = {
//     principalId: "user",
//     policyDocument: {
//       Version: "2012-10-17",
//       Statement: [
//         {
//           Action: "execute-api:Invoke",
//           Effect: effect,
//           Resource: event.methodArn,
//         },
//       ],
//     },
//   };
//   return policy;
// };


import { Event } from "../data_types/types/t_arguments/t_arguments";
exports.handler = async function (event:Event) {
  console.log(event);
  let token = event.authorizationToken;
  let effect = "Deny";
  if (token == "abc") {
   const res={
  "isAuthorized":true
  // "resolverContext": {
  //   "banana":"very yellow",
  //   "apple":"very green" 
  // }
   }
  return res;
}
   else {
      const res={
  "isAuthorized":false
  // "resolverContext": {
  //   "banana":"very yellow",
  //   "apple":"very green" 
  //
  }
  
  
  return res;
}}
