/**
 * Принцип мемоизации на основе класса и хэш-таблиц состояния
 * 
 * @typedef {Object} MemoData
 */

class Memo {
  /** @type {Map} - состояние класса (память) */
  store = {}
  /** @type {MemoData} - текущие данные, обрабатываемые классом */
  currentData = {}

  /**
   * Добавление результата в объект памяти
   * 
   * @this {Memo}
   */
  _add() {
    const { fn, arg } = this.currentData
    const res = fn(arg)
    
    this.store[fn.name] = new Map()
    this.store[fn.name].set(arg, res)
  }

  /**
   * Возврат результата, если функция вызывается с аргументом, который уже добавлен в хэш-таблицу памяти
   * 
   * @this {Memo}
   * @returns {Number} - результат функции из памяти
   */
  _return() {
    const { fn, arg } = this.currentData
    return this.store[fn.name].get(arg)
  }

  /**
   * Основная функция мемоизации, где идет проверка по ключу хэш-таблицы и исполняется соответствующий метод
   * 
   * @param {Function} fn - исполняемая функция 
   * @param {Number} arg - аргумент функции
   * @this {Memo}
   * @returns {Function} - метод Memo
   */
  memoize(fn, arg) {
    this.currentData = { fn, arg }

    return this.store[fn.name]?.has(arg) ?
      this._return() :
      this._add()
  }

  /**
   * Проверка скорости выполнения метода memoize
   * 
   * @param {Function} fn - исполняемая функция 
   * @param {Number} arg - аргумент функции
   * @this {Memo}
   */
  checkMemoizeTime(fn, arg) {
    let time = performance.now()
    this.memoize(fn, arg)
    console.log(performance.now() - time)
  }

  /**
   * Очистка памяти
   * 
   * @this {Memo}
   */
  clearStore() {
    this.store = {}
  }
}

// Применение решения
const factorial = int => int ? int * factorial(int - 1) : 1

const memo = new Memo()

memo.checkMemoizeTime(factorial, 10000) // от 0.91 до 2.04
memo.checkMemoizeTime(factorial, 10000) // от 0.01 до 0.05