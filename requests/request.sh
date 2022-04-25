HOST=http://localhost:3000
API_KEY="d41d8cd98f00b204e9800998ecf8427e"

curl --silent -H "x-api-key: $API_KEY" $HOST/dev/hello
