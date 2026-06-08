import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";



const EyeClosed = (props: SvgProps) => (
    <Svg
        width={20}
        height={11}
        viewBox="0 0 20 11"
        fill="none"
        {...props}
    >
        <Path
            d="M17.2502 8.75L14.7752 5.354M9.75024 10.25V6.75M2.25024 8.75L4.71924 5.362M0.750244 0.75C4.35024 8.75 15.1502 8.75 18.7502 0.75"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default EyeClosed;
