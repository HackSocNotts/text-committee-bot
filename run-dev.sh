#!/bin/bash
docker build -t hacksoc/text-committee-bot:livedev .
docker run --env-file .env --rm -it -v `pwd`/volumes/database/:/usr/app/database/ -p 3000:3000 hacksoc/text-committee-bot:livedev
docker rmi \`docker images -qa -f 'dangling=true'\`