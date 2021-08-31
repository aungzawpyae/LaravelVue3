<template>
    <div class="h-screen flex overflow-hidden bg-gray-100">
        <side-bar></side-bar>

        <div class="w-full overflow-hidden">

            <nav-bar></nav-bar>

            <main class="w-full h-full">
                <slot name="header"></slot>
                <slot></slot>
            </main>

            <footer-bar></footer-bar>
        </div>
    </div>
</template>

<style>
</style>

<script>
    import { mapGetters } from "vuex";
    import Sidebar from "../layouts/Sidebar.vue";
    import Nav from "../layouts/Nav.vue";
    import Header from "../layouts/Header.vue";
    import Footer from "../layouts/Footer.vue";

    export default {
        name:"MainLayout",

        props: {
            header: {
                default: "",
                type: String,
                required: false
            },
        },

        components:{
            'side-bar'  : Sidebar,
            'nav-bar'   : Nav,
            'header-bar': Header,
            'footer-bar': Footer,
        },

        data(){
            return{
                user: this.$store.state.auth.user,
            }
        },
        mounted(){},
        methods:{}
    };
</script>