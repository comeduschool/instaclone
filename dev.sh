#!/bin/bash
docker network create instaclone
docker run -d -p 9990:5432 -e POSTGRES_DB=service -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=1234 --name instaclone-db --net instaclone postgres 
docker build -t instaclone:test .
docker run -it -p 9991:8000 -p 9992:3000 -v $(PWD):/code --name instaclone --net instaclone instaclone:test