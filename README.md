# accounts

## postgresql

```sh
# docker to open bash
docker exec -it accounts-main_postgres-db_1 bas

# docker to open plsql
docker exec -it accounts-main_postgres-db_1 psql -U prisma -W dev
# flags
-it # for interactive
-U # for username
-W # database

# postgresql terminal commands list
```

## redis commands

```sh
docker exec -it accounts-main_cache_1 redis-cli -a secret
# flags
-it # for interactive
redis-cli # to load redis command line interface
-a # cli password

# redis commands
scan 0
get "sess:lHoGnDimxq3Lz5j0cRWuEp3wivXtgSBB"
ttl "sess:lHoGnDimxq3Lz5j0cRWuEp3wivXtgSBB"
del "sess:lHoGnDimxq3Lz5j0cRWuEp3wivXtgSBB"
```
