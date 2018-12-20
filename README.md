# auth-webpart

This is a simple helper webpart to confirm that a service can accept the current user OAuth token.
The only part that needs have to be changed is in */config/package-solution.json*, 
setting a valid webApiPermissionRequests so as to who this webpart will authenticate as / for.

Ex.:
```
"webApiPermissionRequests": [{
    "resource": "Authentication Azure Function",
    "scope": "user_impersonation"
}]
```

## Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

## Azure function

See  `/azure-function/run.csx`, for code sample to echo back the `ClaimsPrincipals` received by an Azure Function.

### Seting-up the Azure function




## Build options

gulp clean

gulp test

gulp serve

gulp bundle --ship

gulp package-solution --ship
