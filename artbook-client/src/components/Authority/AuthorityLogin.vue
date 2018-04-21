<template>
<div>
  <el-dialog title="SIGN IN" center :visible.sync="visible" width="30%">
    <el-form>
      <el-form-item>
        <el-input v-model="form.account" placeholder="Account">
          <i slot="suffix" class="el-input__icon material-icons">perm_identity</i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="Password">
          <i slot="suffix" class="el-input__icon material-icons">lock</i>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" round @click="onLogin()">Login</el-button>
  </el-dialog>
</div>
</template>
<script>
/* eslint-disable */
export default {
  props: ["show"],
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    };
  },
  computed: {
    visible: {
      get() {
        return this.show;
      },
      set(newValue) {
        this.$emit("close"); // let parent set this dialog to invisible
      }
    }
  },
  methods: {
    onLogin() {
      let body = this.form;
      this.$http
        .post("authority/login", this.$qs.stringify(body))
        .then(resp => {
          console.log(resp);
          this.closeLogin();
          // store returned user info into web storage
          sessionStorage.user = JSON.stringify(resp.data);
          sessionStorage.type = "authority";
          // set headers to identify request originator for future http requests
          this.$http.defaults.headers.common = {
            Id: resp.data.authorityId,
            Type: "authority"
          };
          console.log(this.$http.defaults.headers.common);
          this.$router.push(`/authority`);
        })
        .catch(err => {
          console.log(err);
          console.log(err.response);
          if (err.response) {
            if (err.response.statusText == "Unauthorized") {
              this.showError(
                "Error",
                "Incorrect account number or password. Please try again.",
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
    closeLogin() {
      this.visible = false; // evoke setter to emit close event
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
