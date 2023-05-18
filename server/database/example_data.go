package database

import (
	"encoding/json"
	"fmt"
)

func GetExampleData() []Poll {
	pollData := `[{"ID":1,"title":"Favorite Movie Genre","content":"Vote for your favorite movie genre and let us know which genre captivates you the most.","colour":"#fa5c5c","options":[{"choice":"Action","colour":"#31f770","point":5},{"choice":"Comedy","colour":"#ea5c5c","point":3},{"choice":"Drama","colour":"#42a5f5","point":7},{"choice":"Romance","colour":"#ffc107","point":2},{"choice":"Science Fiction","colour":"#9c27b0","point":0}],"tags":["Movies","Entertainment"]},{"ID":2,"title":"Ideal Travel Destination","content":"Cast your vote for the ideal travel destination you would love to explore on your next adventure.","colour":"#be4bdb","options":[{"choice":"Beach Paradise","colour":"#31f770","point":8},{"choice":"Historical Landmarks","colour":"#ea5c5c","point":4},{"choice":"Mountain Retreat","colour":"#42a5f5","point":6},{"choice":"Urban Exploration","colour":"#ffc107","point":1},{"choice":"Wilderness Adventure","colour":"#9c27b0","point":0}],"tags":["Travel","Adventure"]},{"ID":3,"title":"Best Superpower to Have","content":"If you could have any superpower, which one would you choose? Vote for the superpower you find most fascinating.","colour":"#4c6ef5","options":[{"choice":"Flight","colour":"#31f770","point":7},{"choice":"Invisibility","colour":"#ea5c5c","point":2},{"choice":"Super Strength","colour":"#42a5f5","point":5},{"choice":"Telepathy","colour":"#ffc107","point":3},{"choice":"Time Travel","colour":"#9c27b0","point":6}],"tags":["Superpowers","Imagination"]},{"ID":4,"title":"Favorite Music Genre","content":"Share your favorite music genre with us and let us know the genre that resonates with you the most.","colour":"#12b886","options":[{"choice":"Pop","colour":"#31f770","point":4},{"choice":"Rock","colour":"#ea5c5c","point":8},{"choice":"Hip Hop","colour":"#42a5f5","point":6},{"choice":"Country","colour":"#ffc107","point":2},{"choice":"Electronic","colour":"#9c27b0","point":3}],"tags":["Music","Preferences"]},{"ID":5,"title":"Preferred Social Media Platform","content":"Which social media platform do you prefer to use the most? Cast your vote and let us know your go-to platform for socializing online.","colour":"#f7c143","options":[{"choice":"Facebook","colour":"#31f770","point":9},{"choice":"Instagram","colour":"#ea5c5c","point":6},{"choice":"Twitter","colour":"#42a5f5","point":4},{"choice":"LinkedIn","colour":"#ffc107","point":3},{"choice":"TikTok","colour":"#9c27b0","point":2}],"tags":["Social Media","Online"]}]`

	var example_polls []Poll
	err := json.Unmarshal([]byte(pollData), &example_polls)
	if err != nil {
		fmt.Println("Error:", err)
		return nil
	}

	return example_polls
}
