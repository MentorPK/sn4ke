package main

import (
	"backend/internal/websockets"
	"net/http"
)

func main() {
    http.HandleFunc("/ws", websockets.HandleConnection)
    http.ListenAndServe(":8080", nil)
}