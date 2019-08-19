<template>
    <!-- 图片预览组件 -->
    <div id="img_preview" ref="img_preview" v-if="previewControl">
        <img :src="src" :width="initWidth" :height="initHeight" />
        <div class="fancy_button resize">
            <p>1:1</p>
        </div>
        <div class="fancy_button close">
            <svg viewBox="0 0 40 40" data-spm-anchor-id="a2c4g.11186623.0.i5.6a34149d22onYt">
                <path d="M10,10 L30,30 M30,10 L10,30" data-spm-anchor-id="a2c4g.11186623.0.i6.6a34149d22onYt"></path>
            </svg>
        </div>
    </div>
</template>
<script>
    import { getOffset } from '@/utils/common/dom';
    import { mouseWheel, windowScroll } from '@/utils/common/scroll';
    import raf from '@/utils/common/raf';
    import draggable from '@/utils/common/draggable';

    /**
     * 初始化图片进入时动画
     * @param box
     * @param imgSource
     * @param imgPreview
     * @param buttons
     */
    const initFadeIn = function(box, imgSource, imgPreview, buttons) {
        //隐藏浏览器滚动条
        if(windowScroll()) {
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = '17px';
        }
        //得到源图到浏览器窗口的距离
        /*let offsetObj =  getOffset(imgSource),
            initLeft = offsetObj.left,
            initTop = offsetObj.top - (document.body.scrollTop || document.documentElement.scrollTop);*/
        const rect =  imgSource.getBoundingClientRect(),
            initLeft = rect.left || rect.x,
            initTop = rect.top || rect.y;
        imgPreview.style.left = initLeft + 'px';
        imgPreview.style.top = initTop + 'px';
        setTimeout(()=>{
            //遮罩层淡入
            box.classList.add('steady');
            //变到居中位置
            imgPreview.classList.add('steady');
            imgPreview.removeAttribute('style');
            //按钮淡入
            Array.from(buttons).forEach(item => {
                item.classList.add('steady');
            })
        },50);
    }

    /**
     * 初始化滚动缩放效果
     * @param box
     * @param imgPreview
     * @param buttons
     * @param originImg
     */
    const initWheelZoom = function(box, imgPreview, buttons, originImg) {
        const resizeImg = function(img, direction){
            let oWidth = img.offsetWidth,
                oHeight = img.offsetHeight;
            if(direction > 0){
                img.style.width = oWidth * 1.5 + 'px';
                img.style.height = oHeight * 1.5 + 'px';
            }else{
                img.style.width = oWidth / 1.5 + 'px';
                img.style.height = oHeight / 1.5 + 'px';
            }
        }
        //绑定滚动事件
        mouseWheel(box,function(e,direction){
            resizeImg(imgPreview,direction);
        })
        //点击1:1按钮恢复原来大小
        buttons[0].addEventListener('click', function(e){
            e = e || window.event;
            e.stopPropagation();//阻止冒泡
            // 如果当前图片尺寸是原始尺寸，则调整到进入时的尺寸，否则都调整到原始尺寸
            if(imgPreview.offsetWidth === originImg.width) {
                imgPreview.style.width = '';
                imgPreview.style.height = '';
            }else {
                imgPreview.style.width = `${originImg.width}px`;
                imgPreview.style.height = `${originImg.height}px`;
            }
        })
    }

    /**
     * 初始化图片拖拽事件
     * @param imgPreview
     */
    const initImgDraggable = function(imgPreview) {
        let startPoint = null,
            startPos = null,
            curPoint = null,
            throttle = false,
            rafTimer = null;

        draggable(imgPreview, {
            start: (e) => {
                // 移除transition样式
                imgPreview.classList.add('dragging');
                startPoint = {
                    x: e.pageX,
                    y: e.pageY,
                };
                startPos = {
                    left: parseFloat(getComputedStyle(imgPreview).marginLeft),
                    top: parseFloat(getComputedStyle(imgPreview).marginTop),
                };
            },
            drag: (e) => {
                e.preventDefault();
                e.stopPropagation();

                // 节流
                if(throttle) return;
                throttle = true;
                rafTimer = raf(() => {
                    curPoint = {
                        x: e.pageX,
                        y: e.pageY,
                    }
                    const left = curPoint.x - startPoint.x + startPos.left;
                    const top = curPoint.y - startPoint.y + startPos.top;
                    imgPreview.style.marginLeft = `${left}px`;
                    imgPreview.style.marginTop = `${top}px`;

                    throttle = false;
                })
            },
            end: () => {
                // 恢复transition样式
                imgPreview.classList.remove('dragging');
                raf.cancel(rafTimer);
                rafTimer = null;
                throttle = false;
            },
        })
    }

    /**
     * 初始化预览关闭事件
     * @param box
     * @param imgSource
     * @param imgPreview
     * @param buttons
     * @param self
     */
    const initClosePreview = function(box, imgSource, imgPreview, buttons, self) {
        //点击空白处关闭
        box.onclick = function(e){
            // 点击图片不关闭
            if(e.target.nodeName === 'IMG') return;
            //遮罩层淡出
            box.classList.remove('steady');
            //图片回到原来的大小
            imgPreview.style.width = '';
            imgPreview.style.height = '';
            //图片回到原来的位置
            /*let offsetObj =  getOffset(imgSource),
                initLeft = offsetObj.left,
                initTop = offsetObj.top - (document.body.scrollTop || document.documentElement.scrollTop);*/
            const rect =  imgSource.getBoundingClientRect(),
                initLeft = rect.left || rect.x,
                initTop = rect.top || rect.y;
            imgPreview.style.left = initLeft + 'px';
            imgPreview.style.top = initTop + 'px';
            imgPreview.style.marginLeft = 0;
            imgPreview.style.marginTop = 0;
            imgPreview.classList.remove('steady');
            //按钮淡出
            Array.from(buttons).forEach(item => {
                item.classList.remove('steady');
            })
            //自我销毁
            setTimeout(function(){
                self.$parent.previewEle = null;
                self.previewControl = false;
                //恢复浏览器滚动条
                document.body.style.overflow = '';
                document.body.style.marginRight = '';
            },500);
        }
    }

    export default {
        name: "ImgPreview",
        props: ['previewEle'],
        data(){
            return {
                src: '',
                initWidth: '',
                initHeight: '',
                previewControl: false,
                originImg: null, // 原始图层
            }
        },
        methods: {
            /**
             * 初始化图片属性
             */
            initImgProperty(){
                this.src = this.previewEle.src;
                this.initWidth = this.previewEle.offsetWidth;
                this.initHeight = this.previewEle.offsetHeight;
                // 生成原始图片，用于获取图片真实宽高
                const originalImg = new Image();
                originalImg.src = this.src;
                this.originImg = originalImg;
            },
            /**
             * 初始化功能
             */
            initImgFunction(){
                let oBox = this.$refs.img_preview,
                    oImg = oBox.querySelector('img'),
                    oButtons = oBox.querySelectorAll('.fancy_button');
                initFadeIn(oBox, this.previewEle, oImg, oButtons);
                initWheelZoom(oBox, oImg, oButtons, this.originImg);
                initImgDraggable(oImg);
                initClosePreview(oBox, this.previewEle, oImg, oButtons, this);
            }
        },
        watch:{
            /**
             * 监听图片变化
             */
            previewEle(){
                if(this.previewEle === null)
                    return;
                this.previewControl = true;
                this.initImgProperty();
                this.$nextTick(()=>{
                    this.initImgFunction();
                })
            }
        }
    }
</script>
<style lang="scss">
    @import '~@/assets/styles/components/common/img-preview.scss';
</style>
