<template>
    <button :disabled="disabled">
        <slot />
    </button>
    <div class="progress is-processing">
        <div class="progress-bar  el-progress-bar__inner" :style="{ width: `${progress}%` }"></div>
    </div>
</template>

<script lang="ts" setup>
type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
type ButtonSize = 'medium' | 'small' | 'mini'
interface Button {
    type?: ButtonType;
    size?: ButtonSize;
    disabled: boolean;
    progress: number;
}

withDefaults(defineProps<Button>(), {
    type: 'primary',
    size: 'mini',
    disabled: false,
    progress: 30
})


</script>

<style lang="scss" scoped>
@import '../../../assets/style/mixins.scss';


@keyframes line-processing {
    0% {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 100%;
        opacity: 1;
    }

    100% {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
    }
}

@keyframes circle-processing {
    0% {
        opacity: 0;
        stroke-dashoffset: 0;
    }

    100% {
        opacity: 1;

    }
}

.progress {
    margin-top: 100px;
    width: 300px;
    height: 20px;
    background-color: #ebeef5;
    border-radius: 10%;
    position: relative;
    border: 1px solid #ccc;

    .progress-bar {
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
        background-color: #67c23a;
        z-index: 10;
        overflow: hidden;
        vertical-align: middle;
    }

    @include when(processing) {
        .el-progress-bar__inner::before {
            content: '';
            background-image: linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, 0.5) 100%);
            animation: line-processing 2s infinite;
        }

        .el-circle__processing {
            animation: circle-processing 2s infinite reverse;
        }

    }
}
</style>