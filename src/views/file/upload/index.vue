<template>
    <div>
        <el-form ref="fileForm">
            <el-upload
                    action=""
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :file-list="fileList"
                    :on-change="doOnChange"
                    :auto-upload="false"
                    :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-button type="primary" @click="submitFile">上传服务器</el-button>
        </el-form>
    </div>


</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
            };
        },
        methods: {
            handleRemove(file, fileList) {
                //表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
                this.fileList.splice(this.fileList.indexOf(file), 1);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            /**/
            doOnChange(file, fileList) {
                console.log("file---->", file)
                console.log("fileList---->", fileList)
                this.fileList.push(file)
            },
            submitFile() {
                console.log("上传文件开始---------")
                console.log(this.fileList)
                let fileParams = {
                    files: this.fileList
                }
                this.$store.dispatch('DoUploadFiles', this.fileList[0].raw).then(res => {
                    console.log(res)
                })

            }

        }
    }
</script>

<style scoped>

</style>