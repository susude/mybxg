define(['jquery','nprogress','template','cookie'],function($,nprogress,template){
    // 控制左侧菜单的展开和折叠
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });
    // 实现退出功能
    $('#logout').click(function(){
        $.ajax({
           type:'post',
           url:'/api/logout',
           dataType:'json',
           success:function(){
               location.href='/login';
           }
        });
    });


    //获取请求路径
    var pathname=location.pathname;
    // 判断用户是否已经登录要通过PHPSESSID判断
    if(pathname != '/login' && !$.cookie('PHPSESSID')){
         // 没有登录的情况要重新跳转到登录页面
         location.href='/login';
    }
    // 获取登录用户的cookie信息
    var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
    if(loginInfo){
        // 渲染页面
        // $('.aside .profile').find('img').attr('src',loginInfo.tc_avatar);
        // $('.aside .profile').find('h4').text(loginInfo.tc_name);
        // <!-- 头像 -->
      var loginTpl='<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
      var html=template.render(loginTpl,loginInfo);
      console.log(html);
      $('#teacherTpl').html(html);
    }

    $(document).ajaxStart(function(){
      // 显示遮罩层
        $('.overlay').show();
    });
    $(document).ajaxStop(function(){
      //隐藏遮罩层
       $('.overlay').hide();
    })

    // 进度条设置
     nprogress.start();//开始
     nprogress.done();//结束
})