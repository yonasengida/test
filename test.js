var KeyDal = require('./dal/confrimationkey');
function keyGenerate(keyLength) {
    var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var charactersLength = characters.length;

    for (i = 0; i < keyLength; i++) {
        key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }

    return key;
}

for( var i =1;i<=1000;i++){
var code=keyGenerate(9);

//console.log(code);
KeyDal.getCollection({},function getAll(err, doc){
console.log(doc);
});

}