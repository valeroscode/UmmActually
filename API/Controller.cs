using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MyWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.EnvironmentVariables;

namespace MyWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {

        private readonly IMongoCollection<Post> _postsCollection;
        private readonly IMongoCollection<Subs> _subsCollection;

        public PostsController(IMongoDatabase database)
        {
            _postsCollection = database.GetCollection<Post>("posts");
            _subsCollection = database.GetCollection<Subs>("subs");
        }

        [HttpGet]
        [Route("GetAllPosts")]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPosts()
        {
            return await _postsCollection.Find(new BsonDocument()).ToListAsync();
        }

        [HttpGet("{title}")]
        public async Task<ActionResult<Post>> GetPostByTitle(string title)
        {
            return await _postsCollection.Find(new BsonDocument { { "title", title } }).FirstOrDefaultAsync();
        }

        [HttpPost("incviews")]
        [Route("incviews")]
        public async Task<ActionResult> IncrementViews([FromBody] ViewRequest request)
        {
            var filter = Builders<Post>.Filter.Eq("title", request.Title);
            var update = Builders<Post>.Update.Set("views", request.Views);
            await _postsCollection.UpdateOneAsync(filter, update);
            return Ok(request.Views);
        }

        [HttpPost("newpost")]
        public async Task<ActionResult> CreatePost([FromBody] Post newPost)
        {
            await _postsCollection.InsertOneAsync(newPost);
            return Ok(new { message = "Post added successfully" });
        }

        [HttpPost("newcomment")]
        public async Task<ActionResult> CreateComment([FromBody] CommentRequest request)
        {
            var filter = Builders<Post>.Filter.Eq("title", new ObjectId(request.Title));
            var update = Builders<Post>.Update.Push("comments", new Comment { Name = request.Name, CommentText = request.Comment });
            await _postsCollection.UpdateOneAsync(filter, update);
            return Ok();
        }

        [HttpPost("sub")]
        public async Task<ActionResult> Subscribe([FromBody] SubsRequest request)
        {
            var filter = Builders<Subs>.Filter.Eq("EMAILS_ID", "subsList");
            var update = Builders<Subs>.Update.Push("emails", request.Email);
            await _subsCollection.UpdateOneAsync(filter, update);
            return Ok();
        }
    }

    public class ViewRequest
    {
        public string Title { get; set; }
        public string Views { get; set; }
    }

    public class CommentRequest
    {
        public string Title { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
    }

    public class SubsRequest
    {
        public string Email { get; set; }
    }
}