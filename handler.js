const AWS = require('aws-sdk')
const apiGateway = new AWS.APIGateway()
const moment = require('moment')

const hello = async (event) => {
  return {
    statusCode: 200,
    body: 'Hello world'
  };
}

const usage = async (event) => {
  const {
    from, to, usagePlanId, keyId
  } = event.queryStringParameters

  const result = await apiGateway.getUsage({
    startDate: moment(from).format('YYYY-MM-DD'),
    endDate: moment(to).format('YYYY-MM-DD'),
    usagePlanId,
    keyId
  }).promise()

  console.log('Usage', result)

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2)
  };
}

const usagePlans = async (event) => {
  const result = await apiGateway.getUsagePlans().promise()
  console.log('Usage Plans', result)
  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2)
  };
}

module.exports = {
  hello,
  usage,
  usagePlans
}
