# AuthControl
## Introduction
  Auth-control is a micro service that is resposible for handling authorization control. The microservice is implemented using node js and mongodb as database.
  
## How to run.
  1- use npm install.
  2- to run server use npm server.js
  3- to run unit tests use npm test
  
 ## Why I choose Node Js?
  In Auth-control microservice, there are many concurrent requests that hits the server, the requests are mainly I/O operations which do not require many computational power that may block the event loop. For these two reasons, I have chosen node js as node is very light weight and execute fast. Also, node works with the event loop which is single threaded that preforms all I/O operations asynchronously without blocking the remaning code, this make it preform very fast in handling too many requests at the same time. 
  
## Why I choose Nosql Database?
No sql databases have a better performance when serving many concurrent users. Also, it supports huge number of data. it allows us to change the schema in a flexible and easy way this we can see becuase we can add more information in groups, resources or what so ever. No sql databases allow us to denormalize and store information about other object which allows us to retrieve all information we want in on single query instead of complex queries and joins in sql databases. we need this fast replies to check if the user is authorized or not in very efficent and fast way.
