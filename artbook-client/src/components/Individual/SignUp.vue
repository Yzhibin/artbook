<template>
<div>
    <el-dialog title="SIGN UP" center :visible.sync="visible" width="30%">
    <el-form v-loading="isLoading">
        <el-form-item>
            <el-input v-model="form.name" placeholder="Name">
                <i slot="suffix" class="el-input__icon material-icons">account_circle</i>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.email" placeholder="Email Address">
                <i slot="suffix" class="el-input__icon material-icons">email</i>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.mobile" placeholder="Mobile Number">
                <i slot="suffix" class="el-input__icon material-icons">phone</i>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.passport" placeholder="Passport Number">
                <i slot="suffix" class="el-input__icon material-icons">assignment_ind</i>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.password" type="password" placeholder="Password">
                <i slot="suffix" class="el-input__icon material-icons">lock</i>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="pwd2" type="password" placeholder="Confirm Password">
                <i slot="suffix" class="el-input__icon material-icons">lock</i>
            </el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSignup()">Sign Up</el-button>
    <!-- <div class="mt-2 text-center">Already have an account?
        <a href="" @click="goLogin()">Login here!</a>
    </div> -->
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
        name: "",
        email: "",
        password: "",
        mobile: "",
        passport: ""
      },
      pwd2: "",
      isLoading: false
    };
  },
  computed: {
    visible: {
      get() {
        return this.show;
      },
      set(newValue) {
        this.$emit("close");
      }
    }
  },
  methods: {
    onSignup() {
      if (!this.form.name || !this.form.email || 
      !this.form.password || !this.pwd2 ||
      !this.form.mobile || !this.form.passport) {
        this.showError(
          "Error",
          "Please fill in all required fields.",
          "warning"
        );
        return;
      }
      if (this.form.mobile.match(/^[0-9]+$/) == null) {
        // mobile contains non-digit
        // console.log('match(/^[0-9]+$/) != null')
        this.showError(
          "Error",
          "Mobile phone number should contain only numbers.",
          "warning"
        );
        return;
      }
      if (this.form.password !== this.pwd2) {
        this.showError(
          "Error",
          "Please make sure your passwords are consistent.",
          "warning"
        );
        return;
      }
      console.log("sign up...");
      this.isLoading = true;
      let body = this.form;
      this.$http
        .post("user", this.$qs.stringify(body))
        .then(resp => {
          console.log(resp);
          this.isLoading = false;
          this.showError(
            "Success",
            `Signup successful. Now logging you in...`,
            "success"
          );
          this.closeSignup();
          this.doLogin();
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = false;
          this.showError(
            "Error",
            `Signup failed. Please try again. Status: ${
              err.response.statusText
            }`,
            "warning"
          );
        });
    },
    closeSignup() {
      this.visible = false; // evoke setter to emit close event
    },
    doLogin() {
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
          this.$router.push(`/my`);
        })
        .catch(err => {
          console.log(err.response);
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


