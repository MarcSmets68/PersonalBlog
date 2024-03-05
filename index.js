import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
var blog = ["test", "test1"];
// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//handlers
app.get("/", (req, res) => {
  res.render("index.ejs", { list: blog });
  console.log(blog);
});

app.post("/submit", (req, res) => {
  if (req.body["new-post"]) {
    blog.push(req.body["new-post"]);
    res.render("index.ejs", { list: blog });
  } else {
    console.log("Please enter a valid post");
  }
});

app.post("/delete", (req, res) => {
  const index = req.body.data;
  blog.splice(index, 1);
  res.render("index.ejs", { list: blog });
});

app.post("/update", (req,res)=> {
    res.render("update.ejs", { post: blog[req.body.data],index: req.body.data});
  
})

app.post("/save", (req,res) => {
  blog[req.body.index] = req.body.update;
  res.render("index.ejs",{ list: blog});

})

app.listen(3000, () => {
  console.log("server running on port 3000");
});
