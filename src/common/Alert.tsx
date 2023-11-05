/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

interface AlertProps {
  type?: string;
  errors: string[][] | string[];
}

function formatError(err: string) {
  let formatted = err;

  if (err.slice(0,7) === "instance") {
    formatted = err.slice(9);
  }

  return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
}


function Alert({ type = "danger", errors = [] }: AlertProps) {
  console.debug("Alert", "type=", type, "errors=", errors);

  return (
    <div className="text-red-500 text-center font-semibold mt-6 border border-red-500
     bg-red-200 rounded py-2 px-2 w-96 mx-auto" role="alert">
      {Array.isArray(errors[0])
        ? errors[0].map((err, i) => {
          return (
            <div className="mb-2" key={i}>
              <p>{formatError(err)}</p>
            </div>
          );
        })
        : errors.map((err, i) => {
          return (
            <div className="mb-2" key={i}>
              <p>{formatError(err as string)}</p>
            </div>
          );
        })}


    </div>
  );
}

export default Alert;
