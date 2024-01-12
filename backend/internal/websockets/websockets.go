package websockets

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool {
        // You can customize this function to allow specific origins
        // Example: Allow all origins
        return true
    },
}

// HandleConnection handles WebSocket connections
func HandleConnection(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer conn.Close()

    for {
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            return
        }

        fmt.Printf("Received message from client: %s\n", string(p))

        if err := conn.WriteMessage(messageType, p); err != nil {
            return
        }
    }
}