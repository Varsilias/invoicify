const StatusButton = ({ text }: { text: string }) => {
  return (
    <button
      className={`${
        text === "paid"
          ? "text-[#33D69F] bg-[#33D69F] bg-opacity-[0.06]"
          : text === "pending"
          ? "text-[#FF8F00] bg-[#FF8F00] bg-opacity-[0.06]"
          : "text-[#373B53] dark:text-white bg-[#373B53] bg-opacity-[0.1]"
      } capitalize text-sm-variant rounded-md px-4 py-3 w-[104px]`}
    >
      {text}
    </button>
  );
};

export default StatusButton;
