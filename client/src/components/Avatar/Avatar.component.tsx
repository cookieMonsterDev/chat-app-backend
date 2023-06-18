import { useState } from "react";
import { AvatarProps } from "./Avatar.types";
import cn from "classnames";

export const AvatarComponent: React.FC<AvatarProps> = ({
  name = "User",
  imgUrl = null,
  className,
  style,
  bgColor = 'bg-sky-500'
}) => {
  const [image, setImage] = useState(true);

  const contClass = cn(
    "w-14 h-14 rounded-full relative flex justify-center items-center",
    bgColor,
    className
  );

  return (
    <div className={contClass} style={style}>
      {(!imgUrl || !image) && name && (
        <p className="text-center font-semibold text-3xl text-white">
          {name.slice(0, 1).toLocaleUpperCase()}
        </p>
      )}
      {imgUrl && image && (
        <img src={imgUrl} alt={name} onError={() => setImage(false)} />
      )}
    </div>
  );
};
