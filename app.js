const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

const posts = require('./models/Post');

const app = express();

//connection with DB

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
   useNewUrlParser:true,
   useUnifiedTopology:true,
});

//Template Engine

app.set('view engine', 'ejs'); //exprese template engine olarak ejs kullanacğımızın haberini veriyoruz.

// const myLogger = (req,res,next)=>{
//     console.log("Midlleware log 1") //proje çalıştırıldığında console da bu yazar fakat bir sonraki middleware e geçemez yani diğer requesti atamazsın. o yüzden next verb kullanılıyor.
//     next();
// }

// const myLog2 = (req,res,next)=>{
//     console.log("Middleware log 2")
//     next();
// }

//middle wreler sırayla çalışır o yüzden next denemezsen diğer mw çalışamaz

//gömülü middleware fonksiyonu kullanılıyor bu kodla --> express.static

//middleware: request-response döngüsü içerisindeki her şey middleware de gerçekleşir.

//MIDDLEWARE
app.use(express.static('public'));

//req-res döngüsü içerisinde alınan req in sonlandırılmasını sağlar.

//BU MWLERİ KULLANINCA SERVER AYAĞA KALKMIYOR??

app.use(express.urlencoded({ extended: true })); //urldkei datayı okumanı sağlar
app.use(express.json()); //urldeki datayı json formatına döndürür

//ROUTE
//bu da bir mw.
app.get('/', async (req, res) => {

  const ipost = await posts.find({});

  res.render('index.ejs',{
    ipost
  });


  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));  //dosyadaki index sayfasının çalışmasını sağlar

  // res.send(blog) //burdaki res.send middleware in atmamlandığını belirtiyor. eğer sen bunu silip ilk mw yi çalıştırırsan sıra buna geldiğinde cycle tıkanmış olur
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/add_post', (req, res) => {
  res.render('add_post.ejs');
});

// req.body --> forma girilen verileri taşır
//app_post taki formun metodu post yani veri gönderme. bunun için bir action çalıştırması gerekiyor. aciton:"/posts" şeklinde, o posts bu posts. yani o dorm teitklendiğinde gelip bu app.post taki logici çalıştırıyor

app.post('/postact', async (req, res) => {
  await posts.create(req.body); // bu create olana kadar bekletir await ile. async

  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log('bağlantı kuruldu');
});

//template engine--> kullanılan statik dosyaların yanısıra dinamik dosyaları bunun içerisine gömebilrsin böyle tarayıcının okuyabileceği html olur
