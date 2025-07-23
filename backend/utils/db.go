package utils

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDatabase() error {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return fmt.Errorf("DATABASE_URL environment variable is required")
	}

	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		return fmt.Errorf("Failed to parse database URL: %v", err)
	}

	db, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		return fmt.Errorf("Failed to create database pool: %v", err)
	}

	if err := pingDB(db, 5); err != nil {
		db.Close()
		return fmt.Errorf("Failed to ping database pool: %v", err)
	}

	DB = db
	log.Println("Database pool connection initialized successfully")
	return nil
}

func pingDB(db *pgxpool.Pool, timeout int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeout)*time.Second)
	defer cancel()

	if err := db.Ping(ctx); err != nil {
		return fmt.Errorf("Failed to ping database pool: %v", err)
	}

	return nil
}