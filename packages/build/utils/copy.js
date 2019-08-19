const fs = require( 'fs' ), stat = fs.stat;
const path = require('path');

const copyOfFolder = (src, dst) => {
    // 读取目录中的所有文件/目录
    fs.readdir(src, (err, paths ) => {
        if(err) throw err;

        paths.forEach(path => {
            const _src = src + '/' + path,
                _dst = dst + '/' + path;
            let readable, writable;

            stat(_src, (err, st) => {
                if(err) throw err;
                 // 判断是否为文件
                if(st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream( _src );

                    // 创建写入流
                    writable = fs.createWriteStream( _dst );

                    // 通过管道来传输流
                    readable.pipe( writable );
                } else if(st.isDirectory()) {
                    // 如果是目录则递归调用自身
                    exists( _src, _dst, copyOfFolder );
                }
            });
        });
    });

};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
const exists = (src, dst, callback) => {
    fs.exists(dst, (exists) => {
        if( exists ){
            // 已存在
            callback( src, dst );
        }else{
            // 不存在
            fs.mkdir(dst, () => {
                callback( src, dst );
            });
        }
    });
};
const copyFile = (source, target) => {
    fs.writeFileSync(target, fs.readFileSync(source));
}
// 复制目录
exists( path.join(__dirname, '..', '..', 'lib'), path.join(__dirname, '..', '..', 'dist'), copyOfFolder );
// 复制README
copyFile(path.join(__dirname, '..', '..', 'README.md'), path.join(__dirname, '..', '..', 'dist/README.md'));

