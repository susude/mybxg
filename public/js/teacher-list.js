define(['jquery','template','util','bootstrap'],function($,template,util){
    // 设置导航菜单选中
    util.setMenu(location.pathname);
    //加载列表数据
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            // console.log(data)
            //解析数据并渲染页面
            var html=template('teacherinfotpl',{list:data.result});
            $('#teacherInfo').html(html);
            //添加查看功能
            previewTeacher();
            // 注销和启用功能
            enableOrDisableTeacher();
        }
    })

     //讲师查看功能
    function previewTeacher(){
            $('.preview').click(function(){
                var tcId=$(this).closest('td').attr('data-id');
                $.ajax({
                    type:'get',
                    url:'/api/teacher/view',
                    data:{tc_id:tcId},
                    dataType:'json',
                    success:function(data){
                        data.result.tc_hometown=data.result.tc_hometown.replace(/[|]/g,'');
                        // console.log(data);
                        var html=template('teacherModalInfotpl',data.result);
                        $('#teacherModalInfo').html(html);
                         $('#teacherModal').modal();
                    }
                })
                return false;
            })
    }

    // 注销和启用功能
    function enableOrDisableTeacher(){
        $('.edteacher').click(function(){
            //缓存this
            var that=this;
            // 获取父元素，closest获取的是直接父元素
            td=$(this).closest('td')
            var tcId=td.attr('data-id');
            var tcStatus=td.attr('data-status');

            $.ajax({
                type:'post',
                url:'/api/teacher/handle',
                data:{tc_id:tcId,tc_status:tcStatus},
                dataType:'json',
                success:function(data){
                    // console.log(data);
                    if(data.code==200){
                        td.attr('data-status',data.result.tc_status);
                        if(data.result.tc_status==0){
                            $(that).text('注销');
                        }else{
                             $(that).text('启用');
                        }
                    }
                }
            })
        })

    }
});
