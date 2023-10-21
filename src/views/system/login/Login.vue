<template>
    <div>
        <Button :disabled="true">Login</Button>
    </div>
</template>

<script lang="ts" setup>
import Button from '@/components/Button/src/index.vue'

</script>

<style scoped lang="scss">
.parent {
    background-color: blue;
    width: 100px;
    height: 100px;

    &+& {
        background-color: red;
    }
}
</style>