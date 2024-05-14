using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MyWebApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("username")]
        [BsonRequired]
        public string Username { get; set; }

        [BsonElement("password")]
        [BsonRequired]
        public string Password { get; set; }
    }

    public class Subs
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("emails")]
        public List<string?> Emails { get; set; }
    }

    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        [BsonRequired]
        public string? Title { get; set; }

        [BsonElement("quote")]
        [BsonRequired]
        public string? Quote { get; set; }

        [BsonElement("text")]
        [BsonRequired]
        public string? Text { get; set; }

        [BsonElement("views")]
        [BsonRequired]
        public string? Views { get; set; }

        [BsonElement("date")]
        [BsonRequired]
        public string? Date { get; set; }

        [BsonElement("category")]
        [BsonRequired]
        public string? Category { get; set; }

        [BsonElement("image")]
        [BsonRequired]
        public string? Image { get; set; }

        [BsonElement("comments")]
        public List<Comment> Comments { get; set; }
    }

    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("comment")]
        public string CommentText { get; set; }
    }
}