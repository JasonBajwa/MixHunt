import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SongDetails from './components/SongDetails';

//BIG NOTE: SPOTFIY IS VERY PICKY AND WANTS REQUESTS AND STUFF TO BE VERY SPECIFIC FORMAT

const CLIENT_ID = "";
const CLIENT_SECRET = "";

function getRandomSearchQuery() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
  return randomCharacter;
}


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [song, setSong] = useState("");

  const randomOffset = Math.floor(Math.random() * 1000);


  //The intializing of the API
  useEffect(() => {
    //API ACCESS TOKEN
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .then(data => console.log(data))
  }, [])

  async function generateSong() {
    console.log("generate button was pressed") //Search input should be the song

    //STEP 1: GET REQUEST USING SEARACH TO GET THE ARTIST ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var input = getRandomSearchQuery();
    console.log(randomOffset);

    var songID = await fetch('https://api.spotify.com/v1/search?q=' + input + '&type=track&offset=' + randomOffset, searchParameters)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => { return data.tracks.items[0].id })
    // .then(data => console.log(data))

    console.log("The songID for " + input + " is " + songID);


    var returnedSong = await fetch('https://api.spotify.com/v1/tracks/' + songID + '?&market=US', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSong(data);
      });

  }

  return (
    <div className="App">
      <Container className='container'>
        <InputGroup className='inputs'>

          <div className='generate-button'>
            <Button onClick={generateSong}>
              Generate
            </Button>
          </div>

        </InputGroup>
      </Container>
      <Container>

        <div className='container-content'>
          <Row className='song-block'>
            {song && (
              <div className="container-wrapper">
                <Card>
                  <div className="album-cover-container">
                    <Card.Img src={song.album.images[0].url} className='album-cover' />
                  </div>
                  <Card.Body>
                    <div className="song-title-container">
                      <Card.Title className="song-title">{song.name}</Card.Title>
                    </div>
                  </Card.Body>
                </Card>
              </div>

            )}

            <SongDetails song={song} />
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default App;



