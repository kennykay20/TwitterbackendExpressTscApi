#!/bin/bash

npm run prebuild

npm run build

npm run start:prod

# npx prisma migrate dev --name "init"

tail -f /dev/null

#EOF