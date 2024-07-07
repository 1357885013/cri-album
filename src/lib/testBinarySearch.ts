// 测试函数
import {binarySearch} from "@/lib/binarySearch";

export function testBinarySearch() {
    // 测试用例1: 正常情况，目标值在数组中
    const arr1 = [1, 2, 3, 4, 5];
    const target1 = 3.1;
    const expected1 = 2; // 目标值 3 在数组 arr1 中的索引应为 2
    const result1 = binarySearch(arr1, target1);
    console.log(`Test Case 1: ${result1 === expected1 ? 'Passed' : 'Failed'}`);

    // 测试用例2: 正常情况，目标值不在数组中
    const arr2 = [1, 2, 3, 4, 5];
    const target2 = 6;
    const expected2 = 4; // 目标值 6 不在数组 arr2 中，期望返回 -1
    const result2 = binarySearch(arr2, target2);
    console.log(`Test Case 2: ${result2 === expected2 ? 'Passed' : 'Failed'}`);

    // 测试用例3: 空数组
    const arr3: number[] = [];
    const target3 = 5;
    const expected3 = -1; // 空数组中没有目标值，期望返回 -1
    const result3 = binarySearch(arr3, target3);
    console.log(`Test Case 3: ${result3 === expected3 ? 'Passed' : 'Failed'}`);

    // 测试用例4: 数组中只有一个元素，且为目标值
    const arr4 = [3];
    const target4 = 3;
    const expected4 = 0; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result4 = binarySearch(arr4, target4);
    console.log(`Test Case 4: ${result4 === expected4 ? 'Passed' : 'Failed'}`);

    // 测试用例5: 空数组
    const arr5: number[] = [1.1, 2.1, 3, 4, 7, 8.2, 9.3];
    const target5 = 8.1;
    const expected5 = 5; // 空数组中没有目标值，期望返回 -1
    const result5 = binarySearch(arr5, target5);
    console.log(`Test Case 5: ${result5 === expected5 ? 'Passed' : 'Failed'}`);

    // 测试用例6: 数组中只有一个元素，且为目标值
    const arr6: number[] = [1.1, 2.1, 3, 4, 7, 8.2, 9.3];
    const target6 = 1;
    const expected6 = 0; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result6 = binarySearch(arr6, target6);
    console.log(`Test Case 6: ${result6 === expected6 ? 'Passed' : 'Failed'}`);

    // 测试用例7: 数组中只有一个元素，且为目标值
    const arr7: number[] = [1.1];
    const target7 = 1;
    const expected7 = 0; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result7 = binarySearch(arr7, target7);
    console.log(`Test Case 7: ${result7 === expected7 ? 'Passed' : 'Failed'}`);

    // 测试用例8: 数组中只有一个元素，且为目标值
    const arr8: number[] = [1.1, 8.2];
    const target8 = 0;
    const expected8 = 0; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result8 = binarySearch(arr8, target8);
    console.log(`Test Case 8: ${result8 === expected8 ? 'Passed' : 'Failed'}`);

    // 测试用例9: 数组中只有一个元素，且为目标值
    const arr9: number[] = [1.1, 8.2];
    const target9 = 1.1;
    const expected9 = 0; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result9 = binarySearch(arr9, target9);
    console.log(`Test Case 9: ${result9 === expected9 ? 'Passed' : 'Failed'}`);

    // 测试用例10
    const arr10: number[] = [1.1, 8.2];
    const target10 = 8.1;
    const expected10 = 1; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result10 = binarySearch(arr10, target10);
    console.log(`Test Case 10: ${result10 === expected10 ? 'Passed' : 'Failed'}`);

    // 测试用例11
    const arr11: number[] = [1.1, 8.2];
    const target11 = 8.3;
    const expected11 = 1; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result11 = binarySearch(arr11, target11);
    console.log(`Test Case 11: ${result11 === expected11 ? 'Passed' : 'Failed'}`);

    // 测试用例12
    const arr12: number[] = [1.1, 8.2];
    const target12 = 9;
    const expected12 = 1; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result12 = binarySearch(arr12, target12);
    console.log(`Test Case 12: ${result12 === expected12 ? 'Passed' : 'Failed'}`);

    // 测试用例13
    const arr13: number[] = [1.1, 8.2];
    const target13 = 8.2;
    const expected13 = 1; // 数组中唯一的元素是目标值 3，期望返回索引 0
    const result13 = binarySearch(arr13, target13);
    console.log(`Test Case 13: ${result13 === expected13 ? 'Passed' : 'Failed'}`);

}