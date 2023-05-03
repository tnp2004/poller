package database

import (
	"errors"
	"time"
)

var timeFormat = "Monday, 2 January, 2006 3:04:05 PM"

type Poll struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	Content    string `json:"content"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

var pollDB = []Poll{}

func GetPolls() []Poll {
	return pollDB
}

func InsertPoll(poll Poll) []Poll {
	nowTime := time.Now().Format(timeFormat)
	poll.ID = len(pollDB) + 1
	poll.Created_at = nowTime
	poll.Updated_at = nowTime
	pollDB = append(pollDB, poll)

	return pollDB
}

func DeletePoll(id int) ([]Poll, error) {
	for i, poll := range pollDB {
		if id == poll.ID {
			pollDB = deleteData(pollDB, i)

			return pollDB, nil
		}
	}

	return nil, errors.New("Poll not found")
}

func deleteData(polls []Poll, i int) []Poll {
	polls = append(polls[:i], polls[i+1:]...)
	return polls
}
