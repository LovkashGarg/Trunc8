const express = require('express');

const app = express();
const PORT =5000;
const cors=require('cors');
app.use(cors({
    origin: '*', // Allow requests from this origin (your React app)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
const URL=require('./models/url');
const urlRoute = require('./routes/url');
app.use(express.json())

app.use("/url", urlRoute);


const connectToMongoDb = require('./connect');
const shortid = require('shortid');
connectToMongoDb("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("MongoDB connected");
    
    // Start server only after MongoDB is connected
    app.listen(PORT, () => {
      console.log(`Listening at Port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });
 

app.get('/:shortId',async(req,res)=>{
      const shortId=req.params.shortId;
    //   console.log(shortId)
     const entry= await URL.findOneAndUpdate({shortID:shortId},{$push:{visitHistory:{timestamp:Date.now()}}})
      res.redirect(entry.Redirect_url);
})
app.get('/', (req, res) => {
  res.send('Hello World!');
});
