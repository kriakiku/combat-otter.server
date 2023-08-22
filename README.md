# 📈 Combat Otter: Server side 🥷

The server part of the Combat Otter project. This includes the entire infrastructure and frontends.

## Migrations

To make global changes to the database use the `./migrations` module. 


### Enviroment

To work with migrations, you will need to pass the following ENV variables:

```env
COUCHDB_USER="admin"
COUCHDB_PASSWORD="super-sercet-password"
COUCHDB_SERVER="http://127.0.0.1:5984"
```

### New migration creation

The migration file generation process is automated. To create a new file, use the command:

```sh
# yarn nano:add
```


### Migrations execution:

To perform migrations, run the command:

```sh
# yarn nano:migrate
```

A migrations table will be created in the database to monitor the status of migrations