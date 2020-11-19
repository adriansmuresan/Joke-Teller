const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
            key: 'babaf64c3293415da2ef4db14d5bb7db',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
  // console.log('tell me: ', joke);
}

//  Get Jokes from Joke API (https://sv443.net/jokeapi/v2/)

async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text to speech
    tellMe(joke);

    // Disable button
    toggleButton();
  } catch (error) {
    // Catch errors
    console.log('whoops', error);
  }
}

//  Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
