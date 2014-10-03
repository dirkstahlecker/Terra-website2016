proj2
=====

Twitter Clone

Grading Directions:
I like my method of handling new tweets, with a route and mongo. Everything is handled in a callback from the post catcher from the form when it is submitted on the html page. 
https://github.com/dirkstahlecker/stahdirk_proj2/blob/master/server.js#L106-132
I also like the way I handle the storing of user account information into mongo. It's very simple, happening in only a few lines and allows for easy access to the users and their information for validation. I realize it's not secure, but that wasn't the focus of this pset so I didn't put in the time to make it so. 
https://github.com/dirkstahlecker/stahdirk_proj2/blob/master/server.js#L67-87

Questions:
I am wondering the best way to send data from the html page back to the server, specifically in the context of deleting a tweet. I know how to route and handle that back in the server, but I can't figure out how to send the data I want in order to delete the correct tweet.


Design Choices:
I decided to store both the user information and the tweets themselves in mongodb. For storing the tweets, I stored the message alongside the user that posted it, to allow for easy authentication when deciding if a user is allowed to delete or edit a tweet.
I decided to use ejs view files because they allow for easy passing of information into dynamically generated files. Returning a list of all tweets from mongo is easy, then the ejs file can display them well. I decided to show all the tweets to every user, and mark the tweets with the user who wrote them. 
I also decided to use Mongoose for accessing mongo. I found the Mongoose API very intuitive and understandable, and it did all the operations I wanted to perform very well and simply.



Design Challenges:
One of the most difficult things was figuring out how to pass data from one part of the code to another, specifically from client to server. I did this through the use of forms. Forms are very easy to place and configure, and send data in a manner that can be parsed on the server side. They work nicely with redirects, so it's easy to structure the code on the server side.
I decided to keep the architecture simple and only use two actual pages, for ease of implementation. It will be easy to split things apart later on if necessary, such as making the create an account form on a separate page from the login. But it's perfectly valid for them to be together, and it made the implementation simpler for the time being. The second page is the twitter feed, which integrates the new tweet text box. The deleting and editing can take place essentially in line, with buttons appended to the tweets themselves, so no new page is necessary for that. 
