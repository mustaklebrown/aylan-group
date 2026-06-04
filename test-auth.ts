async function test() {
  const res = await fetch("http://localhost:3000/api/auth/sign-in/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
    }),
  });
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Body:", text);
}
test();
