package types

type User struct {
	UUID string `json:"uuid"`
	Name string `json:"name"`
}

type GameState struct {
	IsRunning        bool `json:"isRunning"`
	ConnectedPLayer1 User `json:"connectedPlayer1"`
	ConnectedPlayer2 bool `json:"connectedPlayer2"`
}

type Session struct {
	ID        string    `json:"id"`
	Player1   User      `json:"player1"`
	Player2   User      `json:"player2"`
	GameState GameState `json:"gameState"`
	// Other session specific data
}