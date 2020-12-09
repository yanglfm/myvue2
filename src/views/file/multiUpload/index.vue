<template>
    <div>
        multi
        <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-change="handleChange"
                multiple
                :file-list="fileList"
                :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                fileList: [],
            };
        },
        methods: {
            submitUpload() {
                // this.$refs.upload.submit();
                console.log("开始上传文件")
                console.log(this.fileList)
                var formData = new FormData()
                this.fileList.forEach(item => {
                    formData.append('files', item.raw)
                })
                console.log("formData--->", formData)
                this.$store.dispatch('DoUploadMultiFiles', formData).then(res => {
                    console.log(res)
                    this.$message.success(res.msg)
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleChange(file, fileList) {
                console.log("--file-->", file)
                this.fileList.push(file)
            }
        }
    }
</script>

<style scoped>

</style>