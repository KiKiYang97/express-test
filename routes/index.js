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

router.post('/saveBody', function(req, res, next) {
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
    {'title': 'node'},
    {'title': 'node.js'},
    (err, docs) => {
      if(err){return res.json('更新数据失败')}
      res.json(docs);
    }
  )

})

router.put('/updateOneData',(req, res, next) => {
  const Article = mongoose.model('Article')
  Article.updateOne(
      {'_id':'5f4f5372c9e2f32e3c63bd7a'},
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
  Article.find({'title':'testUpdateOne'}, (err, docs)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(docs)
  })
})

router.get('/findByBody', (req, res, next) => {
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
