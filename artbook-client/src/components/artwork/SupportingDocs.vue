<template>
    <div>
        <div v-loading="isLoading">
            <div v-if="!documents || !documents.length">
                <h5 class="text-center my-5 py-5">
                    This artwork currently does not have any supporting documents.
                </h5>
            </div>
            <div v-else>
                <el-collapse>
                    <el-collapse-item
                    v-for="document in documents" :key="document.documentId"
                    :title="`\'\'${document.title}\'\' issued on ` + $moment(document.issueDate).format('MMM d, YYYY') + ` by ${document.author}`"
                    :name="document.documentId">
                        <!-- <img class="img-fluid"
                        :src="`${baseUrl}retrieve/${document.fileId}`" :alt="document.title"> -->
                        <div class="mx-4">{{ document.summary }}</div>
                        <div class="text-center">
                            <a :href="`${baseUrl}retrieve/${document.fileId}`" target="_blank">
                                View Document
                                <!-- <el-button type="text">View Document</el-button> -->
                            </a>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { docs, baseUrl } from "../../const.js";

export default {
  props: ["artworkId"],
  data() {
    return {
      baseUrl: baseUrl,
      isLoading: false,
      documents: [] // array of document entities
    };
  },
  methods: {
    retrieveDocuments() {
      this.isLoading = true;
      this.$http
        .get(`getDocuments/${this.artworkId}`)
        .then(resp => {
          console.log(resp);
          this.documents = resp.data;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err.response);
          if (err.response) {
            this.showError(
              "Error",
              `Failed to retrieve documents. Status: ${
                err.response.statusText
              }`,
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
    this.retrieveDocuments();
  }
};
</script>
<style scoped>

</style>
