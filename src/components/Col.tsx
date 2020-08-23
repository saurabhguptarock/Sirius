const Col = ({ isOver, children }) => {
  const className = isOver ? " highlight-region" : " ";

  return (
    <div
      className={`col${className}`}
      // style={{ height: isOver ? "200px" : "" }}
    >
      {children}
    </div>
  );
};

export default Col;
