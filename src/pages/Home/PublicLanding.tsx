import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Artist from "../../components/cards/Artist/Artist";
import Loader from "../../components/layouts/Loader";

// Spotify's Web API has no "global top artists" endpoint you can call
// without a real user's listening history, so this is a hand-picked,
// genre-spread list instead - just something worth clicking on.
const SUGGESTED_ARTIST_IDS = [
  "2AbQwU2cuEGfD465wCXlg2", // Rawayana
  "4q3ewBCX7sLwd24euuV69X", // Bad Bunny
  "06HL4z0CvFAxyc27GXpf02", // Taylor Swift
  "1Xyo4u8uXC1ZmMpatF05PJ", // The Weeknd
  "6M2wZ9GZgrQXHCFfjv46we", // Dua Lipa
  "1vyhD5VmyZ7KMfW5gqLgo5", // J Balvin
  "790FomKkXshlbRYZFtlgla", // Karol G
  "6qqNVTkY8uBg9cP3Jd7DAH", // Billie Eilish
  "2YZyLoL8N0Wb9xBt1NhZWg", // Kendrick Lamar
  "7ltDVBr6mKbRvohxheJ9h1", // Rosalía
];

const PublicLanding = (): ReactElement => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const responses = await Promise.all(
          SUGGESTED_ARTIST_IDS.map((id) => api.getArtistInfo(id)),
        );
        setArtists(responses.map((response) => response.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSuggestions();
  }, []);

  return (
    <div className="w-full h-full px-6 md:px-12 pt-16">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-3 md:text-4xl">Explore Spotify</h1>
        <p className="text-gray mb-6">
          Search for any artist, album, or playlist - no login needed.
        </p>
        <button
          className="button button--primary"
          onClick={() => navigate("/search")}
        >
          <i className="fa fa-search mr-2" aria-hidden="true" />
          Start searching
        </button>
      </div>

      <h2 className="text-xl font-bold mt-14 mb-6 md:text-2xl">
        Popular artists
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-start flex-wrap gap-y-5 gap-x-7">
          {artists.map((artist) => (
            <Artist artist={artist} key={artist.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicLanding;
