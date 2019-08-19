/* 单位换算 */
const fileUnits = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024,
}
export default {
    data() {
        return {
            fileTypes: {},
            file: null, // 准备上传的文件
            fileSize: 0, // 文件限制大小
            fileUnit: 'MB', // 文件限制单位
            fileOverSize: false, // 文件超出指定大小
            fileName: '', // 文件名称
            fileTypeError: false, // 类型错误
            loaded: null, // 进度条百分比
        }
    },
    methods:{
        /**
         * 取消按钮
         */
        handleCancel() {
            this.$emit('change', false);
            this.$nextTick(() => {
                this.reset();
                this.clearFile();
            })
        },

        /**
         * 重置数据
         */
        reset() {
            Object.assign(this, {
                loaded: null,
                file: null,
                /*fileSize: 0,*/
                fileName: '',
                fileOverSize: false,
                fileTypeError: false,
            })
        },
        /**
         * 清除文件
         */
        clearFile() {
            const fileInput = this.$refs['file-upload'];
            fileInput && (fileInput.value = '');
        },
        /**
         * 选择文件
         */
        handleFile(e) {
            if(e.target.files.length){
                let file = e.target.files[0];
                // 判断类型是否符合
                if(Object.keys(this.fileTypes).length && !Object.values(this.fileTypes).includes(file.type)) {
                    this.fileTypeError = true;
                    return;
                }else {
                    this.fileTypeError = false;
                }
                //判断是否超过大小
                if(file.size / fileUnits[this.fileUnit] > this.fileSize){
                    this.fileOverSize = true;
                    return;
                }else{
                    this.fileOverSize = false;
                }
                this.fileName = file.name;
                this.file = file;
            }
        },
        /**
         * 模拟上传进度
         */
        virtualProgress(startTime, resolve) {
            requestAnimationFrame(() => {
                const rate = (Date.now() - startTime) / this.virtualProgressTime;
                this.loaded = Math.floor(Math.min(rate, 1) * 100);
                rate < 1 ? this.virtualProgress(startTime, resolve) : resolve();
            })
        },
        /**
         * 开启模拟上传
         */
        startVirtualUpload() {
            return new Promise(resolve => {
                this.virtualProgress(Date.now(), resolve);
            })
        },
        /**
         * 开启延迟关闭窗口
         */
        startCloseDelay() {
            return new Promise(resolve => {
                setTimeout(resolve, this.closeDelay);
            })
        },
        /**
         * 上传文件
         */
        async handleUpload(options) {
            try {
                if(!this.file) {
                    this.$message['warning'](options.fileEmptyWarning, {
                        pos: 'topCenter',
                    });
                    return;
                }
                // 绑定图片名称
                const file = new File([this.file], this.fileName, {type: this.file.type});

                // 判断是否有upload事件
                const { upload } = options;
                const progress = [];
                // 有upload，调用之，否则直接生成临时url
                progress.push(
                    upload ?
                        upload(file, (loaded) => this.loaded = loaded)
                        :
                        Promise.resolve(window.URL.createObjectURL(file))
                );
                // 是否需要提供虚拟进度
                this.isVirtualProgress && progress.push(this.startVirtualUpload());

                // 等待请求/虚拟进度结束
                const [ url ] = await Promise.all(progress);
                this.$message['success'](`上传成功`, {
                    pos: 'topCenter',
                });
                // 开启延迟关闭
                await this.startCloseDelay();
                // 关闭窗口
                this.$emit('ok', {
                    url,
                    name: this.fileName,
                });
                this.handleCancel();
            }catch (err) {
                this.$message['error'](err, {
                    pos: 'topCenter',
                });
                this.$nextTick(() => {
                    this.reset();
                    this.clearFile();
                })
            }

        },
    }
};
