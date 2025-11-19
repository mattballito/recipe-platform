# Use official Go image
FROM golang:1.25

WORKDIR /app
COPY . .

RUN go mod tidy
RUN go build -o backend .

CMD ["./backend"]

