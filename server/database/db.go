package database

import (
	"errors"
	"fmt"
	"net/url"
	"time"
)

var timeFormat = "Monday, 2 January, 2006 3:04:05 PM"

type Option struct {
	Choice string `json:"choice" validate:"required"`
	Colour string `json:"colour" validate:"required"`
	Point  int    `json:"point"`
}

type Poll struct {
	ID         int      `json:"id"`
	Title      string   `json:"title" validate:"required"`
	Content    string   `json:"content" validate:"required"`
	Colour     string   `json:"colour" validate:"required"`
	Options    []Option `json:"options" validate:"required"`
	Tags       []string `json:"tags"`
	Created_at string   `json:"created_at"`
	Updated_at string   `json:"updated_at"`
}

var pollDB = GetExampleData()

func GetPolls() []Poll {
	return pollDB
}

func GetPoll(id int) (*Poll, error) {
	for _, poll := range pollDB {
		if poll.ID == id {
			return &poll, nil
		}
	}

	errMessage := fmt.Sprintf("Poll id: %v not found", id)
	return nil, errors.New(errMessage)
}

func GetPollsByTags(tags []string) []Poll {
	matchingProducts := findMatchingPolls(pollDB, tags)
	if matchingProducts != nil {
		return matchingProducts
	}
	return []Poll{}
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

func UpdatePoint(id int, opt string) (*Poll, error) {
	for i, poll := range pollDB {
		if id == poll.ID {
			for j, p := range poll.Options {
				decodeOption, _ := url.QueryUnescape(opt)
				if p.Choice == decodeOption {
					pollDB[i].Options[j].Point++
					pollDB[i].Updated_at = time.Now().Format(timeFormat)
					return &pollDB[i], nil
				}
			}
			errMessage := fmt.Sprintf("Can not update, Poll option: %v does not exist", opt)
			return nil, errors.New(errMessage)
		}
	}
	errMessage := fmt.Sprintf("Can not update, Poll id: %v not found", id)
	return nil, errors.New(errMessage)
}

func findMatchingPolls(Polls []Poll, searchTags []string) []Poll {
	var matchingPolls []Poll
	for _, Poll := range Polls {
		if tagsMatchAll(searchTags, Poll.Tags) {
			matchingPolls = append(matchingPolls, Poll)
		}
	}
	return matchingPolls
}

func tagsMatchAll(searchTags []string, PollTags []string) bool {
	for _, searchTag := range searchTags {
		if !contains(PollTags, searchTag) {
			return false
		}
	}
	return true
}

func contains(arr []string, word string) bool {
	for _, elem := range arr {
		if elem == word {
			return true
		}
	}
	return false
}
