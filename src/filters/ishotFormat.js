import Vue from 'vue';

Vue.filter('ishotFormat',(ishot)=>{
    switch(ishot){
        case 1:
            return '是';
            break
        case 2:
            return '否'
    }
})