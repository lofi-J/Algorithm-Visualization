import useSound from "use-sound";
import clickSound from "../assets/audio/click.mp3";

const useClickSound = () => {
  const [click] = useSound(clickSound, {volume: .5})
  return [click];
}

export default useClickSound;