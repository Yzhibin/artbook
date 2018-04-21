<template>
  <!-- A REUSABLE COMPONENT -->
    <div>
        <!-- artwork title -->
        <h1>{{ artwork.title }}</h1>
        <hr class="mt-1">
        <!-- creator info -->
        <div class="row justify-content-between mb-0">
            <div class="col">
                <i class="material-icons">person_pin</i>
                <span class="align-text-bottom">
                    {{ artwork.artist }}
                </span>
            </div>
            <div class="col">
                <i class="material-icons">date_range</i>
                <span class="align-text-bottom">
                    {{ $moment(artwork.createTime).format("MMM, YYYY") }}
                </span>
            </div>
            <div class="col">
                <i class="material-icons">location_on</i>
                <span class="align-text-bottom">
                    {{ artwork.location }}
                </span>
            </div>
            <div class="col-4">
                <i class="material-icons">fingerprint</i>
                <span class="align-text-bottom">
                    {{ artwork.artworkId }}
                </span>
            </div>
            <div class="col">
                <i class="material-icons text-success">info</i>
                <span class="align-text-bottom text-success">
                    {{ artwork.onSale ? "ON SALE" : (artwork.lost ? "LOST/STOLEN" : "Normal") }}
                </span>
            </div>
        </div>
        <!-- painting images -->
        <div v-if="artwork">
            <h5 class="text-center my-5 py-5"
            v-if="!artwork.pictures || artwork.pictures.length === 0">
            This artwork currently does not have any pictures.
            </h5>
            <el-carousel class="mt-2" v-else
            :interval="5000"
            trigger="click" type="card" height="260px">
                <el-carousel-item
                v-for="picture in artwork.pictures" :key="picture">
                    <img class="img-fluid mb-1"
                        :src="`${baseUrl}retrieve/${picture}`" alt="loading artwork image...">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- painting description -->
        <p class="mt-3">{{ artwork.description }}</p>
    </div>
</template>
<script>
/* eslint-disable */
import { baseUrl } from "../../const.js";

export default {
  props: ["artwork"],
  data() {
    return {
      baseUrl: baseUrl,
      isLoading: false
    };
  },
  methods: {
    showError(title, msg, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type // success, warning
      });
    }
  },
  created() {}
};
</script>
<style scoped>
h1 {
  color: #303133;
}
div {
    font-size: 1.5rem;
}
</style>


