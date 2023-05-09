package main

import (
	"fmt"
	"log"
	"strings"

	"github.com/tnp2004/poller/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gopkg.in/go-playground/validator.v9"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Message     string
}

func main() {
	app := fiber.New()
	api := app.Group("/api")
	poll := api.Group("/poll")

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	poll.Get("", GetPolls)
	poll.Post("/new", NewPoll)
	poll.Delete("/delete/:id", DeletePoll)
	poll.Patch("/update/:id/:option", UpdatePoll)

	log.Fatal(app.Listen(":4000"))
}

func GetPolls(c *fiber.Ctx) error {
	q := c.Query("tags")
	tags := strings.Split(q, ",")
	if len(tags) != 0 && q != "" {
		fillteredPolls := database.GetPollsByTags(tags)
		return c.JSON(fillteredPolls)
	}

	return c.JSON(database.GetPolls())
}

func NewPoll(c *fiber.Ctx) error {
	poll := &database.Poll{}

	if err := c.BodyParser(poll); err != nil {
		return err
	}

	errors := ValidateInsertPoll(*poll)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)

	}

	pollsData := database.InsertPoll(*poll)

	return c.JSON(pollsData)
}

func DeletePoll(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
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

var validate = validator.New()

func ValidateInsertPoll(poll database.Poll) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(poll)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.Field()
			element.Tag = err.Tag()
			errMessage := fmt.Sprintf("%v field is %v", err.Field(), err.Tag())
			element.Message = errMessage
			errors = append(errors, &element)
		}
	}
	return errors
}
