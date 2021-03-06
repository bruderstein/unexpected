REPORTER = dot

TARGETS ?= unexpected.js

lint:
	@./node_modules/.bin/jshint --exclude test/documentation.spec.js lib/*.js test/*.js

.PHONY: lint

unexpected.js: lib/*
	(echo '/*!' && <LICENSE sed -e's/^/ * /' | sed -e's/\s+$$//' && echo ' */' && ./node_modules/.bin/browserify -p bundle-collapser/plugin -e lib -s weknowhow.expect) > $@

.PHONY: unexpected.js

test-phantomjs: ${TARGETS}
	@$(eval QUERY=$(shell node -e "console.log(decodeURIComponent(process.argv.pop()).replace(/\s/g, '%20'))" "${grep}")) \
    ./node_modules/.bin/mocha-phantomjs test/tests.html?grep=${QUERY}

test-jasmine: ${TARGETS}
	./node_modules/.bin/jasmine JASMINE_CONFIG_PATH=test/support/jasmine.json

test-jasmine-browser: unexpected.js
	@./node_modules/.bin/serve .

test: lint
	mocha

.PHONY: test

.PHONY: coverage
coverage:
	NODE_ENV=development ./node_modules/.bin/istanbul cover \
		-x unexpected.js \
		-x **/vendor/** \
		-x **/site/** \
		-x **/site-build/** \
		-x **/documentation/** \
		-x lib/testFrameworkPatch.js \
		-x generate-site.js \
		--report text \
		--report lcov \
	--include-all-sources ./node_modules/mocha/bin/_mocha -- --reporter dot
	@echo google-chrome coverage/lcov-report/index.html

.PHONY: test-browser
test-browser: unexpected.js
	@./node_modules/.bin/serve .

travis: lint test test-phantomjs test-jasmine coverage site-build
	-<coverage/lcov.info ./node_modules/coveralls/bin/coveralls.js

.PHONY: git-dirty-check
git-dirty-check:
ifneq ($(shell git describe --always --dirty | grep -- -dirty),)
	$(error Working tree is dirty, please commit or stash your changes, then try again)
endif

.PHONY: deploy-site
deploy-site: site-build
	./node_modules/.bin/deploy-site site-build && \
    git push git@github.com:unexpectedjs/unexpectedjs.github.io.git +site-build:master

.PHONY: commit-unexpected
commit-unexpected: unexpected.js
	git add unexpected.js
	if [ "`git status --porcelain`" != "" ]; then \
		git commit -m "Build unexpected.js" ; \
	fi

.PHONY: release-%
release-%: git-dirty-check lint ${TARGETS} test-phantomjs commit-unexpected deploy-site
	npm version $*
	@echo $* release ready to be publised to NPM
	@echo Remember to push tags

.PHONY: clean
clean:
	-rm -fr ${TARGETS} coverage

.PHONY: site-build
site-build:
	npm run generate-site

.PHONY: update-examples
update-examples:
	npm run update-examples
