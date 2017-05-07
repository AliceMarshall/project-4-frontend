#Community Chest

###GA WDI London - Project 4 (Final Project)
#####April 2017


The frontend of a full stack RESTful application. A lending site where users can log in and request and accept/decline friends on the app, upload items they are willing to lend to friends or mutual friends and friends. Users can also borrow their friends items. 

####Inspiration

The idea was inspired by my dad who shares a chainsaw and trailer with friends and neighbours, creating a community to share a selection tools, which can get infrequent use by the owner.

***Check out 'Community Chest'*** [***here***](https://stormy-plains-97072.herokuapp.com):

![Image](http://i.imgur.com/KOPcjo9.jpg)

####Approach

I had a very clear view of how I wanted the application to function from the beginning. Similarly with the UX design, I wanted to kept it quite simple. It has a slight unintentional Monopoly theme but only in the name and the way the items are displayed.

You must create a profile and also make friends on the app before you can use a lot of the features. On login, you can find and filter other users, and make friend requests to people you know. Once the other users have accepted the request, you will be able to view their items on the 'Find Items' page. Items are categorized which you can filter by, you can also search by user and item name. 

When an item is created you set a lending level of either friends or mutual friends and friends, this means users who are friends with your friends can also view and request your items with the second lending level. When you make a request for an item, an email is sent to the owner, telling them which user and what item has been requested, the item is added to your 'Sent Requests' page, and tells you the status of the request. On the owner of the items 'Received Requests' page they can accept or reject the request, and a second email will be sent to the requestor

**Technologies Used**

- JavaScript, Express, Node.js, AngularJS, HTML5, CSS, SASS, Bootstrap were used to create the frontend application.
- Ruby, Ruby on Rails and PostgreSQL database in the backend.
- Pictures are base64 encoded and stored using the AWS S3 service.
- Authentication uses JWT with Satellizer and BCrypt.
- The Google Web Font 'Poppins' has been used to style the application.
- Home page image from Unsplash.

**Copyright &#169;**

I own none of the images or background used in the game. All other work is my own.

####Challenges & Problems

One of the more tricky parts of this project was working out how the item requests would work, in terms of accepting/pending/rejecting. I would have liked to implement a more instant response rather than email. I think it would work well as a OS/Android application so notifications could be used instead. In the week this was completed, I also was unable to have a messaging system in place, to make conversations regarding items much more user friendly.


**Features & Bugs**

- The GitHub login after the first 'login with github' is slightly temperamental and doesn't always login.

