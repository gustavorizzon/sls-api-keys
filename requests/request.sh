HOST=http://localhost:3000
API_KEY="d41d8cd98f00b204e9800998ecf8427e"

curl --silent -H "x-api-key: $API_KEY" $HOST/dev/hello

curl --silent $HOST/dev/getUsagePlans

# from getUsagePlans
USAGE_PLAN_ID="0sqv4e"
KEY_ID="ikthfgeduc"
API_KEY="HoER0Do6rw83pE4DgqHmT2cgN7WIzQk2mueMVhOa"
FROM="2022-04-25"
TO="2022-04-26"

curl --silent "$HOST/dev/getUsage?keyId=$KEY_ID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO"
