# shopping-list-angularjs-webpack

run `npm install` at `/ClientApp` to install npm dependencies

## Development server

Run `npm run start` at `/ClientApp` folder for a dev server.You will be navigated to `http://localhost:8080/`. The app will automatically reload if you change any of the source. Clent app requires running WebApi server to work pro[erly]

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `/WebApplication/dist` directory.

## Web Api

In order to serve application from `/` adress add `<base href="/dist/"/>` in `<head>` of `/WebApplication/dist/index.html`.
after running webpack build.