
import Svg, { Path, SvgProps } from "react-native-svg";



const DoubleArrow = (props: SvgProps) => (
    <Svg
        width={21}
        height={22}
        viewBox="0 0 21 22"
        fill="none"

        {...props}
    >
        <Path
            d="M0.414307 5.70703H18.4143M14.4143 0.707031L19.4143 5.70703L14.4143 10.707M20.4143 15.707H2.41431M6.41431 10.707L1.41431 15.707L6.41431 20.707"
            stroke="#1E1E1E"
            strokeWidth={2}
        />
    </Svg>
);
export default DoubleArrow;
