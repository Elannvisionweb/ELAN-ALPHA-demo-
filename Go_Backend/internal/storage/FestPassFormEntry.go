package storage

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/models"
)

func AddFestPassFormEntry(db *pgx.Conn, entry *models.FestPassFormEntry) error {
	query := `
		INSERT INTO fest_pass_form_entries (full_name, mobile_number, email, created_at)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at
	`

	entry.CreatedAt = time.Now()

	err := db.QueryRow(
		context.Background(),
		query,
		entry.FullName,
		entry.MobileNumber,
		entry.Email,
		entry.CreatedAt,
	).Scan(&entry.ID, &entry.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

func CheckDuplicateEntry(db *pgx.Conn, email string, mobileNumber string) (emailExists bool, mobileExists bool, err error) {
	// Check both email and mobile number in a single query
	query := `
		SELECT 
			EXISTS(SELECT 1 FROM fest_pass_form_entries WHERE email = $1) as email_exists,
			EXISTS(SELECT 1 FROM fest_pass_form_entries WHERE mobile_number = $2) as mobile_exists
	`

	err = db.QueryRow(context.Background(), query, email, mobileNumber).Scan(&emailExists, &mobileExists)
	if err != nil {
		return false, false, err
	}

	return emailExists, mobileExists, nil
}
