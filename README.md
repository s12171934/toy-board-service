### Spring config server config file
```
port: [PORT]

eureka: 
  instance:
    app: board-service
    hostName: [HOST_NAME]
    ipAddr: [IP_ADDRESS]

  server:
    host: [EUREKA_SERVER_URL]

postgreSQL:
  database: [DATABASE]
  username: [DB_USERNAME]
  password: [DB_PASSWORD]
  host: [HOST_NAME]
```
