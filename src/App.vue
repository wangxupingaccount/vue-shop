<template>
    <div id="app">
        <n-header></n-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import nHeader from './components/Header.vue';
    export default {
        data(){
            return {
                textName:""
            }
        },
        components: {
            nHeader
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped="">
@import 'css/style.css';
@import 'css/modal.css';

</style>