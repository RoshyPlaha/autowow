import NavigationLink from "../page-animation/transition-link";

const DemoButton = () => {
  return (
    <div className="w-full bg-white text-center align-center justify-center items-center px-4 md:px-8 lg:px-8 py-8 md:py-8">
      <NavigationLink
        href={`/vortex`}
        className="px-6 py-3 text-left text-white bg-green-900 transition-colors inline-block"
      >
        See a Demo Here
      </NavigationLink>
    </div>
  );
};

export default DemoButton;
