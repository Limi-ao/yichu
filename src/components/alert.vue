<template>
    <el-dialog :title="title" class="baseAlert" :visible.sync="visible" width="640px" height="470px">
        <slot/>
    </el-dialog>
</template>

<script>
    export default {
        name:'AlertBox',
        data(){
            return {
                visible:this.show
            }
        },
        props:['title','show','father'],
        watch:{
            show(){
                this.visible = this.show
            },
            visible(){
                if(this.visible === false){
                    this.$parent.$data[this.father] = this.visible
                }
            }
        }
    }
</script>

<style scoped>
.baseAlert>div{
    background: #f6dada
}
</style>