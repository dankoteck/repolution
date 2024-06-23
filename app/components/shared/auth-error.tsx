export default function AuthError({ error }: { error: Error }) {
  return (
    <div>
      Something went wrong while trying to get the session. Error -{" "}
      {error.message}
    </div>
  );
}
