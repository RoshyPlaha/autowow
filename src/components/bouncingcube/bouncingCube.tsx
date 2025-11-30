import Image from "next/image";
import styles from "./BouncingCube.module.css";

export default function BouncingCube() {
  return (
    <div className={styles.container}>
      <div className={styles.cubeWrapper}>
        <Image
          src="/assets/background/yellowcube.png"
          alt="Glowing cube"
          className={styles.cube}
          width={1200}
          height={675}
          priority
        />
      </div>
    </div>
  );
}
