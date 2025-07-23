package handlers 

import (
	"encoding/json"
	"net/http"
	"nimble/utils"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/gorilla/mux"
)

type AuthHandler struct {
	db *pgxpool.Pool
}

func NewAuthHandler(db *pgxpool.Pool) *AuthHandler {
	return &AuthHandler{db: db}
}

func (handler *AuthHandler) RegisterRoutes(r *mux.Router) {
	auth := r.PathPrefix("/api/v1/auth").Subrouter()
	auth.HandleFunc("/signup", handler.Signup).Methods("POST")
}

func (handler *AuthHandler) Signup(response http.ResponseWriter, request *http.Request) {
	var signupRequest struct {
		Email string `json:"email"`
		Password string `json:"password"`
		Name string `json:"name"`
	}

	if err := json.NewDecoder(request.Body).Decode(&signupRequest); err != nil {
		utils.RespondWithError(response, http.StatusBadRequest, "Invalid request")
		return
	}

	tx, err := handler.db.Begin(request.Context())
	if err != nil {
		utils.RespondWithError(response, http.StatusInternalServerError, "Failed to start transaction")
		return
	}
	defer tx.Rollback(request.Context())
}