<template>
  <div class="police-landing">
    <police-header></police-header>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content panel">
            <!-- <div class="landing--circle" @click="redirectRecentArtwork()">
                <img src="../../assets/img/recent_artwork.png" alt="" class="landing--circle__img">
                <div class="landing--circle__text">
                   Recent Artwork
                </div>
            </div>
            <div class="landing--circle">
                <img src="../../assets/img/transfer.png" alt="" class="landing--circle__img">
                <div class="landing--circle__text">
                    Recent Ownership <br/>Transfer
                </div>
            </div> -->
            <div class="landing--circle" @click="redirectAllArtwork()">
                <img src="../../assets/img/all_artwork.png" alt="" class="landing--circle__img">
                <div class="landing--circle__text">
                    All Artworks
                </div>
            </div>
            <div class="landing--circle" @click="$router.push('/missing')">
                <img src="../../assets/img/lost.png" alt="" class="landing--circle__img">
                <div class="landing--circle__text">
                    All Lost Artwork
                </div>
            </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PoliceHeader from './PoliceHeader'
export default {
  data () {
    return {
    }
  },
  methods: {
    redirectAllArtwork () {
      this.$router.push('/policeconsole')
    },
    redirectRecentArtwork () {
      this.$router.push('/')
    }
  },
  components: {
    PoliceHeader
  },
  beforeMount () {
    // this.loadAllArtworks()
    var type = sessionStorage.type
    var user = JSON.parse(sessionStorage.user)
    this.$http.defaults.headers.common = {
      Id: user.authorityId,
      Type: type
    }
    console.log(this.$http.defaults.headers.common)
  }
}
</script>
<style>
</style>
<style scoped>
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    position: relative;
    /* background-color: red; */
  }
  .panel{
    position: relative;
    left: 10%;
    /* background-color: rebeccapurple; */
  }
  </style>
