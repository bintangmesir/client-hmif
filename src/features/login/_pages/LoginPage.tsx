import CardAuth from "../_components/CardAuth";

const LoginPage = () => {
  const bgUrl =
    "https://images.unsplash.com/photo-1636955825879-488411f3277f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <section
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="container flex min-h-dvh flex-col items-center justify-center"
    >
      <CardAuth />
    </section>
  );
};

export default LoginPage;
