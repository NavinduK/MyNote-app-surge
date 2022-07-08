build:
	cd server && docker build -t mynote-server .
	cd client && docker build -t mynote-client .

run:
	docker-compose up

stop:
	docker-compose down