
curl http://localhost:5000/api/tickets

curl http://localhost:5000/api/tickets/t1

curl -X POST http://localhost:5000/api/tickets \
-H "Content-Type: application/json" \
-d "{
    \"title\" : \"cant connect to wifi\",
    \"description\": \"computer will not connect to wifi\",
    \"status\": \"OPEN\",
    \"priority\": \"HIGH\",
    \"category\": \"Network Connection\",
    \"requesterId\": \"u1\"
}"

curl -X PATCH http://localhost:5000/api/tickets/t1 \
-H "content-type: application/json" \
-d "{
    \"assigneeId\": \"u2\",
    \"status\": \"IN_PROGRESS\"
}"

curl -X DELETE http://localhost:5000/api/tickets/t1 

curl http://localhost:5000/api/users

curl http://localhost:5000/api/users/u1

curl -X POST http://localhost:5000/api/users \
-H "Content-type: application/json" \
-d '{"firstName":"Christian",
    "lastName" : "Wolff",
    "email":"cgwolff@srcare.org",
    "role": "ADMIN",
    "department": "IT"
}'





curl -X PATCH http://localhost:5000/api/users/u1 \
-H "Content-Type: application/json" \
-d '{
  "role": "AGENT"
}'

curl -X DELETE http://localhost:5000/api/users/u1