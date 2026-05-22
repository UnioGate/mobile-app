
import Svg, { Path, SvgProps } from "react-native-svg";



const CalendarIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"

        {...props}
    >
        <Path
            d="M13 1V4.55556M5 1V4.55556M1 8.11111H17M8 11.6667H9V14.3333M1 4.55556C1 4.08406 1.21071 3.63187 1.58579 3.29848C1.96086 2.96508 2.46957 2.77778 3 2.77778H15C15.5304 2.77778 16.0391 2.96508 16.4142 3.29848C16.7893 3.63187 17 4.08406 17 4.55556V15.2222C17 15.6937 16.7893 16.1459 16.4142 16.4793C16.0391 16.8127 15.5304 17 15 17H3C2.46957 17 1.96086 16.8127 1.58579 16.4793C1.21071 16.1459 1 15.6937 1 15.2222V4.55556Z"
            stroke="#253E86"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default CalendarIcon;
