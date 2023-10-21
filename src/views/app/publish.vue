<template>
    <nav-top msg="发布" class="top" :isExport="true" exportText="提交" @exportData="exportData"></nav-top>
    <div class="message">
        <van-field v-model="state.message" maxlength="200" :rows="4" autosize label="" type="textarea"
            placeholder="请输入..." />
    </div>
    <div class="upload">
        <div class="t-upload">
            <div class="file-list"></div>
            <div class="uploader__input-wrapper">
                <input style="opacity: 0; position: absolute; z-index: -1;" type="file" ref="uploadRef" @change="change" />
                <div class="upload-box" @click="handleUpload"></div>
            </div>
        </div>
        <van-uploader :before-read="beforeRead" :after-read="afterRead" :max-count="9" :deletable="false" preview-size="90"
            v-model.fileList="state.fileList" multiple>
            <template #preview-cover="{ file }">
                <div v-show="isShowFile(file.type)" class="preview-cover van-ellipsis" @click="handleFile(file)">
                    <div class="mask">
                        <img class="icon_play" src="@/static/images/play.png" alt="">
                    </div>
                </div>
            </template>
        </van-uploader>
        <div id="mse" v-show="true" style="width: 100px;height: 100px;"></div>
        <van-button type="danger" block class="del-btn">删除</van-button>
    </div>
</template>
          
<script setup>
import { reactive, ref, computed, onMounted, nextTick } from 'vue'
import { sysfileUpload } from '@/api'
import Player, { Events } from 'xgplayer'
import 'xgplayer/dist/index.min.css'
import { Toast } from "vant";
import navTop from "@/components/nav.vue"
import { getSuffix } from '@/util'
const extentionList = ['video/mp4', 'video/avi', 'video/3gp']
const state = reactive({
    message: '',
    fileList: [],
    files: [],
    src: '',
    player: null
})
const uploadRef = ref()
onMounted(() => {
    let player = new Player({
        id: 'mse',
        url: 'http://192.168.10.133:18990/admin/sys-file/zhdj/ce0a40b06c4f4123b176cf6f037e728a.mp4',
        height: '250px',
        width: '250px',
    });
    // console.log(player);

    state.player = player
    player.on(Events.LOADED_DATA, () => {
        // const canvas = document.createElement('canvas');
        // canvas.width = player.video.videoWidth;
        // canvas.height = player.video.videoHeight;
        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(player.video, 0, 0, canvas.width, canvas.height);
        // const coverUrl = canvas.toDataURL('image/jpeg');
        // console.log('封面地址:', coverUrl);
    });
})

function isShowFile(extention) {
    return extentionList.includes(extention)
}


function exportData() {
    console.log(12312);
}
function handleFile(file) {
    console.log('💨💨💨 ~ file:', file)
    const item = state.fileList.find(i => i.file.timestampx === file.timestampx)
    console.log('💨💨💨 ~ item:', item)
    state.player.src = item.url
    state.player.on(Events.LOADED_DATA, () => {
        state.player.getFullscreen()
        state.player.play()
    })
}

function beforeRead(file) {
    file.timestampx = new Date().getTime()
    const ImageTypes = ["image/jpeg", "image/jpg", "image/png", 'video/mp4'];
    if (ImageTypes.indexOf(file.type) === -1) {
        Toast("请上传正确格式的文件");
        return false;
    }
    return true;
}

function afterRead(file) {
    const form = new FormData()
    form.append('file', file.file)
    sysfileUpload(form).then(({ data }) => {
        state.files.push(data)
        state.fileList.at(-1).url = data.url
        getSuffix(data.url) === 'mp4' && validateVideo(data)
    }).catch(() => {
        state.fileList.pop()
        state.files.pop()
    }).finally(bindEvent)
}

function bindEvent() {
    nextTick(() => {
        let startX, startY, xx = 0, yy = 0, endX, endY
        const nodeList = document.querySelectorAll('.van-uploader__preview')
        const uploader = document.querySelector('.van-uploader__upload')
        let dWidth =
            document.documentElement.clientWidth || document.body.clientWidth;
        let dHeight = document.querySelector('.upload').clientHeight
        console.log('💨💨💨 ~ dHeight:', dHeight)
        nodeList.length < 9 && (uploader.style.left = nodeList.length % 4 * 100 + 'px')
        nodeList.length < 9 && (uploader.style.top = (nodeList.length / 4 | 0) * 100 + 'px')
        var oWrap = document.getElementsByClassName("van-uploader__wrapper");
        const aItems = nodeList
        nodeList.forEach((el, i) => {
            aItems[i].ontouchstart = function (e) {
                e.preventDefault()
                var evt = e || event;
                var x = evt.touches[0].clientX - evt.target.offsetLeft;
                var y = evt.touches[0].clientY - evt.target.offsetTop;
                /*var x = evt.clientX - this.offsetLeft - oWrap.offsetLeft;
                var y = evt.clientY - this.offsetTop - oWrap.offsetTop;*/
                var _this = this;

                var cloneNode = this.cloneNode();
                cloneNode.style.border = '1px dashed #cecece';
                this.style.zIndex = 1;
                oWrap.replaceChild(cloneNode, this);
                oWrap.appendChild(this);
                document.ontouchmove = function (e) {
                    var evt = e || event;
                    var _left = evt.touches[0].clientX - x - oWrap.offsetLeft;
                    var _top = evt.touches[0].clientY - y - oWrap.offsetTop;
                    _this.style.left = _left + "px";
                    _this.style.top = _top + "px";
                    console.log(_this.style.left);
                    console.log(_this.style.top);
                    return false;
                }

                document.ontouchend = function (e) {
                    //交换位置
                    var disArr = [];
                    var newArr = [];
                    console.log(aItems.length);
                    for (var i = 0; i < len; i++) {
                        var disX = _this.offsetLeft - aItems[i].offsetLeft;
                        var disY = _this.offsetTop - aItems[i].offsetTop;
                        var dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
                        disArr.push(dis);
                        newArr.push(dis);
                    }
                    disArr.sort(function (a, b) {
                        return a - b;
                    })
                    var minIndex = newArr.indexOf(disArr[0]);

                    _this.style.left = aItems[minIndex].style.left;
                    _this.style.top = aItems[minIndex].style.top;
                    aItems[minIndex].style.left = cloneNode.style.left;
                    aItems[minIndex].style.top = cloneNode.style.top;
                    oWrap.removeChild(cloneNode);
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        })
        // nodeList.forEach((el, i) => {
        //     console.log('💨💨💨 ~ el:', el)
        //     el.style.position = 'absolute'
        //     el.style.top = (i / 4 | 0) * 100 + 'px'
        //     el.style.left = i % 4 * 100 + 'px'
        //     el.addEventListener('touchstart', e => {
        //         console.log('💨💨💨 ~ e:', e.touches[0].pageX, e.touches[0].pageY)
        //         startX = e.touches[0].pageX
        //         startY = e.touches[0].pageY

        //     })
        //     el.addEventListener('touchmove', e => {
        //         console.log('e.touches[0].pageX', e.touches[0].pageX);
        //         let offsetX = e.touches[0].pageX - startX,
        //             offsetY = e.touches[0].pageY - startY;
        //         console.log(offsetX, offsetY);
        //         let x = offsetX,
        //             y = offsetY;
        //         if (x < 0) x = 0
        //         if (y < 0) y = 0
        //         if (e.touches[0].pageX > document.body.clientWidth - 60) {
        //             x = document.body.clientWidth - 120
        //         }
        //         if (e.touches[0].pageX > document.body.clientHeight - 40) {
        //             y = document.body.clientHeight - 40
        //         }
        //         // console.log('clientWidth', document.body.clientWidth - 40);
        //         el.style.left = x + 'px'
        //         el.style.top = y + 'px'
        //         endX = x
        //         endY = y
        //     })
        //     el.addEventListener("touchend", e => {
        //         console.log('touchend');
        //         console.log(endX, endY);
        //         xx = endX
        //         yy = endY
        //     });
        // })
    })
}

function validateVideo(data) {
    state.player.src = data.url
    state.player.on(Events.LOADED_DATA, () => {
        if (state.player.duration > 10) {
            Toast('视频长度不可超过10秒')
            state.fileList.pop()
            state.files.pop()
        }
    })
}

function handleUpload() {
    uploadRef.value.click()
}
function change(e) {
    console.log(e.target.files);
}
</script>

<style lang="less" scoped>
.message {
    margin-top: 130px;
}

.upload {
    padding: 10px 30px;
    height: calc(100vh - 440px);
    position: relative;

    .del-btn {
        position: absolute;
        bottom: 0px;
        height: 150px;
        left: 0;
    }

    .preview-cover {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 4px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #fff;

        .mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;

            .icon_play {
                width: 100px;
                height: 100px;
            }
        }
    }
}

#mse {
    position: absolute;
    left: -100vw;
    top: -100vh;
    z-index: -10;
}

.t-upload {
    .upload-box {
        width: 180px;
        height: 180px;
        border: 1px solid #ccc;
    }
}
</style>