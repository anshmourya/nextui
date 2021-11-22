import React, { useMemo } from 'react';
import { useTheme, NextUIThemes } from '@nextui-org/react';
import withDefaults from '@utils/with-defaults';

interface Props {
  plain?: number | boolean;
  width?: number;
  height?: number;
  radius?: number | string;
}

const defaultProps = {
  plain: false,
  height: 30,
  radius: '10px'
};

export type ExampleBlockProps = Props & typeof defaultProps;

const getBackground = (theme: NextUIThemes, plain: number | boolean) => {
  if (typeof plain !== 'number') return theme.palette.primary;
  const colors = [
    theme.palette.accents_1,
    theme.palette.accents_2,
    theme.palette.accents_3,
    theme.palette.accents_4,
    theme.palette.accents_5,
    theme.palette.accents_6
  ];
  return colors[plain - 1] || theme.palette.primary;
};

const ExampleBlock: React.FC<React.PropsWithChildren<ExampleBlockProps>> = ({
  children,
  plain,
  width,
  height,
  radius,
  ...props
}) => {
  const theme = useTheme();
  const blockWidth = useMemo(() => {
    return width ? `${width}px` : '100%';
  }, [width]);
  const bg = useMemo(() => getBackground(theme, plain), [theme, plain]);

  return (
    <div className="block" {...props}>
      {children}
      <style jsx>{`
        .block {
          min-width: ${blockWidth};
          min-height: ${height}px;
          background: ${bg};
          border-radius: ${radius};
          font-size: 0.75rem;
          padding: ${theme.spacing.sm};
          color: ${theme.palette.background};
        }
      `}</style>
    </div>
  );
};

const ExampleBlockMemo = React.memo(ExampleBlock);

export default withDefaults(ExampleBlockMemo, defaultProps);
