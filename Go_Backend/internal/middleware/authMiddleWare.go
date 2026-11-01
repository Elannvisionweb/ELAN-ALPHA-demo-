package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleWare() gin.HandlerFunc {

	return func(c *gin.Context) {
		
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"error" : "Missing or Invalid AUthorization Header"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		secret := []byte(os.Getenv("JWT_SECRET"))

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrSignatureInvalid
			}
			return secret, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error" : "Invalid or Expired Token"})
			c.Abort()
			return 
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || claims["id"] == nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error" : "Invalid Token Claims"})
			c.Abort()
			return
		}

		if _, ok := claims["exp"]; !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error" : "Token Missing Expiration"})
			c.Abort()
			return
		}

		c.Set("userID", claims["id"].(string))

		c.Next()

	}

}