<template>
    <div class="border-bottom bg-white page-heading mb-3">
        <div>
            <h2 v-text="header"></h2>
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Heading',

    props: {
        header : {
            default: '',
            type: String,
            required: false,
        },
    }
}
</script>

