

interface InputProps {
  type: string;
  placeholder: string;
}

const Input = (props: InputProps) => {
  const { type, placeholder } = props;

  return (
    <input className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
      {type}
      {placeholder}
    </input>
  );
};

export default Input;
