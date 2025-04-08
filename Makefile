# Copyright © Carecode Oy. All rights reserved.

VERSION := 1.0.1

.PHONY: help
help: ## Show help about Makefile targets
	@awk -F ':|##' '/^[^\t].+?:.*?##/ { printf "\033[36;1m%-16s\033[0m %s\n", $$1, $$NF }' $(MAKEFILE_LIST)

.PHONY: fmt
fmt: ## Format source code
	prettier -w src/*.ts src/*.json src/*.html

.PHONY: build
build: build/popup.js build/manifest.json build/index.html build/ftn-verifier.png # Build source

build/popup.js: src/popup.ts node_modules
	tsc

build/%: src/%
	cp $< build/

build/web-ext-artifacts/ftn_verifier-$(VERSION).zip: build
	cd build; npx web-ext build --overwrite-dest; cd -

.PHONY: web-ext-build
web-ext-build: build/web-ext-artifacts/ftn_verifier-$(VERSION).zip ## Build ext

.PHONY: sign
sign: build/web-ext-artifacts/ftn_verifier-$(VERSION).zip # Sign and publish
	cd build; npx web-ext sign \
		--channel=listed \
		--amo-metadata=../src/amo.json \
		--api-key=$(JWT_ISSUER) \
		--api-secret=$(JWT_SECRET); cd -

node_modules:
	npm i

.PHONY: lint
lint: build ## Lint source code
	cd build; npx web-ext lint; cd -

.PHONY: clean
clean: ## Remove build output
	rm -rf build

.PHONY: realclean
realclean: clean ## Remove dependencies
	rm -rf node_modules
