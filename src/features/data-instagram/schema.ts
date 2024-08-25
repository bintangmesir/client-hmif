export type InstagramChildrenType = {
  data: {
    id: string;
    media_url: string;
    media_type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
  }[];
};

export type InstagramDataType = {
  caption: string;
  children: InstagramChildrenType;
  id: string;
  media_type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
  media_url: string;
  timestamp: Date;
  username: string;
  thumbnail_url: string;
};
