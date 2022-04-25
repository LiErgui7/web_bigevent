$(function () {
    // 调用 getUserInfo函数来获取用户的基本信息
    getUserInfo()


    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页
            location.href = '/login.html'

            // 关闭弹出层confirm询问框
            layer.close(index);
        });
    })
})




// 定义获取用户的基本信息的函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar 渲染用户的头像 
            renderAvatar(res.data)
        },

        // 不论成功还是失败，最终都会调用complete回调函数, 统一写在baseAPI里
        // complete: function (res) {
        //     // 在complete回调函数中可以使用 responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录页面
        //         location.href = '/login.html'

        //     }
        // }

    })
}


// 定义渲染用户的头像的函数renderAvatar 
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        // 拿到用户名第一个字符，转为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}