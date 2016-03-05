# React Redux CRUD App

#Installation
1. Install <a href="https://nodejs.org" target="_blank">Node.js</a> 
2. Install <a target="_blank" href="https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew">MongoDB</a>
3. `git clone https://github.com/rajaraodv/react-redux-blog.git`
4. `cd react-redux-blog`
5. `npm install`


#Running
You need two terminals, one for client and the other for server.

####Development
1. In terminal 1, run: `npm start`. This runs the app server (Express). 
2. In terminal 2, run: `npm run dev`. This runs the development server(webpack-dev-server).
3. Open browser and go to: `localhost:8080`

Note: If you open `localhost:3000` in browser, you'll see a *stale* production app, so while in development, always go to `localhost:8080`

####Production
In production, we need to compile the **latest** client js and place it to `public` folder. This allows the main app server(Express) to also show the final app.

1. Generate latest React app: `npm run build`.
2. In terminal 1, run `npm start`. It will be running both the server and the client.
3. Open browser and go to : `localhost:3000`.




