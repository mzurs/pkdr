import { TABLENAME } from "../../../../constants"
import {IUSER} from "../../../data_types/interfaces/i_user"
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

async function getAllUserInfo() {
    const params = {
        TableName: TABLENAME//process.env.PRODUCT_TABLE,
    }
    try {
        const data = await docClient.scan(params).promise()
        const Items:IUSER[]=data.Items;
        return data.Items
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}







export default getAllUserInfo;