/**
 * Сортировка пузырьком по возрастанию. Сложность алгоритма - O(n^2)
 * 
 * @param {Array<number>} array - входной массив чисел
 * @returns {Array<number>} отсортированный массив
 */
const bubbleSort = array => {
  let arr = array

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [ arr[j], arr[j + 1] ] = [ arr[j + 1], arr[j] ]
      }
    }
  }

  return arr
}

const list = [ 2, 6, 1, 54, 99, 94, 72, 76, 7, 4 ]

console.log(bubbleSort(list))