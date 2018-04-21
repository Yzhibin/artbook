<template>
<!-- A REUSABLE COMPONENT -->
    <div>
        <div v-loading="isLoading">
            <div v-if="history.length === 0">
                This artwork has yet to be transacted.
            </div>
            <div v-for="transaction in history" :key="transaction.transactionId">
                <div class="text-right my-0 time">
                {{ $moment(transaction.timestamp).format('MMM d, YYYY') }}
                </div>
                <div class="text-right my-0 time">
                {{ $moment(transaction.timestamp).format('h:mm:ss') }}
                </div>
                <div class="text-right my-0">
                    <span>Sold at</span>
                    ${{ transaction.amount }}
                </div>
                <div class="text-right my-0">
                    <span>by</span>
                    {{ transaction.agency ? transaction.agency.name : 'loading...' }}
                </div>
                <!-- <div class="text-right my-0">
                    (Transaction ID:
                    {{ transaction.transactionId }})
                </div> -->
                <div class="text-right my-3">
                    <i class="el-icon-caret-top ml-auto"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  props: ["artworkId"],
  data() {
    return {
      isLoading: false,
      history: []
    };
  },
  methods: {
    getTransactionHistory() {
      if (!this.artworkId) return;
      this.isLoading = true;
      this.$http
        .get(`transferHistory/${this.artworkId}`)
        .then(resp => {
          console.log(resp);
          this.isLoading = false;
          this.history = resp.data;
        })
        .catch(err => {
          console.log(err.response);
          this.isLoading = false;
          if (err.response) {
            this.showError(
              "Error",
              `Failed to retrieve transaction history. Status: ${err.response.statusText}`,
              "warning"
            );
          } else {
              this.showError(
              "Error",
              `Unexpected error.`,
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
  },
  created() {
    this.getTransactionHistory();
  }
};
</script>
<style scoped>
div.time {
  font-size: 0.8em;
  font-style: italic;
}
div span {
  font-size: 0.9em;
  display: inline-block;
}
div {
    font-size: 1.5rem;
}
</style>
