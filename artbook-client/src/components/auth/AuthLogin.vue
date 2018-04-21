<template>
<div>
  <el-dialog title="SIGN IN" center :visible.sync="visible" width="30%">
    <el-form v-loading="isLoading">
      <el-form-item>
        <el-input v-model="form.email" placeholder="Email Address">
          <i slot="suffix" class="el-input__icon material-icons">email</i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="Password">
          <i slot="suffix" class="el-input__icon material-icons">lock</i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="otp" placeholder="One-Time Password (OTP)">
          <i slot="suffix" class="el-input__icon material-icons">lock</i>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" round @click="onLogin()">Give Consent</el-button>
  </el-dialog>
</div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      visible: true,
      form: {
        email: "",
        password: ""
      },
      otp: "",
      isLoading: false
    };
  },
  methods: {
    onLogin() {
      this.isLoading = true;
      let body = this.form;
      this.$http
        .post("user/login", this.$qs.stringify(body))
        .then(resp => {
          console.log(resp);
          // store returned user info into web storage
          sessionStorage.user = JSON.stringify(resp.data);
          sessionStorage.type = "user";
          // set headers to identify request originator for future http requests
          this.$http.defaults.headers.common = {
            Id: resp.data.email,
            Type: "user"
          };
          console.log(this.$http.defaults.headers.common);
          this.giveConsentUsingOtp();
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = false;
          if (err.response) {
            if (err.response.statusText == "Unauthorized") {
              this.showError(
                "Error",
                "Incorrect email or password. Please try again.",
                "warning"
              );
            } else {
              this.showError(
                "Error",
                `Login failed. Status: ${err.response.statusText}`,
                "warning"
              );
            }
          } else {
            this.showError("Error", `Unexpected error.`, "warning");
          }
        });
    },
    giveConsentUsingOtp() {
      let body = { otp: this.otp };
      this.$http
        .put("user/consentForSale", this.$qs.stringify(body))
        .then(resp => {
          console.log(resp);
          this.showError('Success', 'Painting status changed to On Sale.', 'success');
          this.$router.push(`/my`); // should see that painting's status changed to 'ON SALE'
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = false;
          if (err.response) {
            this.showError(
              "Error",
              `Invalid OTP. Status: ${err.response.statusText}`,
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
<style scoped>
.el-button {
  width: 100%;
}
</style>
