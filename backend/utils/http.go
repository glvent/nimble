package utils

import (
	"encoding/json"
	"net/http"
)

func RespondWithJSON(writer http.ResponseWriter, status int, data interface{}) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	json.NewEncoder(writer).Encode(data)
}

func RespondWithError(writer http.ResponseWriter, status int, message string) {
	RespondWithJSON(writer, status, map[string]interface{}{
		"error": true,
		"message": message,
	})
}