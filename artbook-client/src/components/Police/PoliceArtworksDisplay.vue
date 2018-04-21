<template>
  <div class="">
    <police-header></police-header>
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
            <el-table-column label="Update Status" width="160px;">
              <template slot-scope="scope">
                <el-button class="" type="danger"
                @click="markMissing(scope.row.artworkId)" v-if="scope.row.lost === false">
                Mark Missing</el-button>
                <el-button class="" type="success"
                @click="markRecovered(scope.row.artworkId)" v-else>
                Mark Recovered</el-button>
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
    <mark-as-missing
    :show="displayMarkMissing"
    :artworkId="currentArtworkId"
    @close="closeDialogs()"
    ></mark-as-missing>
    <mark-as-recovered
    :show="displayMarkRecovered"
    :artworkId="currentArtworkId"
    @close="closeDialogs()"
    ></mark-as-recovered>
  </div>
</template>
<script>
import PoliceHeader from './PoliceHeader'
import MarkAsMissing from './MarkAsMissing'
import {allArtworks} from '../../const'
import MarkAsRecovered from './MarkAsRecovered'
export default {
  data () {
    return {
      tableData: allArtworks,
      currentArtworkId: '',
      displayMarkMissing: false,
      displayMarkRecovered: false
    }
  },
  methods: {
    // viewDocuments (artworkId) {
    //   console.log(`Documents for ID: ${artworkId}`)
    // },
    viewHistory (artworkId) {
      console.log(`History for ID: ${artworkId}`)
    },
    viewDetails (artworkId) {
      console.log('view details')
      this.$router.push(`/artwork/${artworkId}`)
    },
    markMissing (artworkId) {
      console.log(`Add document for ID: ${artworkId}`)
      this.currentArtworkId = artworkId
      this.displayMarkMissing = true
    },
    markRecovered (artworkId) {
      console.log(`Add document for ID: ${artworkId}`)
      this.currentArtworkId = artworkId
      this.displayMarkRecovered = true
    },
    loadAllArtworks () {
      console.log(`Loading All Artworks`)
      this.$http
        .get('/artwork')
        .then(resp => {
          console.log(resp)
          this.tableData = resp.data
          for (let data of this.tableData) {
            var owner = data.owner.name
            data.owner = owner
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    closeDialogs () {
      this.displayMarkRecovered = false
      this.displayMarkMissing = false
    }
  },
  components: {
    PoliceHeader,
    MarkAsMissing,
    MarkAsRecovered
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
