<template>
    <van-uploader :after-read="afterRead" />
</template>

<script setup lang="ts">
import type { UploaderFileListItem } from 'vant'
import { upload } from '@/api'
function afterRead(item: UploaderFileListItem) {
    console.log(item);
    console.log(upload);
    upload(item.file)

}
</script>