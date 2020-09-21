import Vue from 'vue';

Vue.filter('isnewFormat',(isnew)=>{
    switch(isnew){
        case 1:
            return '是';
            break
        case 2:
            return '否'
    }
})