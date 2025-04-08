const Square = ({ value, onClick }) => {
    return (
      <button
        className={`square ${value ? 'filled' : ''}`}
        onClick={onClick}
      >
        {value}
      </button>
    );
  };
  
  export default Square;
  