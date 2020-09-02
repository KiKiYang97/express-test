const mongoose = require("mongoose"); 
/**通过mongodb://username:password@host1:port/database_name?authSource指定验证前面身份信息的数据库来源 */
const db = mongoose.connect('mongodb://iotteam:1907dunka08@localhost/DBTest', (err) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log("connect success")
}); 

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    name:String,
    price:Number,
    isSale:Boolean
})
mongoose.model('Article', ArticleSchema)
module.exports = db;
