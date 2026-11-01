package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckHealthHandler(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"status" : "ok",
		"message" : "Elan Backend is Alive!",
	})

}