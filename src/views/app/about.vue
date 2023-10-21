<template>
    <div draggable="true" class="drag flex justify-end">
        <div class="w-2">123123</div>
    </div>
    <!-- <van-uploader v-model="state.fileList" multiple :after-read="afterRead" /> -->
    <div id="drop" style="width: 250px;height: 250px;border: 1px solid #ccc;">拖动到此处</div>
</template>

<script  setup>
const state = reactive({ fileList: [] })
onMounted(() => {
    listenImg()
})
function afterRead() {
    nextTick(listenImg)
}
function listenImg() {
    // const drag = document.querySelector('.van-uploader__preview')
    const drag = document.querySelector('.drag')
    drag.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text", event.target.id);
    });

    drop.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    drop.addEventListener("drop", function (event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var draggedElement = document.getElementById(data);
        drop.appendChild(draggedElement);
    });
}
</script>