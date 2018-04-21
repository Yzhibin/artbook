<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">
      </div>
      <div class="col-10">
        <h3 class="my-5">Consent History</h3>
        <el-table
          :data="consents"
          v-loading="isLoading"
          :default-sort="{prop: 'timestamp', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            width="180px"
            prop="art.artworkId"
            label="Artwork ID"
            sortable>
          </el-table-column>
          <el-table-column
            prop="art.title"
            label="Title"
            sortable>
          </el-table-column>
          <el-table-column
            width="150px"
            prop="art.owner.name"
            label="Owner"
            sortable>
          </el-table-column>
          <el-table-column
            width="150px"
            prop="agency.name"
            label="Agency"
            sortable>
          </el-table-column>
          <el-table-column
            width="150px"
            label="Time"
            sortable>
            <template slot-scope="scope">
                {{ $moment(scope.row.timestamp).format('MMM d, YYYY') }}
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
      <div class="col-1">
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      consents: [],
      isLoading: false
    };
  },
  methods: {
    viewDetails(row) {
      this.$router.push(`/artwork/${row.art.artworkId}`);
    },
    retrieveConsentHistory() {
      this.isLoading = true;
      this.$http
        .get(`consentHistory`)
        .then(resp => {
          console.log(resp);
          this.isLoading = false;
          this.consents = resp.data;
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = false;
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
    this.$http.defaults.headers.common = {
      Id: sessionStorage.user.account,
      Type: sessionStorage.type
    };
    console.log(this.$http.defaults.headers.common);
    this.retrieveConsentHistory();
  }
};
</script>