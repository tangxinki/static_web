/**
 * @description 超过1万为1.x万
 * @param {any} num:number
 * @returns {any}
 */
export function thousandWord(num: number) {
    if (!num) return 0
    return num < 10000 ? num : (num / 10000).toFixed(1) + '万'
}


/**
 * @description 计算年龄
 */
export function calculateAge(birthDate: string) {
    if (!birthDate) return ''
    const birthYear = parseInt(birthDate.split('-')[0]);
    const birthMonth = parseInt(birthDate.split('-')[1]) - 1; // 月份从 0 开始计数
    const birthDay = 1; // 假设出生日为每个月的第一天
    const dateOfBirth = new Date(birthYear, birthMonth, birthDay);

    // 计算年龄并返回
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // 平均年长
    const age = Math.floor((Date.now() - dateOfBirth.getTime()) / msPerYear);
    return age
}

/**
 * @description 数字转中文数字
 */
export const utilToChinesNum = (num: number) => {
    let changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]; //changeNum[0] = "零"
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = (temp: any) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (var i = 0; i < strArr.length; i++) {
            newNum =
                (i === 0 && strArr[i] === 0
                    ? ""
                    : i > 0 && strArr[i] === 0 && strArr[i - 1] === 0
                        ? ""
                        : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i])) + newNum;
        }
        return newNum;
    };
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000 + ''
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
};

/**
 * @description 中文数字转数字
 * @param {any} capitalNum
 */
export const utilToNum = (capitalNum: string) => {
    const changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const unit = ["", "十", "百", "千", "万"];
    if (capitalNum.length === 1) return changeNum.findIndex((i) => i === capitalNum);
    const numArr = capitalNum.split("");
    let total = 0;
    for (let i = 0; i < numArr.length; i += 2) {
        const number = numArr.slice(i, i + 2);
        if (number.length === 1) {
            const num = changeNum.findIndex((i) => i === number[0]);
            total += num;
        } else {
            const [num, unitStr] = number;
            const intNum = changeNum.findIndex((i) => i === num);
            const unitNum = unit.findIndex((i) => i === unitStr);
            total += Math.pow(10, unitNum) * intNum;
        }
    }
    return total
};