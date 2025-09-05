const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride=require("method-override");

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

let Posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"abcfdfygi",
        content:"I love tv",
    },
    {
        id:uuidv4(),
        username:"apne",
        content:"I love ",
    },
    
];
app.get("/posts",(req,res) =>{
    res.render("index.ejs",{Posts});
});
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});
app.post("/posts",(req,res) =>{
    let{username,content}=req.body;
    let id=uuidv4();
     let newPost = {
        id: Posts.length + 1,   // simple auto-increment id
        username,
        content
    };
    Posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res) =>{
    let{id}=req.params;
    let post=Posts.find((p) => p.id==(id));

    res.render("show.ejs", { post });
});
app.patch("/posts/:id",(req,res) =>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=Posts.find((p) => p.id==(id));
    post.content=newContent;
    console.log(newContent);
    console.log(post);
    console.log(id);
    res.send("patch request working");
});
app.get("/posts/:id/edit",(req,res) =>{
    let{id}=req.params;
    let post=Posts.find((p) => p.id==(id));
     res.render("edit.ejs",{post});
    });
app.delete("/posts/:id",(req,res) =>{
    let{id}=req.params;
     Posts=Posts.filter((p) => p.id==(id));
    res.redirect("/posts");
    });

app.listen(port,() =>{
    console.log("listening to port :8080");

});
