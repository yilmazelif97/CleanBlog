// const mongoose = require('mongoose')

// const schema = mongoose.Schema;

// //connection with DB

// mongoose.connect('mongodb://localhost/cleanblog-test-db',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// });

// //create schema

// const blogSchema = new schema({
//     title:String,
//     description:String,
//     dateCreated:Date
// })

// const post = mongoose.model('post',blogSchema)

// //create post
// /*
// post.create({
//     title:"post 3",
//     description:"Description of post 3",
//     dateCreated:Date.now()
// });
// */

// //read post
// /*
// post.find({},(err,data)=>{
//     console.log(data)
// });

// */
// //update post

// /*
// const id="61e2f126316980998b0f99f0";

// post.findByIdAndUpdate (
//     id, {
//     title:"post 1 updated",
//     description:"description of post 1 updated",
//     dateCreated:Date.now()
//     },{
//         new : true
//     },
//     (err,data)=>{
//     console.log(data)
//     }
// )
// */

// const id="61e2f126316980998b0f99f0";

// post.findByIdAndDelete(id, (err,data)=>{
//     console.log("data is cleaned")
// })
