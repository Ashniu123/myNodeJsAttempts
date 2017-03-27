var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myForm = new Schema({
    avatar: {
        name: String,
        data: Buffer,
        encoding: String,
        mimetype: String
        },
        name:{
            type:String
            // required:true
        },
        gender:{
            type:String,
            default:''
        },
        age:{
            type:Number,
            min:18
        },
        dob:{
            type:String
        },
        favColor:String,
        country:String,
        height:String,
        salary:String,
        email:String,
        tele: {
            type: String
            // validate: {
            //     validator: function (v) {
            //         return /^[0-9]{10}$/.test(v);
            //     }
            // }
        },
        address:{
            type:String,
            min:10

        },
        contact:[String]
},{timestamps:true});

module.exports = mongoose.model('myForm', myForm);
