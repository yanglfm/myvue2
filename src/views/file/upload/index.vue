<template>
    <div>

        <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList"
                @on-change="handleChange"
                :http-request="getFile"
        >
            <el-button size="small" type="primary">上传</el-button>
        </el-upload>
        <el-button size="small" type="success" @click="upload">确认上传</el-button>
    </div>


</template>

<script>

    import axios from 'axios'

    export default {
        name: "index",
        data() {
            return {
                file: {},
                fileList: []
            }
        },
        methods: {
            getFile(item) {
                console.log(item.file)
                this.file = item.file
            },
            upload() {
                const fd = new FormData()
                fd.append('filename', this.file)
                // const config = { headers: { 'Content-Type': 'multipart/form-data' }}
                this.$store.dispatch('DoUploadFiles', fd
                ).then(response => {
                    console.log(response)
                    this.$message.success(response.msg)
                })
            },
            handleChange(file, fileList) {

            },

        }

    }
</script>

<style scoped>

</style>