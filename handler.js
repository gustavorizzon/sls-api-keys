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

const addKey = async (event) => {
  const { name, usagePlanId } = event.queryStringParameters

  console.log('received', { name, usagePlanId })
  
  const planKeys = await apiGateway.getUsagePlanKeys({ usagePlanId }).promise()
  
  console.log('planKeys', planKeys)

  const { items: [{ type: keyType }]} = planKeys

  const apiKeyCreated = await apiGateway.createApiKey({ 
    name,
    enabled: true
  }).promise()

  console.log('apiKeyCreated', apiKeyCreated)

  const apiKeyId = apiKeyCreated.id
  const apiKeyToken = apiKeyCreated.value

  const linkApiKey = await apiGateway.createUsagePlanKey({
    keyId: apiKeyId,
    keyType,
    usagePlanId
  }).promise()

  console.log('API key + Usage plan key', linkApiKey)

  const message = `Use ${apiKeyId} to check quota and 'x-api-key' ${apiKeyToken} to make requests`
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKeyToken,
      apiKeyId,
      message
    }, null, 2)
  };
}

module.exports = {
  hello,
  usage,
  usagePlans,
  addKey
}
