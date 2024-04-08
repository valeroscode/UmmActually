# Umm... Actually

An upcoming academic blog spanning the various sub topics of International Relations with a mission to educate on topics not commonly presented in a practical or honest way.
<br>
This README dives into the website from a technical perspective and it summerizes major features. Feel free to visit the website at: https://ummactuallyblog.onrender.com/
<br>
As of now, there are no real articles on the blog and all the text is dummy data but this is the production build for the website.

## Technology Used
REACT | NODEJS | MONGODB

### Table of Contents
1. Technology<br>
1a. Architecture<br>
Components<br>
1b. Frontend<br>
1c. Backend<br>
1d. Database<br>
2. Features Overview

### 1. Technology
**1a. Architecture** <br>
This project follows a component-based architecture, consisting of reusable components and eliminating redundancy thanks to the power of React. The backend follows a traditional monolithic architecture. The backend and frontend exist in the same codebase and the application is deployed as a web service. 

### Components
**1b. Frontend:** The frontend implements the UI using React and renders the website on the client side as a single page application. This SPA has 3 total paths. One for the home page, another for the about, and the final one for seeing individual blog posts. Navigation is achieved with react router. The UI has elements dynamically rendered from content in the database and some static content. The UI is designed to be simple, facilitate easy reading, and have a calming effect on the user. Code on the frontend fetches data, renders it with simple code thanks to JSX, filters articles, handles animations, and more.
<br>

**1c. Backend:** The backend is written in NodeJS and the entry point is server.js. Code within this file mainly establishes a connection to MongoDB, handles various GET and POST operations like posting new articles, updating the view counts for articles, updating the list of subscribers, posting new comments for articles, getting articles, and serving the index.html file for all paths. This website also has email capability that is automated thanks to an API endpoint within the server.js file. The purpose of it is to send emails to subscribers whenever a new article is posted. This is done with a popular package called nodemailer (find it here: https://nodemailer.com/). Within the models folder there is a model.js file that defines all of the schemas for each document in the database. APIs within the server.js file of course use these schemas when performing their GET and POST operations.
<br> 

**1d. Database:** This website uses MongoDB, a non relational database (find it here: https://www.mongodb.com/). For this website the database has 3 documents: posts, subs, & users. The users document exists to authenticate the editor through a secret link. The subs document is very simple, one field with an array of emails. The posts document has the most content as it consists of multiple fields each containing a map of data that follows the post schema in models/model.js. 
<br>

### 2. Features Overview
This blog is built as a SPA with 3 total paths. The home page is lets users filter articles by category, search by title, subscribe to the email list so they can be notified when new articles are posted, and of course navigate to other paths. The about page tells users about the author and more on the purpose of the blog along with some statistics. The posts path provides an easy to read page for users to dive into an article, subscribe to the email list, & advertise posts within the same category. 
<br>

## Thank You
Thank you for taking the time to learn about Umm... Actually. Again, as of now this blog is not active nor does it have real posts, but will be soon. I would love to hear suggestions for this website if you have any, whether they be from a UX perspective or from a technology perspective. Please feel free to connect with me on LinkedIn:

https://www.linkedin.com/in/alex-valero-3416b52a1/


