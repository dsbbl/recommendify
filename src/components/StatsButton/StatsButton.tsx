import './StatsButton.scss';

export default function StatsButton({onClick}: { onClick: () => void }) {
  return (
    <div className="stats-button-wrapper">
      <button className="stats-float-button" onClick={onClick}>
        See some cool stats 📊
      </button>
      <div className="green-rays">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`ray ray-${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
