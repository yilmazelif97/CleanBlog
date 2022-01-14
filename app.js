const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

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

//ROUTE
//bu da bir mw.
app.get('/', (req, res) => {
  /*const blog={id:1,title:"Blog title",description:"Blog description"}*/

  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));  //dosyadaki index sayfasının çalışmasını sağlar

  res.render('index.ejs');

  // res.send(blog) //burdaki res.send middleware in atmamlandığını belirtiyor. eğer sen bunu silip ilk mw yi çalıştırırsan sıra buna geldiğinde cycle tıkanmış olur
});

app.get('/about',(req,res)=>{
  res.render('about.ejs')
})

app.get('/add_post',(req,res)=>{
  res.render('add_post.ejs')
})

const port = 3000;

app.listen(port, () => {
  console.log('bağlantı kuruldu');
});

//template engine--> kullanılan statik dosyaların yanısıra dinamik dosyaları bunun içerisine gömebilrsin böyle tarayıcının okuyabileceği html olur
