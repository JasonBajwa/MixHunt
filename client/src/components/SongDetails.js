import './SongDetails.css';

function SongDetails(props) {
    const { song } = props;

    const durationInMs = song.duration_ms;
    const durationInSeconds = Math.floor(durationInMs / 1000);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;



    return (
        <div className='top'>
            <div>
                {song && (
                    <div className='details'>
                        <h2 className='title'>Song Details</h2>
                        {/* <img src={song.album.images[0].url} alt="Album Cover" /> */}
                        {/* <h3>{song.name}</h3> */}
                        <p>Artist: {song.artists[0].name}</p>
                        <p>Album: {song.album.name}</p>
                        <p>Duration: {minutes}:{seconds.toString().padStart(2, '0')}</p>
                        <p>Release Date: {song.album.release_date}</p>
                    </div>
                )}
            </div>


        </div>
    )
}

export default SongDetails;
