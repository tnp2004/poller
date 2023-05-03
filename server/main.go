package main

import (
	"fmt"

	"github.com/tnp2004/poller/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/api/poll", func(c *fiber.Ctx) error {
		return c.JSON(database.GetPolls())
	})

	app.Post("/api/poll/new", func(c *fiber.Ctx) error {
		poll := &database.Poll{}

		if err := c.BodyParser(poll); err != nil {
			return err
		}
		pollsData := database.InsertPoll(*poll)

		return c.JSON(pollsData)
	})

	app.Delete("/api/poll/delete/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		fmt.Println(id)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Poll id must be a numbers only",
			})
		}

		pollsData, err := database.DeletePoll(id)
		if err != nil {
			errMessage := fmt.Sprintf("Poll id: %v not found", id)
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": errMessage,
			})
		}

		return c.JSON(pollsData)
	})

	app.Listen(":4000")
}
