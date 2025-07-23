package utils

import (
	"log"
	"os"

	supa "github.com/supabase-community/supabase-go"
)

var SupabaseClient *supa.Client

func InitSupabase() error {
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")

	client, err := supa.NewClient(supabaseURL, supabaseKey, nil)
	if err != nil {
		return err
	}

	SupabaseClient = client
	log.Println("Supabase client initialized successfully")
	return nil
}