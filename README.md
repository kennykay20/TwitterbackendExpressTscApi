This is a Password-less Crud API for User-Tweeting\

what do I mean by Password-less API, we don't accept password when it comes to creating or registering a user or during user login 
. Here are the workflow
. A user is register with his email, username, fullname and other details with no password,
. the next step a user receive an email token with a number, through an email message sent to his/her email
. verifies if he or she owns the email, or the token not expired within the ten minutes or short time set for the token inside the token table
. after verification we authenticate the user by sending a JWT longer-life token which authenticate the user to tweets or do any other thing
. after the user logout we update the token taken column valid to false to we delete the token and log the user out
