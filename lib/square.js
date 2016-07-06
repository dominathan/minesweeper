module.exports = function Square (mine) {
  this.hidden = true
  this.mineCount = 0
  this.mine = mine
  this.marked = false
  this.col = null
  this.row = null
}
