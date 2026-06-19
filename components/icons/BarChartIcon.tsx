import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";


const BarChartIcon = (props: SvgProps) => (
    <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        {...props}
    >
        <Path
            d="M12 16V9H16V16H12ZM6 16V0H10V16H6ZM0 16V5H4V16H0Z"
            fill="#253E86"
        />
    </Svg>
);
export default BarChartIcon;
