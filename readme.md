## Initialize

yarn must be installed in running machine, dependencies are defined inside.
There's no need to install entire Keystone

## Run the following
- `docker build` 

- `yarn dev` to start a dev instance of Keystone5
- `yarn create-tables` to create tables in an empty database, if the database contains tables generated previously, skip this step.
- `yarn start` start Keystone in production mode, needs cookieSecrects provided in Keystone's `index.js`

## Reference

- https://www.keystonejs.com/tutorials/new-project
- https://www.keystonejs.com/guides/custom-schema