{showModal && (
    <div className="modal-overlay">
      <div className="modal-box celebration">
        <h2>🎉 ¡Ganaste! 🎉</h2>
        <p>🏆 Felicidades, {winner} es el campeón</p>
        <button className="restart-btn" onClick={resetGame}>
          Jugar de nuevo
        </button>
      </div>
    </div>
  )}
  