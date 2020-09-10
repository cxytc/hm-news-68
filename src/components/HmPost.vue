<template>
  <div class="hm-post" @click = "$router.push(`/post-detail/${post.id}`)">
    <!-- 视频封面 -->
      <div class="video-post" v-if = "post.type === 2">
        <div class="title">{{post.title}}</div>
        <div class="video">
        <span class="iconfont iconshipin"></span>
        <img :src="$url(post.cover[0].url)" alt="">
        </div>
        <div class="buttom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="single-img-post" v-else-if = "post.cover.length < 3">
        <div class="info">{{post.title}}
            <div class="user" >
               <span>{{post.user.nickname}}</span>
               <span>{{post.comment_length}}跟帖</span>
            </div>
         </div>
         <div class="img" v-if = "post.cover.length" >
             <img :src="$url(post.cover[0].url)" alt="">
         </div>
      </div>
      <div class="multiple-img-post" v-else>
          <!-- 需要显示多张图 -->
          <div class="info">{{post.title}}

          </div>
          <div class="imgs"  >
             <img :src="$url(post.cover[0].url)" alt="">
             <img :src="$url(post.cover[1].url)" alt="">
             <img :src="$url(post.cover[2].url)" alt="">
         </div>
            <div class="user">
               <span>{{post.user.nickname}}</span>
               <span>{{post.comment_length}}跟帖</span>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  created () {
    // console.log(this.post)
  }
}
</script>

<style lang= "less" scoped>
   .user {
     color: #666;
     font-size: 14px;
      span:first-child {
        margin-right: 8px;
      }
    }
  .single-img-post {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;

    .info {
      flex: 1;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }

    .img {
        img {
            width: 120px;
            height: 74px;
            /* 作用和background-size 类似  设置图片大小*/
            /* cover缺点 保证图片覆盖完整的大小 缺点 会裁剪掉一些图片 */
            /* contain 缺点会留白 保存图片完整性 */
            object-fit: contain;
        }
    }
}

  .multiple-img-post {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
          display: flex;
      flex-direction: column;
      justify-content: space-between;
    .info {
    flex: 1;
      font-size: 16px;

    }
    .imgs {
            display: flex;
            justify-content: space-between;
        img {
            width: 122px;
            height: 74px;
            object-fit: cover;
            padding: 0 2px;
        }
    }
  }
  /* 视频样式 */
  .video-post {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    /* display: flex; */
    .title {
      font-size: 16px;
    }
    .video {
      position: relative;
     img {
      width: 100%;
      height: 170px;
      object-fit: cover;
     }
     span {
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);
       width: 50px;
       height: 50px;
       border-radius: 50%;
       background-color: rgba(255, 255, 255, .5);
       /* background-color: rgba(255,255,255,.5); */
     }
     .iconfont {
       text-align: center;
       line-height: 50px;
       font-size: 25px;
     }
    }
    .buttom {
      font-size: 14px;
      span:first-child {
        margin-right: 8px;
      }
    }
  }
</style>
