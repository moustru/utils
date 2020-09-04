/**
 * Полифилл для Function.prototype.bind
 * 
 * @param {Function} fn - привязываемая функция 
 * @param {Object} ctx - контекст выполнения привязываемой функции
 * @param {Array} args - аргументы привязываемой функции
 * 
 * @returns {Function} - функция выполнения привязываемой функции с привязанным контекстом
 * @returns {any} - результат выполнения привязываемой функции
 */
const customBind = (fn, ctx) => {
  return function(...args) {
    // Добавляем объекту контекста свойство с привязываемой функцией
    ctx.fn = fn
    const res = ctx.fn(...args)
    // После отработки функции удаляем свойство из объекта и возвращаем результат
    delete ctx.fn
    return res
  }
}


// Применение полифилла
const obj = {
  greet: 'Hello'
}

function greet(name) {
  console.log(`${this.greet}, ${name}!`)
}

const binding = customBind(greet, obj)
binding('John')