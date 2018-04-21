<template>
  <div>
    <el-dialog title="Add a Document" :visible.sync="visible" width="50%" center>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="Document Title" required>
          <el-input v-model="form.fileName"></el-input>
        </el-form-item>
        <el-form-item label="Issued By" required>
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="Description" required>
          <el-input v-model="form.summary"></el-input>
        </el-form-item>
        <el-form-item label="Issue Date" required>
          <el-date-picker
             v-model="form.issueDate"
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
/* eslint-disable */
  export default {
    props:[
          "show", "artworkId"
      ],
    data() {
      return {
       form: {
           fileName:'',
           fileId:'',
           issueDate:'',
           author:'',
           summary:''
        }
      }
    },
methods: {
    onSubmit() {
    },
    fileUploaded: function (response, file, fileList) {
    console.log(response)
    this.form.fileId = response
    },
    submitForm() {
        const body = {
            fileName: this.form.fileName,
            fileId:this.form.fileId,
            issueDate: this.form.issueDate,
            author: this.form.author,
            artworkId: this.artworkId,
            summary: this.form.summary
        }
        console.log('submission starts below')
        this.$http
        .post("/document", body)
        .then(resp => {
            console.log(resp)
            console.log(resp.data.documentId)
            this.$message({
                message: 'Congrats, this is a success message.',
                type: 'success'
            })
        })
        .catch(err => {
          console.log(err)
          this.showError('Error', `Add Document Failed Status: ${err}`, 'warning')
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
