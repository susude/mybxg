requirejs.config({
    baseUrl:'/public/assets',
    paths:{
        jquery:'jquery/jquery.min',
        bootstrap:'bootstrap/js/bootstrap.min',
        common:'../js/common',
        cookie : 'jquery-cookie/jquery.cookie',
        login:'../js/login'
    },
    shim:{//兼容非标准模块
        bootstrap:{
            deps:['jquery']
        }
    }
});