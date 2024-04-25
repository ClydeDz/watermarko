export default function ColorPickerIcon(props) {
  const { fontColor } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.89914 16H4.50953L9.67431 1.03894H13.7506L18.9081 16H15.5185L11.7709 4.45777H11.654L7.89914 16ZM7.68729 10.1193H15.6938V12.5885H7.68729V10.1193Z"
        fill="black"
      />
      <rect y="18" width="24" height="5" fill={fontColor} />
    </svg>
  );
}
