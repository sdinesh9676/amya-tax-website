
export default function Skeleton() {
  return (
    <div className="services-grid">
      {[1, 2, 3].map((item) => (
        <div className="service-skeleton" key={item}>
          <div className="skeleton-shape" />
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}
