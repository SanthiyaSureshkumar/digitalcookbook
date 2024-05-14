const Footer = () => {
  return (
    <footer className="py-8 flex flex-col gap-3 items-center  opacity-75">
      <h2 className="text-2xl font-bold italic" style={{ color: "black" }}>
        Digital<span className="text-orange-900">CookBook</span>
      </h2>
      <p style={{ color: "black" }}>
        &copy; {new Date().getFullYear()} DigitalCookBook. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
