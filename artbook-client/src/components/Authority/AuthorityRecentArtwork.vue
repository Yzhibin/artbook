<template>
  <div class="">
    <authority-header></authority-header>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
            <section class="section-about">
        <div class="u-center-text u-margin-bottom-big">
                <h2 class="heading-secondary" style="margin-top:-40vh;">
                    Recently Added Artworks
                </h2>
        </div>
        <div class="composition u-margin-bottom-big" style="margin-bottom:85vh;">
                        <img src="http://www.lastampa.it/rf/image_lowres/Pub/p3/2013/01/23/Cultura/Foto/NX-A-ART-8178-14042-Vincent_Willem_van_Gogh_Girasoli.jpg"
                        alt="Photo 1"
                        class="composition__photo composition__photo--p1"
                        style="cursor:pointer;"
                        @click="$router.push('/artwork/f078b12c-d5a3-47ce-88e3-4bfc71998df2')">
                        <img src="https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Haystack.-End-of-the-Summer-detail-1042x695.jpg" alt="Photo 2" class="composition__photo composition__photo--p2">
                        <img src="https://d2jv9003bew7ag.cloudfront.net/uploads/Henri-Rousseau-The-Dream.-Image-via-monsieurmecenat.tumblr.com_-1042x695.jpg" alt="Photo 3" class="composition__photo composition__photo--p3">
        </div>
    </section>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AuthorityHeader from './AuthorityHeader'
import {allArtworks} from '../../const'
export default {
  data () {
    return {
      allArtworks: allArtworks
    }
  },
  methods: {
  },
  components: {
    AuthorityHeader
  },
  beforeMount () {
  }
}
</script>
<style>
html{
}
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
  }
  .btn--add {
    position: relative;
    padding-bottom: 0;
    left: 50%;
    transform: translate(-50%,50%);
    background-color: #68C3A3;
    color: #ffffff;
    border-color: #68C3A3;
  }
  .btn--history {
    background-color: #1F3A93;
    color: #ffffff;
    border-color: #1F3A93;
  }
  .btn--document {
    background-color: #22A7F0;
    color: #ffffff;
    border-color: #22A7F0;
  }
</style>
