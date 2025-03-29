export function Input({placeholder, ref, type }: { placeholder: string; ref?: any; type: string}) {
    return (
      <div>
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          className="px-4 py-2 border rounded-md m-2"
         
        />
      </div>
    );
  }