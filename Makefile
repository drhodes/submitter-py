
GO=$(shell which go)

build:
	$(GO) build	

send-to-mathtech:
	rsync -ravP ./js/custom.js derek@mathtech.org:/tmp/
	rsync -ravP ./submitter.py derek@mathtech.org:/tmp/
	rsync -ravP ~/dev/x18/test-labs/labconfig.yaml derek@mathtech.org:/tmp/
# http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help:
	@grep -E '^[\\.a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk \
	'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

FORCE:

