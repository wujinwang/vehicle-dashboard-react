import './index.scss';

interface SpeedGaugeProps {
  title?: string,
  data: number[];
  angle: number;
  speed?: string
}

const SpeedGauge = ({ title, data, angle, speed }: SpeedGaugeProps) => {

  console.log("----------angle-------------",angle);

  const digitalScaleElements = data.map(ds => (
    <li key={ds} className='digital-scale-item'>
      {ds}
    </li>
  ));

  const speedGaugeEleStyle = {
    '--pointer-initial-angle': `${angle}deg`
  } as React.CSSProperties;

  return (
    <div className='border-2 border-black-200 rounded-full border-black'>
      <div className='border-4 border-neutral-500 rounded-full'>
        <section className='speed-gauge rounded-full border-2 border-neutral-800' style={speedGaugeEleStyle}>
          <ul className='digital-scale text-2xs text-gray-400'>{digitalScaleElements}</ul>

          <div className='pointer-box'>
            <div className='pointer'></div>
          </div>

          <div className='gears'>
            <div className="flex flex-wrap">
              <span className="w-full text-center text-gray-200 text-sm">{speed}</span>
              <span className="w-full text-center text-gray-400 text-sm">{title}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SpeedGauge;
