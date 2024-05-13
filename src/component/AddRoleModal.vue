<template>
    <div>
         <h6>如何添加成员</h6>
         <div class="add-role-modal">
            <p class="top-hint-box">此处显示的成员均为授权给{{ ENTERPRICE_NAME }}的成员，如需添加成员请去企业微信授权，如有疑问可以 <a>联系客服</a></p>
            <h4>
                <a-icon type="info-circle" />
                进入<a href="https://work.weixin.qq.com/wework_admin/frame#apps" target="_blank">企业微信</a>
                ，找到【应用管理】-【应用】-【自建应用】下的<span class="text-black"><b>【{{ ENTERPRICE_NAME }}提醒】</b></span>
            </h4>
            <img alt="如何添加成员" src="/imgs/addRole1.png"/>
            <h4><a-icon type="info-circle" /> 打开{{ ENTERPRICE_NAME }}提醒，点击【编辑】，在【使用范围】内修改或添加成员 </h4>
            <img alt="如何添加成员" src="/imgs/addRole2.png"/>
        </div>
    </div>

</template>
<script>
export default {
    name: 'AddRoleModal'
}
</script>
<style lang="less" scoped>
    h6 {
        font-size: 17px;
        width: 100%;
        text-align: center;
        margin-top: 2px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 1px;
        margin-bottom: 15px;
    }
    .add-role-modal {
        height: 500px;
        overflow: auto;
    }
    .top-hint-box{
        text-align: left;
        background: #f0f8ff;
        padding: 12px 16px;
        margin-bottom: 20px;
    }
    h4{
        margin: 10px 0;
    }
    img{
        width: 100%;
    }
</style>