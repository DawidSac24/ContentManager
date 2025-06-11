function Header() {
  return (
    <div className="h-16 w-[95%] flex items-center justify-between text-center text-white">
      <img
        className="h-8 w-8"
        src="/assets/images/logo-128px.png"
        alt=" content manager logo"
      />
      <h1 className="text-xl">Content Manager</h1>
    </div>
  );
}

export default Header;
