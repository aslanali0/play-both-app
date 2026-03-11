import type { Album } from "../types/content.ts";
import SongCard from "./SongCard.tsx";

const AlbumCard = ({
  albumData,
  favList,
}: {
  albumData: Album;
  favList: any;
}) => {
  return (
    <div>
      {albumData && (
        <div>
          <h1>{albumData.album_title}</h1>
          <ul>
            {albumData.map((song) => (
              <SongCard
                key={
                  song?.youtube_url ||
                  `https://www.youtube.com/results?search_query=${song?.title}`
                }
                favList={favList}
                songData
                {...song}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
