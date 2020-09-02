const mongoose = require("mongoose");
/**通过mongodb://username:password@host1:port/database_name?authSource指定验证前面身份信息的数据库来源  10.222.29.163:27017 */
const db = mongoose.connect('mongodb://iotteam:1907dunka08@localhost/DBTest', (err) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log("connect success")
});
/* mongoose 的所有合法SchemaTypes:
* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array
* Decimal128
* */
const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    name:String,
    price:Number,
    isSale:Boolean,
    cid: { // 分类id
        type: mongoose.Schema.ObjectId
    },

    author_id:{ // 用户的id
        type: mongoose.Schema.ObjectId
    },
})
mongoose.model('Article', ArticleSchema,'article')

const ArticleCateSchema = new mongoose.Schema({
    title  : {
        type: String,
        unique: true
    },
    descripton: String,
    addtime: {
        type: Date
    }
});
mongoose.model('ArticleCate',ArticleCateSchema,'articlecate')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    age: Number,
    sex: String,
    tel: Number,
    status: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('User',UserSchema,'user');

module.exports = db;


const Article = mongoose.model('Article')
article = new Article();
article.title="这是一个国际新闻333333333"
article.cid="5f4fbfb2e020040fe8741424";   // 分类id
article.author_id="5f4fbfb2e020040fe8741425"; // 用户id
article.author_name='李四';
article.descripton='这是一个国际新闻333333333333 此处省略300字';
article.content='访问美国 这是一个国际新闻333333333'
article.save();

// 分类的增加
const ArticleCate = mongoose.model('ArticleCate')
cate = new ArticleCate({
    title:'地方新闻',
    description:'地方新闻'
})
cate.save();

// 增加用户
const UserModel = mongoose.model('User')
user= new UserModel({
    username  :'wangwu',
    password:'qwerqwerqewrq',
    name:'王五',
    age:21,
    sex:'男',
    tel:12345678987
})
user.save();

