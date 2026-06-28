const StatsCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6">

      <p className="text-gray-400 mb-3">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold ${color}`}
      >
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;