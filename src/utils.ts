
function getErrorMsg(err: unknown): string[] {
  if (err instanceof Error) {
    return [err.message];
  } else if (typeof err === "string") {
    return [err];
  } else if (Array.isArray(err)) {
    return err.map(e => e.message);
  } else {
    return [String(err)];
  }
}

function formatError(err: string) {
  let formatted = err;

  if (err.slice(0,8) === "instance") {
    formatted = err.slice(9);
  }

  return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
}

export { getErrorMsg, formatError };
