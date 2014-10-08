proj2
=====

Twitter Clone

Grading Directions:
I like the manner in which I handle the retweeting of tweets. It's actually very simple: the id of each tweet is embedded into the html so it can be easily read in javascript; it is in fact passed directly to the embedded javascript function, which is a very clean and simple way of information passing. This id is then used in the fritter route to create a new tweet with the message of the tweet that's being retweeted. A simple string is prepended, saying what user it originally was posted by. If a tweet is retweeted multiple times, only the most recent user's name is listed. I like it because it is a feature that requires minimal reading and writing to the data model and adds a powerful user feature.

I also like the way I handle the storing of user account information into mongo. It's very simple, happening in only a few lines and allows for easy access to the users and their information for validation. I realize it's not secure, but that wasn't the focus of this pset so I didn't put in the time to make it so. 


My Feature:
I implemented the additional feature of retweeting. I also added the ability for a user to view all the other users that he or she is following. 


Design Choices:
I decided to store both the user information and the tweets themselves in mongodb. For storing the tweets, I stored the message alongside the user that posted it, to allow for easy authentication when deciding if a user is allowed to delete or edit a tweet.
I decided to use ejs view files because they allow for easy passing of information into dynamically generated files. Returning a list of all tweets from mongo is easy, then the ejs file can display them well. I decided to show all the tweets to every user, and mark the tweets with the user who wrote them. 
I also decided to use Mongoose for accessing mongo. I found the Mongoose API very intuitive and understandable, and it did all the operations I wanted to perform very well and simply.
I chose to only show the most recent user in the case of a tweet being retweeted multiple times. It would be very difficult to display multiple users in a chain of retweets in a visually appealing manner, and generally the most recent is the most relevant. 
I also decided to 



Data Model:
I used two separate Mongoose schemas: one for users, and another for tweets. Users are stored with a username, password, and following field, the first two of which are self-explanatory and the third is an array of usernames of the users that this user follows. This array can be read and used to determine which tweets to show, based on whether the username of the tweet appears in the user's following list.
Tweets contain a username and message. They are essentially unconnected and fairly abstract, only knowing about themselves, but this is okay because of the information contained in the user schema. We can compare by usernames to determine both which tweets belong to which users, and which tweets are displayed to each user. Additionally, this saves memory space, since we only need to keep a single array in storage per user, that of the users that he or she follows. 
There were other possible ways of implementing this, such as having the tweets store more information about themselves. In fact, it would be possible to implement a model where arrays of tweets were stored for each user. This would make it easier to display them for the user and for the user to manipulate them, but it would be very difficult to pass information about tweets between users. If each user had a different copy of the tweets, it would be a nightmare to update information on a tweet (such as editing) and pass that on to every other user.


Design Challenges:
Many challenges are disussed in the data model section.
One of the other major challenges was determining the manner in which to handle the routing, specifically which routes were nested and which were separate. I decided ultimately to have a single js file for each displayed page, for ease of use. Also, it makes sense that the various methods of, say, the fritter feed page are all handled together. The other option is to split each up into it's own file, but I felt this cluttered the directory and made future edits more difficult. 