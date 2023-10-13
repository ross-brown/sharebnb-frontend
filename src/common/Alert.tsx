/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

interface AlertProps {
  type?: string;
  errors: string[] | string;
}


function Alert({ type = "danger", errors = [] }: AlertProps) {
  console.debug("Alert", "type=", type, "errors=", errors);

  return (
    <div className="text-red-500 text-center mt-6 border border-red-500 bg-red-200 rounded py-2 w-64 mx-auto" role="alert">
      {Array.isArray(errors)
        ? errors.map((err, i) => {
          return (
            <p key={i}>{err}</p>
          );
        })
        : <p>{errors}</p>}
    </div>
  );
}

export default Alert;
