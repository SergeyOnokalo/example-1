
let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')
let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

let colors = ['	#8B0000', '	#90EE90', '#8B008B', '#008B8B', '#00008B', '#A9A9A9', '#7D26CD', '#B452CD', '#FF3E96', '	#00EEEE', '	#0000EE', '#FFE4E1', '#A020F0', '	#EE82EE', '	#B03060', '	#FF0000', '#FF4500', '#FFA500', '#FFD700']

function startGame(){
  $start.classList.add('hide')
  $game.style.backgroundColor = '#f6f6f6'
  $gameTime.setAttribute('disabled', 'true')
  isGameStarted = true
  setGameTime()
  score = 0

  let interval = setInterval(function(){
    let time = parseFloat($time.textContent)
    if( time <= 0){
      clearInterval(interval)
      endGame()
    } else{
      $time.textContent = (time - 0.1).toFixed(1)
    } 
  }, 100)

  randerBox()
}

function setGameTime(){
  $timeHeader.classList.remove('hide')
  $resultHeader.classList.add('hide')
  let gameTime = +$gameTime.value
  $time.textContent = gameTime.toFixed(1)
}



function randerBox(){
  $game.innerHTML = ''
  
  let box = document.createElement('div')
  let boxSize = getRandom(5, 16)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize
  let randomColor = colors[getRandom(0,  colors.length)]

  box.style.width = box.style.height = boxSize+'px'
  box.style.position = 'absolute'
  box.style.top = getRandom(0,  maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.backgroundColor = randomColor
  box.style.boxShadow = `0 0 2px ${randomColor}, 0 0 6px ${randomColor}, 0 0 12px ${randomColor}`
  box.style.borderRadius = '100%'
  box.style.cursor = 'crosshair'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
}

function handleBoxClick(event){
  if(!isGameStarted){
    return
  }

  if(event.target.dataset.box){
    score++
    let time = parseFloat($time.textContent)
    $time.textContent = (time + 1.2).toFixed(1)
    randerBox()
  } else{
    let time = parseFloat($time.textContent)
    $time.textContent = (time - 2).toFixed(1)
  }
}

function result(){
  $result.textContent = score.toString()
}

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min)
}

function endGame(){
  isGameStarted = false
  result()
  $gameTime.removeAttribute('disabled')
  $start.classList.remove('hide')
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  $timeHeader.classList.add('hide')
  $resultHeader.classList.remove('hide')
}


