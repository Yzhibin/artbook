<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
            <h3 class="my-5">Consigned Artworks</h3>
            <h5 class="text-right mb-3 mr-3">{{ user.name }}</h5>
            <div class="row justify-content-end mb-5">
                <div class="col-4">
                  <el-input
                    prefix-icon="el-icon-search"
                    placeholder="Query an artwork by its ID..."
                    v-model="query"
                    v-loading="isSearching">
                  </el-input>
                </div>
                <div class="col-2">
                    <el-button type="primary"
                    @click="queryArtwork()">
                        Search
                    </el-button>
                </div>
            </div>
            <el-table
                :data="artworks"
                v-loading="isLoading"
                :default-sort="{prop: 'id', order: 'descending'}"
                style="width: 100%">
                <el-table-column
                    width="180px"
                    prop="artworkId"
                    label="ID"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="Title"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="artist"
                    label="Artist"
                    sortable>
                </el-table-column>
                <el-table-column
                    width="150px"
                    prop="owner.name"
                    label="Owner"
                    sortable>
                </el-table-column>
                <el-table-column
                    width="150px"
                    label="Status">
                    <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.onSale ?
                        'primary' :
                        (scope.row.lost ? 'danger' : 'info')"
                        close-transition>
                        {{ formatStatus(scope.row) }}
                    </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    width="150px"
                    label="Action">
                    <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="viewDetails(scope.row)"
                        type="text"
                        size="small">
                        View Details
                    </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="col-1"></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { artworks } from "../../const.js";

export default {
  data() {
    return {
      query: "", // artwork id
      artworks: [],
      user: {},
      isLoading: false,
      isSearching: false
    };
  },
  methods: {
    queryArtwork() {
      this.isSearching = true;
      this.$http
        .get(`artwork/${this.query}`)
        .then(resp => {
          console.log(resp);
          this.isSearching = false;
          this.$router.push(`/artwork/${this.query}`);
        })
        .catch(err => {
          console.log(err.response);
          this.isSearching = false;
          if (err.response) {
            let msg =
              err.response.status === 404
                ? `Artwork not found.`
                : `Error occurred while searching for the artwork.
            Status: ${err.response.statusText}`;
            this.showError("Error", msg, "warning");
          } else {
            this.showError(
              "Error",
              "Unexpected error. Request timed out.",
              "warning"
            );
          }
        });
    },
    formatStatus(row) {
      let status = "Normal";
      if (row.onSale) {
        status = "On Sale";
      }
      if (row.lost) {
        status = "Lost/Stolen";
      }
      return status;
    },
    viewDetails(row) {
      this.$router.push(`/artwork/${row.artworkId}`);
    },
    retrieveOnSaleArtworks() {
      this.isLoading = true;
      this.$http
        .get(`agencyArtworks/${this.user.email}`)
        .then(resp => {
          console.log(resp);
          this.isLoading = false;
          this.artworks = resp.data;
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = false;
          this.artworks = artworks; // for dev
          if (err.response) {
            this.showError(
              "Error",
              `Failed to retrieve artworks. Status: ${err.response.statusText}`,
              "warning"
            );
          } else {
            this.showError("Error", `Unexpected error.`, "warning");
          }
        });
    },
    showError(title, msg, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type // success, warning
      });
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.user);
    this.$http.defaults.headers.common = {
      Id: this.user.email ? this.user.email : this.user.account,
      Type: this.type
    };
    console.log(this.$http.defaults.headers.common);
    this.retrieveOnSaleArtworks();
  }
};
</script>
<style scoped>

</style>
