package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ProtectedHandler(c *gin.Context) {

	userID := c.GetString("userID")

	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error" : "UserID missing from context"})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "You have accessed a protected route!",
		"userID" : userID,
	})


}