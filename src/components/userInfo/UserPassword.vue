<template>
    <div style="color: #409EFF" :class="visible?'show':'disShow'">用户密码
        <button @click="closeShow">关闭</button>
        <div>{{userInfo}}</div>
    </div>
</template>

<script>
    export default {
        name: "userPassword",
        props: {
            userInfo: {
                type: String
            },
            dialogVisible: {
                type: Boolean
            }
        },
        computed: {
            visible: function () {
                return this.dialogVisible
            }

        },
        data() {
            return {
                // visible: this.dialogVisible
            }
        },
        methods: {
            closeShow() {
                console.log('关闭---》')
                console.log('关闭---》', this.visible)
                console.log('关闭---》', this.dialogVisible)
                this.$emit('closeDialog',false)
            }
        }
    }
</script>

<style scoped>
    .disShow {
        display: none;
    }

    .show {
        display: block;
    }

</style>