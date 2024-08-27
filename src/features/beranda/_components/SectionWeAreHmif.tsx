import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SectionWeAreHmif = () => {
  return (
    <section className="container flex w-full items-center justify-center">
      <div className="flex w-full items-center justify-center rounded-2xl bg-black p-4">
        <Zoom>
          <img
            src="/images/weAreHmif.jpg"
            className="h-auto w-full max-w-3xl"
          />
        </Zoom>
      </div>
    </section>
  );
};

export default SectionWeAreHmif;
