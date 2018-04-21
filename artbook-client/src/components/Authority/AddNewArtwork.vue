<template>
  <div>
    <el-dialog title="Add a new artwork" :visible.sync="visible" width="50%" center>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="Owner Email" required>
          <el-input v-model.number="form.ownerId"></el-input>
        </el-form-item>
        <el-form-item label="Artwork Title" required>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Artist" required>
          <el-input v-model="form.artist"></el-input>
        </el-form-item>
        <el-form-item label="Location" required>
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="Description" required>
          <el-input v-model="form.description" type="textarea" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="Crafted At" required>
          <el-date-picker
             v-model="form.createTime"
             type="date"
             placeholder="Pick a Date"
             format="yyyy/MM/dd"
             value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-upload style=""
        :on-success="fileUploaded"
          class="upload-demo"
          drag
          :action="this.$http.defaults.baseURL+'upload'"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable */
  export default {
    props:[
          "show"
      ],
    data() {
      return {
       form: {
         ownerId: '',
         title: '',
         artist: '',
         location: '',
         description: '',
         createTime:''
        },
        fileId: '',
        artworkId: ''
      }
    },
    methods: {
      onSubmit() {
      },
      fileUploaded: function (response, file, fileList) {
        console.log(response)
        this.fileId = response
      },
      submitForm() {
        // console.log('submit!')
        const body = this.form
        console.log('submission starts below')
        this.$http
        .post("/artwork", body)
        .then(resp => {
          console.log(resp)
          console.log('receiveed')
          this.artworkId = resp.data.artworkId
          console.log(`Artwork ID is: ${this.artworkId}`)
          this.addPicToArtwork()
        })
        .catch(err => {
          console.log(err)
          this.showError('Error', `Add Artwork Failed Status: ${err}`, 'warning')
        })
      },
      addPicToArtwork () {
        const body = {
          artworkId: this.artworkId,
          fileId: this.fileId
        }
        this.$http
        .put("/artwork", body)
        .then(resp => {
          console.log(resp)
          console.log('added pic to artwork')
          this.$message({
                message: 'Congrats, this is a success message.',
                type: 'success'
            })
        })
        .catch(err => {
          console.log(err)
          this.showError('Error', `Add Artwork Failed Status: ${err}`, 'warning')
        })
      }
    },
    computed: {
      visible: {
      get() {
        return this.show;
      },
      set(newValue) {
        this.$emit("close") // let parent set this dialog to invisible
      }
    }
    },
    beforeMount () {
    // this.loadAllArtworks()
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
