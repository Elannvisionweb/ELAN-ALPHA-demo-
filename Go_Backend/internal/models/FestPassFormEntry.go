package models

import "time"

type FestPassFormEntry struct {
	ID           int       `json:"id"`
	FullName     string    `json:"fullName" binding:"required"`
	MobileNumber string    `json:"mobileNumber" binding:"required"`
	Email        string    `json:"email" binding:"required,email"`
	CreatedAt    time.Time `json:"createdAt"`
}
