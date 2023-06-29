## To Start

create a terminal in this folder Directory and run:
### `% npm install`
this will install a node_modules folder with all package dependancies.

to make calls to this server use the domain:
### http://localhost:10000
all routes will use standard format

## to run

use the command:
### `% npm run buildMac`
for mac and:
### `% npm run buildWindows`
for windows
and wait until the console says:
```
database loaded
listening at 10000
```
now you can start making requests


## accounts

you can create an account using a post request to:
#### `/accounts/create`
the body of the request must look like 

```
{
    "username": "example",
    "password": "example",
    "email": "example@example.com"
}
```
if the request was a succes the server will respond with a 201 status code.
<br>
you can only have an email registered once.
<br>

if the email is already registered the server will response with:
>email already registered
<br>
<br>

to verify or authenticate an existing account make a post request to:
#### `/accounts/verify`
once again the body of this request needs to look like this:
```
{
    "username": "example",
    "password": "example",
    "email": "example@example.com"
}
```
if the username or passowrd is wrong the server will response with a 401 status code
<br>

if the email is not registered the sever will response with a message saying 
>email not registered

if the requests was a success the server will respond with a 200 status code and the account ID of the account authenticated.

**save this somewhere in memory**



## Graph Requests

in order to get all graphs connected to a particular account will need the account ID and the autorization token given when you authenticated the account.<br><br>
will will need to put the access token in the authorization header evertime you make a request to `/graphs`<br><br>
to get the graphs make a get request to:
#### `/graphs/:id`
where you replace the :id with the account ID. this will return json data of all graphs stored for that account. if the account ID does not exist in the database, the server will let you know.<br><br>
example of response:
```
{
    "success": true,
    "venDiagrams": [{
        "Notes": {
            "Left": ["is not cool", "hates women", "is racist"],
            "Right": ["is cool", "loves women", "isn't racist"],
            "Middle": ["both human", "both have opinions on women", "both have thought on race"]
        },
        "_id": "649be757ad74ae5af2e924e0",
        "accountID": "649670a4bb3698c4809398cc",
        "Top": 25,
        "Left": 15,
        "Width": 20,
        "Height": 20,
        "__v": 0
    }],
    "gantCharts": [],
    "lineGraphs": [{
        "_id": "649ce6ed0fb6404e020fc14e",
        "accountID": "649670a4bb3698c4809398cc",
        "Top": 35,
        "Left": 50,
        "Width": 60,
        "Height": 30,
        "XLabel": "year",
        "YLabel": "tempurature in degrees farenheight",
        "Pairs": [{
            "x": 2015,
            "y": 95,
            "_id": "649ce6ed0fb6404e020fc14f"
        }, {
            "x": 2016,
            "y": 97,
            "_id": "649ce6ed0fb6404e020fc150"
        }, {
            "x": 2017,
            "y": 99,
            "_id": "649ce6ed0fb6404e020fc151"
        }],
        "__v": 0
    }]
}
```

in order to register a graph to the database you need to makea post request to:
#### `/graphs/:type`
where :type is the parameter for the type of graph.<br><br>
the current supported graph types are(subject to be updated): 
- vendiagram 
- linegraph

the body of this request must have **ALL** the same properies as shown in the dummyData.txt file in this folder. <br><br>
you can also refer to models/Schemas.ts to see exactly how the data must be structured.<br><br>
finally in order to delete a graph you must make a **DELETE** request to:
#### `/graphs/:type/:id`
where :type is the type of graph and :id is the account id you want to remove the graph from.
if the type of graph is unsupported or the id is invalid the server will let you know.





