import fs from 'fs';
import path from 'path'
import archiver from 'archiver'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import pkg from '../../package.json'
import colors from 'picocolors'
import os from 'os'
const platform = os.platform()
import { autoOpenFloder } from '../constant'

// 创建一个可写流，用于写入压缩文件
const output = fs.createWriteStream('dist.zip');
const archive = archiver('zip', {
    zlib: { level: 9 } // 设置压缩级别
});
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
const parentDir = path.join(__dirnameNew, '../../')
// 监听所有数据写入完成事件
output.on('close', function () {
    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - compression complete！`);
});

// 监听错误事件
archive.on('error', function (err) {
    throw err;
});

// 将可写流与 archiver 对象关联
archive.pipe(output);

// 添加 dist 目录到压缩文件
archive.directory('app', false);

// 完成压缩操作
archive.finalize();

if (!autoOpenFloder)
    process.exit(0)


if (platform === 'win32') {
    exec(`start explorer ${parentDir}`)
} else if (platform === 'darwin') {
    exec(`open ${parentDir}`)
} 