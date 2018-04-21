<template>
<div>
    <el-dialog style="background-color: #F39C12;" :title="'Payment '+ this.$route.params.paymentId" center :visible="true" width="30%">
    <el-form v-loading="isLoading">
        <h3 class="text-center">Price of artwork: ${{dueAmount}}</h3>
    </el-form>
    <el-button style="margin-top:10%" type="primary" @click="onPay()">Pay <i class="el-icon-d-arrow-right el-icon-right"></i></el-button>
</el-dialog>
</div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      isLoading: false,
      form: {
        name: "",
        email: "",
        pwd: ""
      },
      pwd2: "",
      dueAmount: this.$route.params.price,
      accountBalance: "4000"
    };
  },
  computed: {},
  methods: {
    onPay() {
      console.log("payment starts");
      this.isLoading = true;
      this.$http
        .get("/user/payment/" + this.$route.params.token)
        .then(resp => {
          console.log(resp);
          this.isLoading = false;
          this.showError(
            "Success",
            "Painting added to your artworks.",
            "success"
          );
          this.$router.push(`/`); // direct to home page to login, should see artwork added in the table
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
          if (err.response) {
            this.showError(
              "Error",
              `Failed to deduct payment. Status: ${err.response.statusText}`,
              "warning"
            );
          } else {
            this.showError("Error", "Unexpected error.", "warning");
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
  }
};
</script>
<style>
.el-button {
  width: 100%;
}
</style>


