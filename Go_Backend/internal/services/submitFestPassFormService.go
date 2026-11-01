package services

import (
	"errors"
	"regexp"

	"github.com/jackc/pgx/v5"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/models"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/storage"
)

func SubmitFestPassForm(db *pgx.Conn, entry *models.FestPassFormEntry) error {
	// Validate full name
	if entry.FullName == "" {
		return errors.New("Full Name Is Required")
	}

	// Validate mobile number (basic validation for 10 digits)
	mobileRegex := regexp.MustCompile(`^[0-9]{10}$`)
	if !mobileRegex.MatchString(entry.MobileNumber) {
		return errors.New("Mobile Number Must Be 10 Digits")
	}

	// Validate email format
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	if !emailRegex.MatchString(entry.Email) {
		return errors.New("Invalid Email Format")
	}

	// Check for duplicate email or mobile number
	emailExists, mobileExists, err := storage.CheckDuplicateEntry(db, entry.Email, entry.MobileNumber)
	if err != nil {
		return errors.New("Failed To Verify Registration Details")
	}

	// Return specific error messages based on what's duplicate
	if emailExists && mobileExists {
		return errors.New("Both Email And Mobile Number Are Already Registered")
	} else if emailExists {
		return errors.New("This Email Is Already Registered")
	} else if mobileExists {
		return errors.New("This Mobile Number Is Already Registered")
	}

	// Add entry to database
	err = storage.AddFestPassFormEntry(db, entry)
	if err != nil {
		return errors.New("Failed To Save Registration")
	}

	return nil
}
