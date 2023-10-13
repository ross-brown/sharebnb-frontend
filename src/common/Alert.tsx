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
    <div className={`alert alert-${type}`} role="alert">
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
