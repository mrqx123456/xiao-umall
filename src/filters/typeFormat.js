import Vue from 'vue'
Vue.filter('typeFormat',(type)=>{
    switch(type){
        case 1:
            return '目录';
            break;
        case 2:
            return '菜单';
            break;
    }
})