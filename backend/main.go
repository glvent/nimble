package main

import (
	"log"
	"net/http"
	"nimble/utils"

	"github.com/gorilla/mux"
)

func main() {
	if err := utils.InitDatabase(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer utils.DB.Close()

	if err := utils.InitSupabase(); err != nil {
		log.Fatalf("Failed to initialize Supabase client: %v", err)
	}

	router := mux.NewRouter()

	address := ":8080"
	log.Printf("API listening on %s", address)
	log.Fatal(http.ListenAndServe(address, router))
}
