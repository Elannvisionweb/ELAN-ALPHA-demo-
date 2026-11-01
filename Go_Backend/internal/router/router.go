package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/handlers"
	"github.com/kamalkoushikd/Elan_Beta_Hosted/Go_Backend/internal/middleware"
)

func NewRouter() *gin.Engine {

	router := gin.Default()

	router.Use(middleware.CORSMiddleWare())

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Backend is running with Gin Router")
	})

	// PUBLIC ROUTES

	router.GET("/health", handlers.CheckHealthHandler)
	router.POST("/submitFestPassForm", handlers.SubmitFestPassFormHandler)

	return router

}
