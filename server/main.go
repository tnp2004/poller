package main

import (
	"fmt"
	"log"

	"github.com/tnp2004/poller/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/api/poll", GetPolls)
	app.Post("/api/poll/new", NewPoll)
	app.Delete("/api/poll/delete/:id", DeletePoll)
	app.Patch("/api/poll/update/:id/:option", UpdatePoll)

	log.Fatal(app.Listen(":4000"))
}

func GetPolls(c *fiber.Ctx) error {
	return c.JSON(database.GetPolls())
}

func NewPoll(c *fiber.Ctx) error {
	poll := &database.Poll{}

	if err := c.BodyParser(poll); err != nil {
		return err
	}
	pollsData := database.InsertPoll(*poll)

	return c.JSON(pollsData)
}

func DeletePoll(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	fmt.Println(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Poll id must be a numbers only",
		})
	}

	pollsData, err := database.DeletePoll(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(pollsData)
}

func UpdatePoll(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Poll id must be a numbers only",
		})
	}
	option := c.Params("option")

	pollsData, err := database.UpdatePoint(id, option)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(pollsData)
}
