<template>
  <div class="container-fluid" v-loading="isLoading">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 py-4 content">
        <h5 class="text-right mb-3 mr-3">{{ user.name ? user.name : user.account }}</h5>
        <!-- ARTWORK DETAILS -->
        <artwork-overiew :artwork="artwork"></artwork-overiew>

        <div class="row justify-content-between">
          <div class="col-8">
            <!-- <p class="mb-0">
              <strong class="d-inline-block">
                Currently owned by:
              </strong>
                {{ artwork.owner ? artwork.owner.name : 'loading...' }}
            </p>
            <div class="mb-0">
              <strong class="d-inline-block">
                Last transacted at:
              </strong>
              USD${{ '450,000' }}
            </div> -->
          </div>

          <div class="col-4">
            <!-- AGENCY ACTIONS -->
            <!-- button to engage owner -->
            <div v-if="type === 'agency' && !artwork.onSale">
              <el-tooltip class="item"
              effect="dark"
              placement="bottom-start">
                <div slot="content">
                  Send a request to the owner of this artwork<br/>
                  to obtain his/her consent to sell.
                </div>
                <el-button type="primary" plain
                  @click="showEngageOwnerDialog = true">
                  Engage Owner for Consent
                  <i class="el-icon-info el-icon-right"></i>
                </el-button>
              </el-tooltip>
            </div>
            <!-- TODO: button to transfer ownership -->
            <div v-if="type === 'agency' && artwork.onSale && artwork.handler.email === user.email">
              <el-tooltip class="item"
              effect="dark"
              placement="bottom-start">
                <div slot="content">
                  Send a payment request to the interested buyer<br/>
                  of this artwork to initiate ownership transfer.
                </div>
                <el-button type="primary" plain
                  @click="showContactBuyerDialog = true">
                  Contact Buyer for Payment
                  <i class="el-icon-info el-icon-right"></i>
                </el-button>
              </el-tooltip>
            </div>
            <!-- TODO: POLICE ACTIONS -->
            <div v-if="type === 'agency'"></div>
            <!-- TODO: AUTHORITY ACTIONS -->
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-3 artwork-history">
            <!-- TODO: TRANSACTION HISTORY -->
            <transaction-history :artworkId="this.$route.params.id"></transaction-history>
          </div>
          <div class="col-9">
            <!-- SUPPORTING DOCUMENTS -->
            <supporting-docs :artworkId="this.$route.params.id"></supporting-docs>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
<!--............ DIALOGS ARE PLACED BELOW ....................-->
    <!-- REQUEST CONSENT DIALOG -->
    <el-dialog
      title="Engage Artwork Owner"
      :visible.sync="showEngageOwnerDialog"
      v-loading="dialog.isSendingRequest"
      width="50%">
      <div class="px-3">
        <div class="row">
          <div class="col-9">
            <el-input
            placeholder="Input owner email..."
            v-model="dialog.email"></el-input>
          </div>
          <div class="col-3">
            <el-button icon="el-icon-search" circle
            @click="getUserByEmail(dialog.email)">
            </el-button>
          </div>
        </div>
        <div class="my-2 mx-2" v-loading="dialog.isLoading">
          <p v-if="dialog.info && dialog.info != {}">
          {{ `Name: ${dialog.info.name}; Phone No.: ${dialog.info.mobile}; Passport No.: ${dialog.info.passport}` }}
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEngageOwnerDialog = false">Cancel</el-button>
        <el-button type="primary"
        :disabled="dialog.disableConfirmBtn"
        @click="requestConsent()">
          Confirm
          <i style="font-size: 1em;"
          class="material-icons">send</i>
        </el-button>
      </span>
    </el-dialog>
    <!-- TRANSFER OWNERSHIP DIALOG -->
    <el-dialog
      title="Contact Interested Buyer"
      :visible.sync="showContactBuyerDialog"
      v-loading="dialog.isSendingRequest"
      width="50%">
      <div class="px-3">
        <div class="row">
          <div class="col-9">
            <el-input
            type="email"
            placeholder="Input buyer email..."
            v-model="dialog.email"></el-input>
            <el-input class="my-3"
            placeholder="Input purchase price..."
            v-model="dialog.price"></el-input>
          </div>
          <div class="col-3">
            <el-button icon="el-icon-search" circle
            @click="getUserByEmail(dialog.email)">
            </el-button>
          </div>
        </div>
        <div class="my-4 mx-2" v-loading="dialog.isLoading">
          <p v-if="dialog.info && dialog.info != {}">
          {{ `Name: ${dialog.info.name}; Phone No.: ${dialog.info.mobile}; Passport No.: ${dialog.info.passport}` }}
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showContactBuyerDialog = false">Cancel</el-button>
        <el-button type="primary"
        :disabled="dialog.disableConfirmBtn"
        @click="requestPayment()">
          Confirm
          <i style="font-size: 1em;"
          class="material-icons">send</i>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import ArtworkOveriew from "./artwork/ArtworkOverview.vue";
import TransactionHistory from "./artwork/TransactionHistory.vue";
import SupportingDocs from "./artwork/SupportingDocs.vue";
import { artworks } from "../const.js";

export default {
  data() {
    return {
      artwork: {},
      isLoading: false,
      type: "", // user type: agency, user, authority or police
      user: {}, // user info retrieved from session storage
      showEngageOwnerDialog: false,
      showContactBuyerDialog: false,
      dialog: {
        isLoading: false,
        isSendingRequest: false,
        email: "", // owner email or buyer email
        info: "", // owner info or buyer info
        price: "",
        disableConfirmBtn: true // disable the Confirm button before agency searches user info using owner's email address
      }
    };
  },
  methods: {
    retrieveArtwork(id) {
      this.isLoading = true;
      this.$http
        .get(`artwork/${id}`)
        .then(resp => {
          console.log(resp);
          this.isLoading = false;
          this.artwork = resp.data;
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = false;
          this.artworks = artworks[0]; // for dev
          if (err.response) {
            this.showError(
              "Error",
              `Failed to retrieve artworks. Status: ${err.response.statusText}`,
              "warning"
            );
          }
        });
    },
    getUserByEmail(email) {
      this.dialog.disableConfirmBtn = true;
      this.dialog.isLoading = true;
      this.$http
        .get(`agency/getUser/${email}`)
        .then(resp => {
          console.log(resp);
          this.dialog.isLoading = false;
          this.dialog.info = resp.data;
          this.dialog.disableConfirmBtn = false; // allow user to request for consent after checking owner info
        })
        .catch(err => {
          console.log(err.response);
          this.dialog.isLoading = false;
          this.dialog.info = "";
          if (err.response) {
            if (err.response.status === 404) {
              this.showError("Error", "Email not found.", "warning");
            } else {
              this.showError(
                "Error",
                `Failed to retrieve owner info. Please try again. Status: ${
                  err.response.statusText
                }`,
                "warning"
              );
            }
          } else {
            this.showError("Error", "Unexpected error.", "warning");
          }
        });
    },
    requestConsent() {
      this.dialog.isSendingRequest = true;
      let body = {
        artworkId: this.artwork.artworkId
      };
      this.$http
        .post("agency/requestConsent", this.$qs.stringify(body))
        .then(resp => {
          console.log(resp);
          this.dialog.isSendingRequest = false;
          this.showEngageOwnerDialog = false;
          this.showError(
            "Success",
            "An email has been sent to the owner of this artwork to request for his/her consent to sell.",
            "success"
          );
        })
        .catch(err => {
          console.log(err.response);
          this.dialog.isSendingRequest = false;
          if (err.response) {
            this.showError(
              "Error",
              `Failed to send request. Status: ${err.response.statusText}`,
              "warning"
            );
          } else {
            this.showError("Error", "Unexpected error.", "warning");
          }
        });
    },
    requestPayment() {
      if (!this.dialog.price || this.dialog.price.match(/^[0-9]+$/) == null) {
        // price contains non-digit
        // console.log('match(/^[0-9]+$/) != null')
        this.showError(
          "Error",
          "Price should contain only numbers.",
          "warning"
        );
        return;
      }
      this.dialog.isSendingRequest = true;
      let body = {
        buyerEmail: this.dialog.email,
        artworkId: this.artwork.artworkId,
        price: this.dialog.price
      };
      this.$http
        .post("agency/requestForPayment", this.$qs.stringify(body))
        .then(resp => {
          console.log(resp);
          this.dialog.isSendingRequest = false;
          this.showContactBuyerDialog = false;
          this.showError(
            "Success",
            "An email containing payment request has been sent to the interested buyer of this artwork.",
            "success"
          );
        })
        .catch(err => {
          console.log(err.response);
          this.dialog.isSendingRequest = false;
          if (err.response) {
            if (err.response.statusText === 404) {
              this.showError("Error", "Email not found.", "warning");
            } else {
              this.showError(
                "Error",
                `Failed to send request. Status: ${err.response.statusText}`,
                "warning"
              );
            }
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
  },
  components: {
    ArtworkOveriew,
    TransactionHistory,
    SupportingDocs
  },
  created() {
    // set user type: agency, user, authority (inc. police)
    this.type = sessionStorage.type;
    this.user = JSON.parse(sessionStorage.user);
    if (!this.type || !this.user)
      this.showError(
        "Error",
        "User type and info not available in Storage.",
        "warning"
      );
    // set headers once again to be sure
    this.$http.defaults.headers.common = {
      Id: this.user.email ? this.user.email : this.user.authorityId,
      Type: this.type
    };
    console.log(this.$http.defaults.headers.common);
    this.retrieveArtwork(this.$route.params.id);
  }
};
</script>
<style>
.artwork-history {
  border-right: 1px solid lightgray;
  padding-right: 1.5rem;
}
div.content {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
}
</style>
