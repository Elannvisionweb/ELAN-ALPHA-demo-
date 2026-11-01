package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/config"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/models"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/services"
)

func SubmitFestPassFormHandler(c *gin.Context) {
	var entry models.FestPassFormEntry

	// Bind JSON request to entry struct
	if err := c.ShouldBindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid Request Data",
			"message": "Please Check Your Input And Try Again",
		})
		return
	}

	// Get database connection
	db := config.GetDB()

	// Call service to process and save entry
	err := services.SubmitFestPassForm(db, &entry)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Registration Failed",
			"message": err.Error(),
		})
		return
	}

	// Send confirmation email
	emailService := services.NewEmailService()
	err = emailService.SendFestPassConfirmation(entry.Email, entry.FullName)
	if err != nil {
		// Log the error but don't fail the request
		log.Printf("Failed to send confirmation email to %s: %v", entry.Email, err)
		// You might want to add a flag to the response indicating email wasn't sent
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Fest Pass Registration Successful",
		"data":    entry,
	})
}
