// function get_moves(piece, color, x, y){
//   dir = color === 1 ? 1 : -1
//   switch(piece){
//     case 'pawn':
//       return [[x-1,y],[x+1,y],[x-1,y+dir][x-1,y-dir]]
//     case 'rook':
//       xvals = []
//   }
// }

function setUpBoard(pieces){
  board = []
  for(var i=0; i< pieces.length; i++){
    p = pieces[i]
    board[p.x] = board[p.x] || []
    board[p.x][p.y] = [p.piece, p.owner]
  }
  return board
}

function isCheck(pieces){
  board = setUpBoard(pieces)
  checks = []
  for(var j=0; j<board.length; j++){
    for(var k=0; k<board[j].length; k++){
      checks.concat(will_hit_king(board[j][k], board))
    }
  }
  return checks
}

function will_hit_king(piece, board){
  switch(piece){
    case 'pawn':
      check_pawn(piece,board)
      break;
    case 'rook':
      break;
    case 'knight':
       break;
  }
}

function move_diagonal(piece,board,dist,dir){
  for()
}
function move_diagonal(piece,board,dist,dir)
function move_vertical(piece,board,dist,dir)
function move_horizontal(piece,board,dist,dir)
function move_knight(piece,board,dist,dir)





console.log(setUpBoard([
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "pawn", owner: 1, x: 5, y: 6}
]))