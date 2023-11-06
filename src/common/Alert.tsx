import { formatError } from "../utils";

const colors = {
  danger: "red",
  success: "green"
};


interface AlertProps {
  type?: keyof typeof colors;
  messages: string[][] | string[];
}
/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function Alert({ type = "danger", messages = [] }: AlertProps) {
  console.debug("Alert", "type=", type, "messages=", messages);
  const color = colors[type];

  return (
    <div className={`text-${color}-500 text-center font-semibold text-lg mt-6 border border-${color}-500
     bg-${color}-200 rounded pt-2 px-2 w-80 mx-auto`} role="alert">
      {Array.isArray(messages[0])
        ? messages[0].map((err, i) => {
          return (
            <div className="mb-2" key={i}>
              <p>{formatError(err)}</p>
            </div>
          );
        })
        : messages.map((err, i) => {
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
