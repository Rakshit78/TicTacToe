import React, { useState } from 'react';
import './Tic.css';

function Tic() {
  const [turn, setturn] = useState('x');
  const [grid, setgrid] = useState(Array(9).fill(''));
  const [winner, setwinner] = useState();
  // check winner
  const checkforWinner = (squsres) => {
    const combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonals: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((element) => {
        if (
          squsres[element[0]] === '' ||
          squsres[element[1]] === '' ||
          squsres[element[2]] === ''
        ) {
          //do nothing
        } else if (
          squsres[element[0]] === squsres[element[1]] &&
          squsres[element[1]] === squsres[element[2]]
        ) {
          setwinner(squsres[element[0]]);
        }
      });
    }
  };

  const Grid = ({ num }) => {
    return <td onClick={() => handleclick(num)}>{grid[num]}</td>;
  };

  const handleclick = (num) => {
    if (grid[num] !== '') {
      alert('Pick Another');
      return;
    }
    let squsres = [...grid];
    //alert(num);
    if (turn === 'x') {
      squsres[num] = 'x';
      setturn('o');
    } else {
      squsres[num] = 'o';
      setturn('x');
    }
    checkforWinner(squsres);
    setgrid(squsres);
    //console.log(squsres);
  };
  const resetgame = () => {
    setwinner(null);
    setgrid(Array(9).fill(''));
  };
  return (
    <div className='container'>
      <table>
        <h1>{winner ? winner + ' is Winner!' : 'Turn: ' + turn}</h1>
        <button onClick={() => resetgame()}>Restart game</button>
        <tr>
          <Grid num={0} />
          <Grid num={1} />
          <Grid num={2} />
        </tr>
        <tr>
          <Grid num={3} />
          <Grid num={4} />
          <Grid num={5} />
        </tr>
        <tr>
          <Grid num={6} />
          <Grid num={7} />
          <Grid num={8} />
        </tr>
      </table>
      {winner && (
        <div>
          {/*<h1>{winner} is Winner!</h1>*/}
          {/*<button onClick={() => resetgame()}>Restart game</button>*/}
        </div>
      )}
    </div>
  );
}

export default Tic;
