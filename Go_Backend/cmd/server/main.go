package main

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/config"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/router"
)

func main() {

	// Load .env file if it exists (for local development)
	_ = godotenv.Load()

	// Connect to database
	config.ConnectDatabase()
	defer config.CloseDB()

	configurer := config.LoadConfig()
	router := router.NewRouter()

	fmt.Println("Server starting on port " + configurer.Port)

	err := router.Run(configurer.Port)
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}

}
