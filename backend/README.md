# mern-crud
mern practice (CRUD)

# Day1 3/10/2024
First, we created 2 folders named backed and frontend
2) We installed node version 20.17 using nvm after which we installed the node packages into our project using the command line; npm init -y and npm install express mongoose dotenv.

3) Wrote the script for our server, tested it and it was a success as localhost 5000 showed in the browser after which, we then proceeded to in stall nodemon so how servers can recognise changes to our code in real time.
Then we created a folder named config which holds the file that connects to our database serving as the entry point of our api.

4) We created our cluster in mongodb for our project and we successfully connected to the mongodb cluster using the MONGO_URI varaiable that has been assigned the value of the connection string in our ".env" file.

5) Finally, we pushed our project to a github repository


# Day2 7/10/2024
1) Today, we created our schema in the models folder. This schema specifies the data our api expects from the client side. If the a required information in the user data is missing, the requests results in a failure of status 404 else if all the necessary information required is sent to the api, then it results in success status of 201 which represents data creation.

2) Then we imported the schema in our server side script and also installed the postman extension to see if our code works by making a post request and it worked as we could see our product in our collections of the mongodb cluster.


# Day3 9/10/2024
1) Today, we've completed our api. So, basically, we have a route for the api products (in the server.js file) and for each route, we put them under the file - product.js with data methods and related endpoints. We have the controller functions for each of them which is in the product.controller.js file and we are using mongoose to be able to communicate with our database as well as the product model we have created in our product.model.js file so that we can really get some products, update them, delete them or even create products. Other than that, we have the configuration for the .env in the .env file, we can read the content just because we have called the dotenv.config() function in our server.js file. And finally, we have the database file where we can connect with the connectDB() function in the server.js file which we are using in the app.listen() callback function. I hope it makes sense 🙂

2) We commenced the building code blocks of our frontend today as well. We added light/dark mode functionality and we also completed the user inerface of the page that allows the client to create new products.


# Day4 10/10/2024
1) The success of today was that we completed the user interface and all of the functionality of the user interface of our CRUD application. The Homepage's ui and its functionality, the toast for the update and delete button and their respective functionalities. And we also added a global state to handle the state of each component so we don't have to go from parent to child etc. component just to update the state of a component.

2) Now we can create a product, view existing product(s), update product(s) and also delete product(s).
