TWEE = tweego
SRC = src
TARGET = index.html
RESOURCES = resources/

all:build resources

build:resources
	$(TWEE) -o bin/$(TARGET) $(SRC)

watch:resources
	$(TWEE) -w -o bin/$(TARGET) $(SRC)

debug:resources
	$(TWEE) -w -t -o bin/$(TARGET) $(SRC)

resources:
	@echo "Copying the resources"
	mkdir bin/resources
	cp -r $(RESOURCES) bin/resources

.PHONY : all

clean:
	-rm bin/*