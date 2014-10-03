proj2
=====

Twitter Clone

Grading Directions:


Design Choices:
I decided to store both the user information and the tweets themselves in mongodb. For storing the tweets, I stored the message alongside the user that posted it, to allow for easy authentication when deciding if a user is allowed to delete or edit a tweet.
I decided to use ejs view files because they allow for easy passing of information into dynamically generated files. Returning a list of all tweets from mongo is easy, then the ejs file can display them well. I decided to show all the tweets to every user, and mark the tweets with the user who wrote them. 


Design Challenges:
One of the most difficult things was figuring out how to pass data from one part of the code to another, specifically from client to server. I did this through the use of forms. Forms are very easy to place and configure, and send data in a manner that can be parsed on the server side. They work nicely with redirects, so it's easy to structure the code on the server side.
I decided to keep the architecture simple and only use two actual pages, for ease of implementation. It will be easy to split things apart later on if necessary, such as making the create an account form on a separate page from the login. But it's perfectly valid for them to be together, and it made the implementation simpler for the time being. The second page is the twitter feed, which integrates the new tweet text box. The deleting and editing can take place essentially in line, , with buttons appended to the tweets themselves, so no new page is necessary for that. 
