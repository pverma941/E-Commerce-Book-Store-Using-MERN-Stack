class ApiFeaturs {
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }

    search(){
        const keyword  = this.queryString.keyword ?{
            name:{
                $regex : this.queryString.keyword,
                $option:'i'
            }
        }:{}
        console.log(keyword)
        this.query = this.query.find({ ...keyword })
        return this
    }

}
module.exports = ApiFeaturs;