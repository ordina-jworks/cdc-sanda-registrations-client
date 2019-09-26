# Sanda-registrations-client
Hands-on session on Consumer-driven Contract Testing.

The UI service Sanda-Registrations represents the UI for fighter registrations.

## Dependencies
Ionic and Angular

```
npm i -g ionic @angular/cli
```

## Installation
Clone this repository
 
```
npm i
```

## Dev environment on localhost:4200
```
npm run hmr
```

## Run a mock server on localhost:8540
You will need wiremock stubs to reach any endpoint
```
npm run wiremock
```

## Publish pact files to the pact broker
```
npm run pact:publish
```

#### Other services that are used
- [sanda-registrations](https://github.com/ordina-jworks/cdc-sanda-registrations)
