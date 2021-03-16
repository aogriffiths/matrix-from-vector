TMP_DIR=temp
LIB_DIR=lib
PXT_DIR=pxt
DIST_DIR=dist

PXT_FILES := $(wildcard $(PXT_DIR)/*.ts)
SRC_FILES := $(wildcard $(LIB_DIR)/*.ts)
TMP_FILES := $(patsubst $(LIB_DIR)/%.ts,$(TMP_DIR)/$(LIB_DIR)/%.ts,$(SRC_FILES))
DIST_FILES := $(patsubst $(LIB_DIR)/%.ts,$(DIST_DIR)/%.js,$(SRC_FILES))


#https://swcarpentry.github.io/make-novice/reference.html

.PHONY: build
build: $(DIST_FILES)

# TypeScript compile
# DIST_FILES: TMP_FILES
# A pattern rule using %, but depends on having all TMP_FILES in place before
# compiling them, because each temp file may have interdependancies
$(DIST_DIR)/%.js: $(TMP_FILES) $(DIST_DIR)
	npx tsc

# Preprocess
# TMP_FILES: SRC_FILES
$(TMP_DIR)/$(LIB_DIR)/%.ts: $(LIB_DIR)/%.ts ${PXT_FILES} $(TMP_DIR)/$(LIB_DIR)
	npx preprocessor $< $(LIB_DIR) > $@

# Test
.PHONY: test_code
test_code: build
	npm run test:code


# Directories:
$(DIST_DIR):
	mkdir -p "$(DIST_DIR)"

$(TMP_DIR)/$(LIB_DIR):
	mkdir -p "$(TMP_DIR)/$(LIB_DIR)"

.PHONY: clean
clean:
	rm -rf dist
	rm -rf temp

.PHONY: watch
watch:
	npm run watch
