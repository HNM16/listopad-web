

IMAGE:=harbor.listopad.tj/website/website

compile: build upload

build: 
	docker build -t website .

upload:
	docker tag website $(IMAGE):latest
	docker push $(IMAGE):latest
	
run:
	docker run --name website -p 3000:3000 $(IMAGE):latest

