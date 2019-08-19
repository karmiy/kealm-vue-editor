const fs = require('fs');
const path = require('path');
const _path= path.join(__dirname, '..', '..', 'dist');

const deleteFolder = (path) => {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
const createFolder = (path) => {
    fs.mkdir(path, function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('创建目录成功');
    })
}

deleteFolder(_path);
createFolder(_path);
