<template>
  <div class="" v-loading="isLoading">
    <authority-header></authority-header>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="artworkId" label="Artwork ID" sortable>
            </el-table-column>
            <el-table-column prop="title" label="Artwork Title" sortable>
            </el-table-column>
            <el-table-column prop="artist" label="Artist" sortable>
            </el-table-column>
            <el-table-column prop="owner" label="Owner" sortable>
            </el-table-column>
            <el-table-column label="Status">
              <template slot-scope="scope">
                <el-button class="" type="success"
                v-if="scope.row.lost === false">
                In Place</el-button>
                <el-button class="" type="danger"
                v-else>
                Lost</el-button>
              </template>
            </el-table-column>
            <el-table-column label="Sale">
              <template slot-scope="scope">
                <el-button class="" type="warning"
                v-if="scope.row.onSale === false">
                Off</el-button>
                <el-button class="" type="primary"
                v-else>
                On</el-button>
              </template>
            </el-table-column>
            <el-table-column label="History">
              <template slot-scope="scope">
                <el-button class="btn--history"
                @click="viewDetails(scope.row.artworkId)">
                View History</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <add-new-artwork
    :show="displayAddArtwork"
    @close="closeDialogs()"
    ></add-new-artwork>
    <add-document
    :show="displayAddDocument"
    :artworkId="currentArtworkId"
    @close="closeDialogs()"
    ></add-document>
  </div>
</template>
<script>
import AuthorityHeader from './AuthorityHeader'
import AddNewArtwork from './AddNewArtwork'
import AddDocument from './AddDocument'
export default {
  data () {
    return {
      isLoading: true,
      displayAddArtwork: false,
      tableData: [],
      currentArtworkId: '',
      displayAddDocument: false
    }
  },
  methods: {
    viewHistory (artworkId) {
      console.log(`History for ID: ${artworkId}`)
    },
    viewDetails (artworkId) {
      console.log('view details')
      this.$router.push(`/artwork/${artworkId}`)
    },
    addDocument (artworkId) {
      console.log(`Add document for ID: ${artworkId}`)
      this.currentArtworkId = artworkId
      this.displayAddDocument = true
    },
    loadAllArtworks () {
      console.log(`Loading All Artworks`)
      this.$http
        .get('/missing')
        .then(resp => {
          console.log(resp)
          this.tableData = resp.data
          for (let data of this.tableData) {
            var owner = data.owner.name
            data.owner = owner
          }
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    closeDialogs () {
      this.displayAddArtwork = false
      this.displayAddDocument = false
    }
  },
  components: {
    AuthorityHeader,
    AddNewArtwork,
    AddDocument
  },
  beforeMount () {
    this.loadAllArtworks()
    var type = sessionStorage.type
    var user = JSON.parse(sessionStorage.user)
    this.$http.defaults.headers.common = {
      Id: user.authorityId,
      Type: type
    }
    console.log(this.$http.defaults.headers.common)
  }
}
</script>
<style>
html{
}
</style>

<style scoped>
.el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .btn--add {
    position: relative;
    padding-bottom: 0;
    left: 50%;
    transform: translate(-50%,50%);
    background-color: #68C3A3;
    color: #ffffff;
    border-color: #68C3A3;
  }
  .btn--history {
    background-color: #1F3A93;
    color: #ffffff;
    border-color: #1F3A93;
  }
  .btn--document {
    background-color: #22A7F0;
    color: #ffffff;
    border-color: #22A7F0;
  }
</style>
