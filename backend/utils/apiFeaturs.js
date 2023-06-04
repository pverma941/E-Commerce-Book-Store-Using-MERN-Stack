const { remove } = require("../models/productModel");

class ApiFeaturs {
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword  = this.queryStr.keyword 
        ? {
            name:{
                $regex : this.queryStr.keyword,
                $options:'i'
            }
        }
        :{};
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this
    }

    filter(){
        const queryCopy={ ...this.queryStr };
        const removeFileds = ["keyword","page","limit"];
        // console.log(queryCopy)
        removeFileds.forEach((key)=> delete queryCopy[key]);
        // console.log(queryCopy)

        // // filter for price and rating 
        // let queryStr = JSON.stringify(queryCopy);
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        
        // this.query = this.query.find(JSON.parse(queryStr));
        // // console.log(queryCopy)
        // return this;
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage*(currentPage-1);
        // console.log(skip)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this
    }
}
module.exports = ApiFeaturs;