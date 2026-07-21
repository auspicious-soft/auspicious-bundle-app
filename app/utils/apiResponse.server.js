export function success(data = null, message = "Success") {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return Response.json(response);
}

export function error(message, status = 400) {
  return Response.json(
    {
      success: false,
      message,
    },
    { status }
  );
}