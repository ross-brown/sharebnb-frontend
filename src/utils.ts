

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


export { getErrorMsg };
