const assert=require("assert")
const User = require("../src/db/UserModel");


describe("create records",()=>{
    it("create a user in DB",(done)=>{
        const raj=new User({name:"rajesh"})
        raj.save()
        .then(()=>{assert(!raj.isNew);done()})
        .catch(err=>console.log(err))
    })
})