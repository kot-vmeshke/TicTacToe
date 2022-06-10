/* eslint-disable no-magic-numbers */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const reset = document.querySelector('#reset');
  let tilesCount = 9;
  const avatarsList = document.querySelector('.icons');
  const avatars = avatarsList.querySelectorAll('.avatar-icon');
  const avatarsContainers = document.querySelectorAll('.avatar-container');
  let icon;
  const announcer = document.querySelector('.announcer');
  let displayPlayer = document.querySelector('.display-player');
  let player = 'X';

  avatars.forEach(avatar => {
    avatar.setAttribute('draggable', true);
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('dragstart', (event) => {
      icon = event.target;
    })
  })
  avatarsContainers.forEach(container => {
    container.addEventListener('dragover', (event) => {
      event.preventDefault();
      if (!container.hasChildNodes()) {
        container.appendChild(icon);
      }
    })
  })

  for (let i = 0; i < tilesCount; i++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    container.appendChild(tile);
  }

  const tiles = container.querySelectorAll('.tile');
  let resultWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('tile')) {
      if (event.target.innerText === '') {
        if (player === 'X') {
          event.target.classList.add('playerX');
          event.target.innerText = 'X';
          player = 'O';
          displayPlayer.classList.add('playerO');
          displayPlayer.innerText = player;
        } else {
          event.target.classList.add('playerO');
          event.target.innerText = 'O';
          player = 'X';
          displayPlayer.classList.remove('playerO');
          displayPlayer.classList.add('playerX');
          displayPlayer.innerText = player;
        }
        for (let i = 0; i < resultWin.length; i++) {
          if (
            tiles[resultWin[i][0]].innerText === 'X'
            && tiles[resultWin[i][1]].innerText === 'X'
            && tiles[resultWin[i][2]].innerText === 'X'
          ) {
            announcer.innerHTML = `
            Player 
            <span class="display-player playerX">X</span> 
            win
            `;
            announcer.classList.remove('hide');
            container.style.pointerEvents = 'none';
          } else if (
            tiles[resultWin[i][0]].innerText === 'O'
            && tiles[resultWin[i][1]].innerText === 'O'
            && tiles[resultWin[i][2]].innerText === 'O'
          ) {
            announcer.innerHTML = `
            Player 
            <span class="display-player playerO">O</span> 
            win
            `;
            announcer.classList.remove('hide');
            container.style.pointerEvents = 'none';
          }
        }
      }
    }
  })


  reset.addEventListener('click', () => {
    tiles.forEach(tile => {
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
      tile.classList.remove('active');
      tile.innerText = '';
    })
    announcer.classList.add('hide');
    container.style.pointerEvents = '';
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      tiles[0].classList.add('active');
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].classList.contains('active') && i !== 0) {
          tiles[0].classList.remove('active');
          tiles[i - 1].classList.add('active');
          tiles[i].classList.remove('active');
          break;
        }
      }
    } else if (event.key === 'ArrowRight') {
      tiles[8].classList.add('active');
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].classList.contains('active') && i !== tiles.length - 1) {
          tiles[8].classList.remove('active');
          tiles[i + 1].classList.add('active');
          tiles[i].classList.remove('active');
          break;
        }
      }
    }
  })

  let enterEvent = new CustomEvent('enter', {
    bubbles: true,
    detail: {
      index: function (tile) {
        if (tile.classList.contains('active')) {
          if (tile.innerText === '') {
            if (player === 'X') {
              tile.classList.add('playerX');
              tile.innerText = 'X';
              player = 'O';
              displayPlayer.classList.add('playerO');
              displayPlayer.innerText = player;
            } else {
              tile.classList.add('playerO');
              tile.innerText = 'O';
              player = 'X';
              displayPlayer.classList.remove('playerO');
              displayPlayer.classList.add('playerX');
              displayPlayer.innerText = player;
            }
            for (let i = 0; i < resultWin.length; i++) {
              if (
                tiles[resultWin[i][0]].innerText === 'X'
                && tiles[resultWin[i][1]].innerText === 'X'
                && tiles[resultWin[i][2]].innerText === 'X'
              ) {
                announcer.innerHTML = `
                Player 
                <span class="display-player playerX">X</span> 
                win
                `;
                announcer.classList.remove('hide');
                tile.removeEventListener('enter', () => {
                  enterEvent.detail.index(tile);
                })
              } else if (
                tiles[resultWin[i][0]].innerText === 'O'
                && tiles[resultWin[i][1]].innerText === 'O'
                && tiles[resultWin[i][2]].innerText === 'O'
              ) {
                announcer.innerHTML = `
                Player 
                <span class="display-player playerO">O</span> 
                win
                `;
                announcer.classList.remove('hide');
                tile.removeEventListener('enter', () => {
                  enterEvent.detail.index(tile);
                })
              }
            }
          }
        }
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      tiles.forEach(tile => {
        tile.dispatchEvent(enterEvent);
        tile.addEventListener('enter', () => {
          enterEvent.detail.index(tile);
        })
      })
    }
  })
})