# homework
A takehome task for a weekends day

## Setup
Both client and server are in this repository and are handled seperatly.

### Client
Go to /client and install all dependencies with:
```
yarn install
```
The client is running a newer TS version than VS-Code. So if you have type errors open ./client in you IDE and the project version of typescript should be picked up. If not automatically do:
```
Shift + Ctrl + P > Select Typescript Version > use the workspace version
```

### Backend
Go to /server and install all dependencies with:
```
yarn install
```
The types are shared with the frontend. This should work out of the box but if you experience problems read **Types**.


### Types
The latest types should be in the project. But you can also generate Typescript types by running:
```
yarn run generate-types
```
in the client. Types are shared with the backend through a softlink (for simplicity). This should work, **only if not** create a softlink from project origin with:
```
sudo ln -s ./client/src/generated  ./server/types
```


# My opinion
Since you asked for my opinion I would like to share a few brief thoughts about this demo project. I liked the project idea and a lot of very common actions were involved to solve this task. It was a lot for a short day of work especially with setup tasks. Midways I had to throw styling overboard just to finish as much functionality as I could in the time. The tasks were easy and I didnt face great problems I couldnt solve it was just the abundance of requirements that had to be solved. I wish the horizon of this tasks would have been a bit smaller so I could have presented what I can do good but rush through the ACs.

## What am I satisfied with, what could have been better
I think for the limited time the overall quality is okish. I am using graphql as my API which worked out nicely. I have used an unfamiliar server library for the gql-implementation didnt provide much difficulty except that I couldnt properly pass context through the resolvers and used a shared instance of the "dataStore" instead. I would have chosen MongoDB as my DB of choice but I ended up not implementing a proper DB because the installation, proper setup and connection would have consumed too much time and those things should be done properly. I would have done this better and more robust the next time, after all I want to gather more experience in backend work.

Most time was spent in the frontend. I didnt manage to implement all ACs or didnt fullfil some to full satisfaction. The Timer is missing some functionality which I recognized later. The update of any timer is only partially implemented, you can upgrade the description but not the date. If I would do it again I would completly neglect styling and other "iceing on the cake" like ErrorBoundaries and proper styling and fully focus on the functionality. I am satisfied with my typing and the overall composition I achieved in the time even though I havnt finished.

Thanks for reading and testing out my challenge.



