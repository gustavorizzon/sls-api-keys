HOST=http://localhost:3000
API_KEY="d41d8cd98f00b204e9800998ecf8427e"

curl --silent -H "x-api-key: $API_KEY" $HOST/dev/hello

curl --silent $HOST/dev/getUsagePlans

# from getUsagePlans
USAGE_PLAN_ID="l5rcel"
KEY_ID="zuagkbgbdj"
API_KEY="ObLH6WfytsiGhXomrnvx9kbzXWBwg5W8KKmUPt59"
FROM="2022-04-25"
TO="2022-04-26"

curl --silent "$HOST/dev/getUsage?keyId=$KEY_ID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO"


# add key
CUSTOMER_NAME=customer@test.com
curl --silent "$HOST/dev/addKey?name=$CUSTOMER_NAME&usagePlanId=$USAGE_PLAN_ID"
