import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Square from './Square';
import calculateWinner from '../utils/winnerCheck';
import './Board.css';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner) {
      setShowModal(true);
      triggerConfetti();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn('No se pudo reproducir el audio:', err);
        });
      }
    }
  }, [winner]);

  const triggerConfetti = () => {
    const myCanvas = confettiCanvasRef.current;
    if (!myCanvas) return;

    const confettiInstance = confetti.create(myCanvas, { resize: true });
    confettiInstance({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const next = [...squares];
    next[index] = xIsNext ? 'O' : 'X';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowModal(false);
  };

  return (
    <div className="board-container">
      <h1 className="title">🎮 Triki</h1>

      <div className="board-grid">
        {squares.map((val, idx) => (
          <Square key={idx} value={val} onClick={() => handleClick(idx)} />
        ))}
      </div>

      <div className="status">
        {winner
          ? `🎉 Ganador: ${winner}`
          : squares.includes(null)
          ? `Turno: ${xIsNext ? 'O' : 'X'}`
          : '🤝 ¡Empate!'}
      </div>

      <button onClick={resetGame} className="restart-btn">
        REINICIAR JUEGO
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="golden-text">¡GANASTE! 🏆</h2>
            <p>GANADOR: <strong>{winner}</strong></p>
            <button className="restart-btn" onClick={resetGame}>
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}

      {/* Canvas para confeti encima de todo */}
      <canvas
        ref={confettiCanvasRef}
        id="confetti-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      ></canvas>

      {/* Audio de victoria */}
      <audio ref={audioRef} src="/sound/sound.mp3" preload="auto" />
    </div>
  );
};

export default Board;
