var express = require('express');
var router = express.Router();
const db = require('../database')
const mongoose = require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', function(req, res, next) {
  console.log(req)
  const Article = mongoose.model('Article')
  var art = new Article({
    title: 'node',
    content: 'test',
    name:'San Ti',
    price:29,
    isSale:true
  })
  art.save((err) => {
    if(err) {
      res.json(err)
    } else {
      res.json("success")
    }
  })
})

router.post('/saveArticle', function(req, res, next) {
  console.log(req)
  const Article = mongoose.model('Article')
  const body  = new Article(req.body);
  body.save((err) => {
    if(err) {
      res.json(err)
    } else {
      res.json("success")
    }
  })
})

router.put('/update', (req, res, next) => {
  const Article = mongoose.model('Article')
  //batch update
  Article.updateMany(
    //first  设置批处理的条件
    {'title': 'node'},
    //  second : 设置更改的内容
    {'title': 'node.js'},
    (err, docs) => {
      if(err){return res.json('更新数据失败')}
      res.json(docs);
    }
  )

})

router.put('/updateOneArticle',(req, res, next) => {
  const Article = mongoose.model('Article')
  //update方法已过时，尽量使用updateOne.
  Article.updateOne(
      //first : 找出某个数据，如果不是唯一值，则会针对第一个被录入的数据进行修改
      {'_id':'5f4f5372c9e2f32e3c63bd7a'},
      //second : 更改的内容
      {'price':198},
      (err,docs) => {
        if(err) {
          return res.json('update one data failed')
        }else {
          res.json(docs);
        }
      }
  )
})

// find all
router.get('/find', (req, res, next) => {
  const Article = mongoose.model('Article')
  Article.find({}, (err, docs)=>{
    if(err){
        res.json(err);
        return;
    }
    res.json(docs)
  })
})

router.get('/findByTitle', (req, res, next) => {
  const Article = mongoose.model('Article')
  //find by title
  Article.find({'title':'testUpdateOne'}, (err, docs)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(docs)
  })
})

router.get('/findByArticle', (req, res, next) => {
  const Article = mongoose.model('Article')
  const body = req.body;
  Article.find(body, (err, docs)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(docs)
  })
})

router.delete('/delete', (req, res, next) =>{
  const Article = mongoose.model('Article')
  Article.deleteOne(
    {'title': 'node'}, //查找条件
    /*回调函数*/
    (err,docs)=>{
        if(err){return res.json('删除数据失败')}
        res.json(docs);
    }

)
})


module.exports = router;
