package services

import (
	"fmt"
	"net/smtp"
	"os"
)

type EmailService struct {
	From     string
	Password string
	SMTPHost string
	SMTPPort string
}

func NewEmailService() *EmailService {
	return &EmailService{
		From:     os.Getenv("SMTP_EMAIL"),
		Password: os.Getenv("SMTP_PASSWORD"),
		SMTPHost: os.Getenv("SMTP_HOST"),
		SMTPPort: os.Getenv("SMTP_PORT"),
	}
}

func (e *EmailService) SendFestPassConfirmation(toEmail, fullName string) error {
	subject := "Your Fest Pass Registration is Confirmed!"

	body := fmt.Sprintf(`Hi %s,

Thank you for registering for your Elan & nVision 2026 Fest Pass!
Your registration has been successfully received.

We're excited to have you join us. Your personalised fest pass will be sent to your registered email closer to the fest dates.

If you have any questions or face any issues, feel free to reach out to us at elan.nvision.web@sa.iith.ac.in

Looking forward to seeing you at the fest!
Team Elan & nVision 2026, IIT Hyderabad`, fullName)

	// Compose email message
	message := []byte(fmt.Sprintf("From: %s\r\n"+
		"To: %s\r\n"+
		"Subject: %s\r\n"+
		"MIME-Version: 1.0\r\n"+
		"Content-Type: text/plain; charset=\"UTF-8\"\r\n"+
		"\r\n"+
		"%s\r\n", e.From, toEmail, subject, body))

	// Authentication
	auth := smtp.PlainAuth("", e.From, e.Password, e.SMTPHost)

	// Sending email
	addr := fmt.Sprintf("%s:%s", e.SMTPHost, e.SMTPPort)
	err := smtp.SendMail(addr, auth, e.From, []string{toEmail}, message)
	if err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}
