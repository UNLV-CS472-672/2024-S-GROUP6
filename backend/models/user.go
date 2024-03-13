package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ProfileID  primitive.ObjectID   `bson:"ProfileID,omitempty"`
	TripIDs    []primitive.ObjectID `bson:"TripIDs,omitempty"`
	FriendIDs  []primitive.ObjectID `bson:"FriendIDs,omitempty"`
	Username   string               `bson:"Username,omitempty"`
	FirstName  string
	LastName   string
	Password   string
	PassHash   string               `bson:"PassHash,omitempty"`
	Email      string               `bson:"Email,omitempty"`
	InvoiceIDs []primitive.ObjectID `bson:"InvoiceIDs,omitempty"`
	LastLogin  primitive.DateTime   `bson:"LastLogin,omitempty"`
}
