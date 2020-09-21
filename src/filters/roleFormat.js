import Vue from'vue'
Vue.filter('roleFormat',(roleid,rolelist)=>{
    //根据所有的角色来进行查找满足roleid的那以项
    console.log(rolelist);
    if(rolelist.length>0){
        let item = rolelist.find(item=>{
            return item.id == roleid
        })
        return item.rolename
    }
    
})