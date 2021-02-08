//Api Link
//https://api.lyrics.ovh/suggest/:searchText
//https://api.lyrics.ovh/v1/:artist/:title

/* Lode data In Api */
const searchSongs = async () => {
    const searchText = document.getElementById('input').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError('Sorry! Something Wrong');
    }

    /* const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data); 
    */

    /* fetch(url)
        .then((response) => response.json())
        .then((data) => displaySongs(data.data)); 
    */
};

/* Preview Title,Artist-Name And Audio Player  */
const displaySongs = (songs) => {
    const songContainer = document.getElementById('songConatainer');
    songContainer.innerHTML = '';
    songs.forEach((song) => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">
                Album by <span>${song.artist.name}</span>
            </p>
            <audio controls>
            
                <source src="${song.preview}" type="audio/mpeg">
           
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    });
};

//Preview lyrics section
const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLayrics(data.lyrics);
    } catch (error) {
        displayError('Sorry! Something Wrong');
    }
    /*  const res = await fetch(url);
        const data = await res.json();
        displayLayrics(data.lyrics); 
    */

    /* fetch(url)
        .then((response) => response.json())
        .then((data) => displayLayrics(data.lyrics)); 
        .catch(error=> displayError(something Wrong...!))
    */
};

const displayLayrics = (layric) => {
    const layrics = document.getElementById('lyricsDiv');
    layrics.innerText = layric;
};

// Error Message
const displayError = (error) => {
    const ErrorTag = document.getElementById('errorMessage');
    ErrorTag.innerText = error;
};
