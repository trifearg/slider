import classNames from 'classnames';
import * as React from 'react';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

export interface DotProps {
  prefixCls: string;
  value: number;
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  dotTooltip?: React.ReactNode;
}

const Dot: React.FC<DotProps> = (props) => {
  const { prefixCls, value, style, activeStyle, dotTooltip } = props;
  const { min, max, direction, included, includedStart, includedEnd } =
    React.useContext(SliderContext);
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  const dotClassName = `${prefixCls}-dot`;
  const active = included && includedStart <= value && value <= includedEnd;

  // ============================ Offset ============================
  let mergedStyle: React.CSSProperties = {
    ...getDirectionStyle(direction, value, min, max),
    ...(typeof style === 'function' ? style(value) : style),
  };

  if (active) {
    mergedStyle = {
      ...mergedStyle,
      ...(typeof activeStyle === 'function' ? activeStyle(value) : activeStyle),
    };
  }

  if (dotTooltip) {
    return (
      <span
        className={classNames(dotClassName, { [`${dotClassName}-active`]: active })}
        style={mergedStyle}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {isTooltipVisible && dotTooltip}
      </span>
    )
  }

  return (
    <span
      className={classNames(dotClassName, { [`${dotClassName}-active`]: active })}
      style={mergedStyle}
    />
  );
};

export default Dot;
