run: export NODE_ENV=production
run:
    node app.js
build: export NODE_ENV=production
build:
    node node_modules/.bin/webpack -p --progress
    node app.js
watch: export NODE_ENV=development
watch:
    node_modules/.bin/webpack --watch
    node app.js
test: export NODE_ENV=development
test:
    node app.js
debug: export NODE_ENV=development
debug:
    node debug app.js
