const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const path = require('path');
const ejs = require('ejs');


const posts = require('./models/Post');
const res = require('express/lib/response');

const app = express();

app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

const postController = require('./controllers/postController')

const pageController = require('./controllers/pageController')

//connection with DB

mongoose.connect('mongodb+srv://elifyilmzaz:587785000aA@cluster0.b0mi6.mongodb.net/cleanblog-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify:false
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
//tüm postları index e yollar
app.get('/', postController.getAllPosts  );

app.get('/about', pageController.aboutPage );

app.get('/add_post', pageController.addpostPage);

// req.body --> forma girilen verileri taşır
//app_post taki formun metodu post yani veri gönderme. bunun için bir action çalıştırması gerekiyor. aciton:"/posts" şeklinde, o posts bu posts. yani o form tetiklendiğinde gelip bu app.post taki logici çalıştırıyor

//create post
app.post('/postact', postController.addPost);

//load selected post
app.get('/posts/:id', postController.getOnePost );

//edit posta yönlendirme o yüzdenf arklı controllerda
app.get('/posts/edit/:id', pageController.editPage )

//edit post
app.put('/posts/:id', postController.updatePost);

//delete post
app.delete('/posts/:id', postController.deletePost)


const port = process.env.port || 5000; //heroku istediği portu vercek buraya 

app.listen(port, () => {
  console.log('bağlantı kuruldu');
});

//template engine--> kullanılan statik dosyaların yanısıra dinamik dosyaları bunun içerisine gömebilrsin böyle tarayıcının okuyabileceği html olur


//npm method-override --> put requesti post request gibi simule etmek için 