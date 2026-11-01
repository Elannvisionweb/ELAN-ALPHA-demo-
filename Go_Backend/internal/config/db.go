package config

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func ConnectDatabase() {
	databaseURL := os.Getenv("DATABASE_URL")

	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	var err error
	DB, err = pgx.Connect(context.Background(), databaseURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Test connection
	var version string
	err = DB.QueryRow(context.Background(), "SELECT version()").Scan(&version)
	if err != nil {
		log.Fatal("Failed to query database:", err)
	}

	log.Println("Successfully connected to PostgreSQL database")
	log.Println("Database version:", version)
}

func GetDB() *pgx.Conn {
	return DB
}

func CloseDB() {
	if DB != nil {
		DB.Close(context.Background())
		log.Println("Database connection closed")
	}
}
