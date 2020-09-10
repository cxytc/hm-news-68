<template>
  <div class="user-edit">
       <hm-header>编辑资料</hm-header>
       <div class="avatar">
           <span> <img :src="$axios.defaults.baseURL + user.head_img" > </span>
           <van-uploader :after-read="afterRead" />
       </div>
        <hm-nav @click = "clickFn">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
  </hm-nav>
   <hm-nav  @click = "showPassword">
      <template>密码</template>
      <template #content>******</template>
  </hm-nav>
   <hm-nav @click = "showGender">
      <template>性别</template>
      <template #content>{{user.gender === 1? '男' : '女'}}</template>
  </hm-nav>
  <!-- 昵称选项 -->
  <van-dialog v-model="isShowname" title="修改昵称" show-cancel-button @confirm = "UpdateNickname">
    <van-field  ref ="nickname"  v-model="nickname"/>
  </van-dialog>
  <!-- 密码选项 -->
  <van-dialog v-model="isShowpassShow" title="修改密码" show-cancel-button @confirm = "UpdatePassword">
  <van-field v-model="password"/>
  </van-dialog>
  <!-- 性别选项 -->
  <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm = "UpdateGender">
    <van-radio-group v-model="gender">
      <van-cell-group>
        <van-cell title="男" clickable @click="gender = 1">
          <template #right-icon>
            <van-radio :name="1" />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="gender = 0">
          <template #right-icon>
            <van-radio :name="0" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </van-dialog>
  <!-- 裁剪的模态框 -->
  <div class="mask" v-show="isMask">
    <van-button type="primary" class="crop" @click ="crop">裁剪</van-button>
    <van-button type="danger" class="cropl" @click = "isMask = false">取消</van-button>
    <VueCropper :img = "img" ref="aa" autoCropWidth="100" autoCropHeight="100" fixed info autoCrop></VueCropper>
  </div>
  </div>
</template>

<script>
// 局部注册
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      isShowname: false,
      nickname: '',
      isShowpassShow: false,
      password: '',
      isShowGender: false,
      gender: 1,
      // 裁剪框一开始不显示
      isMask: false,
      // img上来为空
      img: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async clickFn () {
      this.isShowname = true
      this.nickname = this.user.nickname
      // 等待Dom的更新
      await this.$nextTick()
      // 自动获取焦点
      this.$refs.nickname.focus()
    },
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async UpdateNickname () {
      this.updateUser({
        nickname: this.nickname
      })
    },
    // 点击修改密码的显示与隐藏
    showPassword () {
      // console.log(this.user)
      this.isShowpassShow = true
      this.password = this.user.password
    },
    async UpdatePassword () {
      this.updateUser({
        password: this.password
      })
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    async UpdateGender () {
      this.updateUser({
        gender: this.gender
      })
    },
    isImg (name) {
      if (name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png')) {
        return true
      } else {
        return false
      }
    },
    // 文件上传功能
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传图片')
      }
      if (file.file.size >= 20 * 1024) {
        return this.$toast.fail('上传图片太大')
      }
      // 当选中完图片显示裁剪框
      this.isMask = true
      // 设置裁剪的图片
      this.img = file.content
    },
    crop () {
      this.$refs.aa.getCropBlob(async blob => {
        // console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        console.log(fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // console.log(data.url)
          // 修改用户头像
          this.updateUser({
            head_img: data.url
          })
        }
        this.isMask = false
      })
    }
  }
}
</script>

<style lang ="less" scoped>
.avatar {
    padding: 40px 0;
    text-align: center;
    position: relative;
    padding: 15px;
    img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
    }
}

.van-uploader {
  position: absolute;
  left: 50%;
  /* top: 40px; */
  transform: translate(-50%);
  width: 100px;
  height: 100px;
  opacity: 0;
}

/deep/ .van-dialog__content {
      padding: 15px;
      .van-field {
        border: 1px solid skyblue;
      }
    }

.mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;

  .crop,
  .cropl {
    position: fixed;
    top:0;
    z-index:1;
  }

  .cropl {
    right:0;
  }
 .vue-cropper {
    background-color: #000;
    background-image: none;
  }
}
</style>
