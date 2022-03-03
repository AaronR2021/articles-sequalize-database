## routes to work on

- get: "/" 
lists all the articles

- post: "/signup"
recieves<= email,password,username 
response=>token 

- post: "/login"
recieves<= email,password 
response=>token 

- post: "/articles/create" 
TOKEN REQUIRED
recieves<= title
        <=desc "this is the description of the article"

- get "/articles/:userId"
finds all articles for that specific user

- post "/articles/like/:articleId"
TOKEN REQUIRED
likes the article

- post "/articles/unlike/:articleId"
TOKEN REQUIRED
unlikes the article

- get "/articles/delete/:articleId"
TOKEN REQUIRED
deletes the given article

- get "/articles/comments/:articleId"
shows the list of comments for that given article
 
- get "/users/delete/:userId"
TOKEN REQUIRED
deletes a given userId

- post "comments/create/:articleId"
TOKEN REQUIRED
 recieves<= comment


