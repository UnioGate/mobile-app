import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";



const UserIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        {...props}
    >
        <Path
            d="M0.75 14.75C0.75 13.6891 1.17143 12.6717 1.92157 11.9216C2.67172 11.1714 3.68913 10.75 4.75 10.75H12.75C13.8109 10.75 14.8283 11.1714 15.5784 11.9216C16.3286 12.6717 16.75 13.6891 16.75 14.75C16.75 15.2804 16.5393 15.7891 16.1642 16.1642C15.7891 16.5393 15.2804 16.75 14.75 16.75H2.75C2.21957 16.75 1.71086 16.5393 1.33579 16.1642C0.960714 15.7891 0.75 15.2804 0.75 14.75Z"
            stroke="white"
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <Path
            d="M8.75 6.75C10.4069 6.75 11.75 5.40685 11.75 3.75C11.75 2.09315 10.4069 0.75 8.75 0.75C7.09315 0.75 5.75 2.09315 5.75 3.75C5.75 5.40685 7.09315 6.75 8.75 6.75Z"
            stroke="white"
            strokeWidth={1.5}
        />
    </Svg>
);
export default UserIcon;
