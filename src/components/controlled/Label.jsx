function Label({ name, className, required }) {
  className = "sm:text-right " + className;
  return (
    <div className="md:text-left my-2 text-sm">
      {required ? (
        <span className="text-red-500 font-semibold mt-2 mr-1">*</span>
      ) : (
        ""
      )}
      <label className={className}>{name}</label>
    </div>
  );
}

export default Label;
