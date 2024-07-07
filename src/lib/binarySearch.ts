// 二分查找函数
export function binarySearch(arr: number[], target: number): number {
    if (arr.length == 0) return -1;
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid; // 找到目标值，返回索引
        } else if (arr[mid] < target) {
            left = mid + 1; // 目标在右半部分
        } else {
            right = mid - 1; // 目标在左半部分
        }
    }
    if (left == right) return left;
    if (right == -1) return left;
    if (left == arr.length) return right;
    if (Math.abs(arr[left] - target) < Math.abs(arr[right] - target)) {
        return left;
    } else
        return right;
}
