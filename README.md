## auth-webpart

This is a simple helper webpart to confirm that a serve can accept the current user OAuth token.
The only part that might have to be fixe for your use case is in */config/package-solution.json*, 
setting a valid value for `{ "resource": "Authentication Azure Function" }` so as to who this webpart 
will authenticate as / for.

### Building the code

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

### Build options

gulp clean

gulp test

gulp serve

gulp bundle

gulp package-solution
