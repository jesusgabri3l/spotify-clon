const ErrorAlert = ({
  message = "Looks like something went wrong, please try reloading the page",
}: {
  message?: string;
}) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative h-full"
      role="alert"
    >
      <strong className="font-bold">Holy smokes!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorAlert;
