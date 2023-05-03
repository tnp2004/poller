package database

import "time"

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

func InsertDB(poll Poll) []Poll {
	nowTime := time.Now().Format(timeFormat)
	poll.ID = len(pollDB) + 1
	poll.Created_at = nowTime
	poll.Updated_at = nowTime
	pollDB = append(pollDB, poll)

	return pollDB
}
