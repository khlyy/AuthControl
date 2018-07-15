# AuthControl
## Introduction
  Auth-control is a micro service that is resposible for handling authorization control. The microservice is implemented using node js and mongodb as database.
  
## How to run.
  1- use npm install.<br/>
  2- to run server use npm server.js<br/>
  3- to run unit tests use npm test<br/>
  4- If you like to seed 1000000 users you can use "/seed/user" route  and "seed/resource" to seed resources <br/>
  
 ## Why I choose Node Js?
  In Auth-control microservice, there are many concurrent requests that hits the server, the requests are mainly I/O operations which do not require many computational power that may block the event loop. For these two reasons, I have chosen node js as node is very light weight and execute fast. Also, node works with the event loop which is single threaded that preforms all I/O operations asynchronously without blocking the remaning code, this make it preform very fast in handling too many requests at the same time. 
  
## Why I choose Nosql Database?
No sql databases have a better performance when serving many concurrent users. Also, it supports huge number of data. it allows us to change the schema in a flexible and easy way this we can see becuase we can add more information in groups, resources or what so ever. No sql databases allow us to denormalize and store information about other object which allows us to retrieve all information we want in on single query instead of complex queries and joins in sql databases. we need this fast replies to check if the user is authorized or not in very efficent and fast way.

## schema Design
### user
{ userId: String <br/>
  groupId:[]<br/>
  resourceName:[]<br/>
}<br/>

### group
{ groupName: String <br/>
  resourceId: [] <br/>
}<br/>
The above schema is part of the original one. Here I decided not to save the usersId inside the group, as the number of users will be too large and it's bad to embedd too many object inside one document. So instead I saved the groupIds in which the user belong as an embedded array inside the user. The most important thing is that I decided to store the resources name in which the user can accses as an array in the user. This is because the request which asks whether the user can acsess this resource hits the server too much, so it has the priority to be done in one I/O operation to be fast enough. Of course this added some complexity in the update and create process but I am okay with that as updates will not be too much as reading operations. 
