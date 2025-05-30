
function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 shadow-md rounded border">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <form>
          <input
           type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded" 
            />
          <input 
          type="password"
           placeholder="Password" 
           className="w-full p-2 mb-3 border rounded"
            />
          <button className="w-full bg-blue-500 text-white p-2 rounded">Log In</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
