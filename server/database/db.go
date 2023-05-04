package database

import (
	"errors"
	"fmt"
	"strings"
	"time"
)

var timeFormat = "Monday, 2 January, 2006 3:04:05 PM"

type Poll struct {
	ID         int            `json:"id"`
	Title      string         `json:"title" validate:"required"`
	Content    string         `json:"content" validate:"required"`
	Options    map[string]int `json:"options" validate:"required"`
	Created_at string         `json:"created_at"`
	Updated_at string         `json:"updated_at"`
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
	errMessage := fmt.Sprintf("Can not delete, Poll id: %v not found", id)
	return nil, errors.New(errMessage)
}

func deleteData(polls []Poll, i int) []Poll {
	polls = append(polls[:i], polls[i+1:]...)
	return polls
}

func UpdatePoint(id int, opt string) ([]Poll, error) {
	opt = strings.ToLower(opt)
	for i, poll := range pollDB {
		if id == poll.ID {
			_, ok := pollDB[i].Options[opt]
			if ok {
				pollDB[i].Options[opt]++
				pollDB[i].Updated_at = time.Now().Format(timeFormat)
				return pollDB, nil
			}
			errMessage := fmt.Sprintf("Can not update, Poll option: %v does not exist", opt)
			return nil, errors.New(errMessage)
		}
	}
	errMessage := fmt.Sprintf("Can not update, Poll id: %v not found", id)
	return nil, errors.New(errMessage)
}
