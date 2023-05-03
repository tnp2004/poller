package main

import (
	"github.com/tnp2004/poller/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/api/polls", func(c *fiber.Ctx) error {
		return c.JSON(database.GetPolls())
	})

	app.Post("/api/poll/new", func(c *fiber.Ctx) error {
		poll := &database.Poll{}

		if err := c.BodyParser(poll); err != nil {
			return err
		}
		pollsData := database.InsertDB(*poll)

		return c.JSON(pollsData)
	})

	app.Listen(":4000")
}
